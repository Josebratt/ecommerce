import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartItemDetailed, CartService, OrderService } from '@ecommerce/orders';
import { Subject } from 'rxjs';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit {

  cartItemDetailed: CartItemDetailed[] = [];

  endSubs$: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this._getCartDetails();
  }

  private _getCartDetails() {
    this.cartService.cart$.pipe().subscribe(
      respCart => {                
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

  backToShop() {
    this.router.navigate(['/products']);
  }
  deleteCartItem(){

  }

}
