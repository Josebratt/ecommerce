import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, ProductsService } from '@ecommerce/products';
import { Category } from '../../models/category';
import { Product } from '../../models/product';

@Component({
  selector: 'products-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];
  isCategoryPage!: boolean;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      params['categoryid'] ? this._getProducts(params['categoryid']) : this._getProducts();
      params['categoryid'] ? (this.isCategoryPage = true) : (this.isCategoryPage = false);
    });
    this._getCategories();
  }

  private _getProducts(categoriesFilter?: string[]) {
    this.productsService.getProducts(categoriesFilter).subscribe((resProducts) => {
      this.products = resProducts;
    });
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((resCats) => {
      this.categories = resCats;
    });
  }

  categoryFilter() {
    const selectedCategories = this.categories
      .filter((category) => category.checked)
      .map((category) => category.id);

    this._getProducts(selectedCategories);
  }

}
