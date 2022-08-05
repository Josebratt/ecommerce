import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  quantity = 0;

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(takeUntil(this.endSubs$)).subscribe({
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

  }
}
