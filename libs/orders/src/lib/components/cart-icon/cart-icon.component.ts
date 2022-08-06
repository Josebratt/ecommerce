import { Component, OnInit } from '@angular/core';
import { CartService } from '@ecommerce/orders';

@Component({
  selector: 'orders-cart-icon',
  templateUrl: './cart-icon.component.html',
  styles: [
  ]
})
export class CartIconComponent implements OnInit {

  cartCount = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
/*     this.cartCount = this.cartService.getCart().items.length; */
    this.cartCount = 1;
  }

}
