import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());
  
  /** we initial cart */
  initCartLocalStorage() {
    const cart: Cart = this.getCart();
    if (Cart) {
      this.emptyCart();
    }

    /** validate that cart doesn't have nothing */
   // if (!cart) {
      /** Here initialise cart with nothing */
      // const intialCart = {
      //   items: [],
      // };
      /** parse the intialCart to string */
      // const intialCartJson = JSON.stringify(intialCart);

      /** Here set Item into localstore */
    //   localStorage.setItem(CART_KEY, intialCartJson);
    // } else {
    //   this.cart$.next(cart);
    // }
  }

  /** here we get the item from the localstore */
  getCart() {
    const cart: Cart = JSON.parse(localStorage.getItem(CART_KEY) || '{}');
    return cart;
  }

  setCartItem(cartItem: CartItem): Cart {
    const cart = this.getCart();

    /** we validate if the cartItemId is the same that itemProductId to increase the quantity */
    const cartItemExist = cart.items?.find(
      (item) => item.productId === cartItem.productId
    );
    if (cartItemExist) {
      cart.items?.map((item) => {
        if (item.productId === cartItem.productId) {
          item.quantity = item.quantity + cartItem.quantity;
        }
      });
    } else {
      cart.items?.push(cartItem);
    }

    /** before you push cartItems to cart you need to send the information to localstore*/
    const cartJson = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJson);
    this.cart$.next(cart);
    return cart;
  }

  emptyCart() {
    const intialCart = {
      items: []
    };
    const intialCartJson = JSON.stringify(intialCart);
    localStorage.setItem(CART_KEY, intialCartJson);
    this.cart$.next(intialCart);
  }
}
