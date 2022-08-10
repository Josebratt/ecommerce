import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartItemDetailed, CartService, OrderService } from '@ecommerce/orders';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit, OnDestroy {

  cartItemDetailed: CartItemDetailed[] = [];
  cartCount = 0;
  endSubs$: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this._getCartDetails();
  }

  ngOnDestroy() {
    this.endSubs$.next(true);
    this.endSubs$.complete();
  }

  private _getCartDetails() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(
      (respCart) => {     
        this.cartItemDetailed = [];
        this.cartCount = respCart.items.length ?? 0;
        respCart.items.forEach(
          cartItem => this.orderService.getProduct(cartItem.productId).subscribe(
            (resProducts) => {
              this.cartItemDetailed.push({
                product: resProducts,
                quantity: cartItem.quantity
              })
            }
            
          )
          
        )
      }
    )
  }

  updateCartItemQuantity(event: any, cartItem: CartItemDetailed) {
    this.cartService.setCartItem({
      productId: cartItem.product.id,
      quantity: event.value
    }, true);
  }

  backToShop() {
    this.router.navigate(['/products']);
  }
  deleteCartItem(cartItem: CartItemDetailed){
    console.log('clicked');
    
    this.cartService.deleteCartItem(cartItem.product.id);
  }

}
