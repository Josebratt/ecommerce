import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@ecommerce/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  totalProducts = 0;

  endsubs$: Subject<unknown> = new Subject();

  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }

  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }

  private _getProducts() {
    this.productsService
      .getCategories()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((data) => {
        this.products = data;
        this.totalProducts = data.length;
      });
  }

  updateProduct(productId: string) {
    this.router.navigateByUrl(`products/form/${productId}`);
  }

  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService
          .deleteProduct(productId)
          .pipe(takeUntil(this.endsubs$))
          .subscribe({
            next: (product) => {
              this._getProducts();
              this.messageService.add({
                severity: 'success',
                summary: 'Success Message',
                detail: `${product.name} is deleted`,
              });
            },
            error: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error Message',
                detail: `Product is not deleted`,
              });
            },
          });
      },
    });
  }
}
