import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  /** we initial cart */
  initCartLocalStorage() {
    /** Here we initialise cart with nothing */
    const intialCart = {
      items: [],
    };

    /** we parse the intialCart to string */
    const intialCartJson = JSON.stringify(intialCart);

    /** Here we set Item into localstore */
    localStorage.setItem(CART_KEY, intialCartJson);
  }

  /** here we get the item from the localstore */
  getCart() {
    const cart: Cart = JSON.parse(localStorage.getItem(CART_KEY) || '{}');
    return cart;
  }

  setCartItem(cartItem: CartItem): Cart {
    const cart = this.getCart();

    /** we validate if the cartItemId is the same that itemProductId to increase the quantity */
    const cartItemExist = cart.items.find((item) => item.productId === cartItem.productId);
    if (cartItemExist) {
      cart.items.map(item => {
        if (item.productId === cartItem.productId) {
          item.quantity = item.quantity + cartItem.quantity;
        }
      })
    } else {
      cart.items.push(cartItem);
    }
    

    /** before you push cartItems to cart you need to send the information to localstore*/
    const cartJson = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJson);
    return cart;
  }
}
