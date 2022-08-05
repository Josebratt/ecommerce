import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiURLProducts = environment.apiURL + 'products';

  constructor(private http: HttpClient) {}

  // get data
  /*   getCategories(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURLProducts);
  } */

  getProducts(categoriesFilter?: string[]): Observable<Product[]> {
    let params = new HttpParams();
    if (categoriesFilter) {     
      params = params.append('categories', categoriesFilter.join(','));
    }
    return this.http.get<Product[]>(this.apiURLProducts, { params: params });
  }

  //create data
  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiURLProducts, productData);
  }

  // get Id for update
  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiURLProducts}/${productId}`);
  }

  // update data
  updateProduct(productData: FormData, productId: string): Observable<Product> {
    return this.http.put<Product>(
      `${this.apiURLProducts}/${productId}`,
      productData
    );
  }

  //delete data
  deleteProduct(productId: string): Observable<Product> {
    return this.http.delete<Product>(`${this.apiURLProducts}/${productId}`);
  }

  //
  getProductsCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLProducts}/get/count`)
      .pipe(map((objectValue: any) => objectValue.productCount));
  }

  //
  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.apiURLProducts}/get/featured/${count}`
    );
  }
}
