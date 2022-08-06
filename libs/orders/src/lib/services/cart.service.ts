import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  /** we initial cart */
  initCartLocalStorage() {
    const intialCart = {
      items: []
    };
    const intialCartJson = JSON.stringify(intialCart);
    localStorage.setItem(CART_KEY, intialCartJson);
  }

  setCartItem(cartItem: CartItem): Cart {
    const cart: Cart = JSON.parse(localStorage.getItem(CART_KEY) || '{}');
    cart.items.push(cartItem);
    return cart;
  }

}
