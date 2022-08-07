import { Product } from '@ecommerce/products';
export class Cart {
  items: CartItem[] = [];
}

export class CartItem {
  productId = '';
  quantity = 0;
}

export class CartItemDetailed {
  product: Product[] = [];
  quantity = 0;
}
