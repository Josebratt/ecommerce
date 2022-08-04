import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    ProductsSearchComponent,
  ],
  exports: [
    ProductsSearchComponent,
  ]
})
export class ProductsModule {}
