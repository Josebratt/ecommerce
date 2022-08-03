import { OrderItem } from './order-item';
import { User } from '@ecommerce/users';

export class Order {
  id='';
  orderItems: OrderItem[] = [];
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status?: number;
  totalPrice?: string;
  user = new User;
  dateOrdered?: string;
}