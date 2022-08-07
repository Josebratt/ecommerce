import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@ecommerce/orders';
import { ProductsService } from '@ecommerce/products';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';

@Component({
  selector: 'products-product-details',
  templateUrl: './product-details.component.html',
  styles: [],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: Product = new Product();
  endSubs$: Subject<any> = new Subject();
  quantity = 1;

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {        
        if (params['productId']) {
          this._getProduct(params['productId']);
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.endSubs$.next(true);
    this.endSubs$.complete();
  }

  private _getProduct(id: string) {
    this.productsService
      .getProduct(id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe({
        next: (resProduct) => {
          this.product = resProduct;
        },
      });
  }

  addProductToCart() {    
    const cartItem: CartItem ={
      productId: this.product.id,
      quantity: this.quantity
    }    
    this.cartService.setCartItem(cartItem);
  }
}
