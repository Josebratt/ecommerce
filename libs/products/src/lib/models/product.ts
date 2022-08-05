import { Category } from './category';

export class Product {
  id?: string;
  name = '';
  description?: string;
  richDescription?: string;
  image?: string;
  images: string[] = [];
  brand?: string;
  price = 0 ;
  category?: Category;
  countInStock?: number;
  rating?: number;
  numReviews?: number;
  isFeatured?: boolean;
  dateCreated?: string;
}