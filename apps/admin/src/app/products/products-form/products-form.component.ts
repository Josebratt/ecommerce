import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CategoriesService,
  Category,
  ProductsService,
} from '@ecommerce/products';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Subject, timer, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [],
})
export class ProductsFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  isSubmited = false;
  editmode = false;
  currentProductId = '';
  categories: Category[] = [];
  imageDisplay? = '';
  imageSelected = '';
  endsubs$: Subject<unknown> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false],
    });
  }

  onSubmit() {
    this.isSubmited = true;

    if (this.form.invalid) {
      return;
    }

    const productFormData = new FormData();
    Object.keys(this.formControl).map((key) => {
      productFormData.append(key, this.formControl[key].value);
    });

    if (this.editmode) {
      this._updateProduct(productFormData);
    } else {
      this._addProduct(productFormData);
    }
  }

  /** get categories */
  private _getCategories() {
    this.categoriesService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe((data) => {
      this.categories = data;
    });
  }

  /** upload the image */
  imageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.formControl['image'].updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result as string;
      };
      fileReader.readAsDataURL(file);
    }
  }

  /** create and save the new product */
  private _addProduct(productData: FormData) {
    this.productsService.createProduct(productData)
    .pipe(takeUntil(this.endsubs$))
    .subscribe({
      next: (product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success Message',
          detail: `Product ${product.name} is created`,
        });
        timer(2000)
          .pipe(takeUntil(this.endsubs$))
          .subscribe({ next: () => this.location.back() });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error Message',
          detail: `Product is not created`,
        });
      }
    }
    );
  }

  /** */
  private _updateProduct(productFormData: FormData, ) {
    this.productsService.updateProduct(productFormData, this.currentProductId ).pipe(takeUntil(this.endsubs$)).subscribe({
      next: (product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success Message',
          detail: `Product ${product.name} is updated`,
        });
        timer(2000)
          .pipe(takeUntil(this.endsubs$))
          .subscribe({ next: () => this.location.back() });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error Message',
          detail: `Product is not updated`,
        });
      }
    }
    );
  }
  // get the id to update
  private _checkEditMode() {
    let id = '';
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe(
      params => {
        id = params['id']
        if (id) {
          this.editmode = true;
          this.currentProductId = id;
          this.productsService.getProduct(id).subscribe(
            product => {
              this.formControl['name'].setValue(product.name);
              this.formControl['brand'].setValue(product.brand);
              this.formControl['price'].setValue(product.price);
              this.formControl['category'].setValue(product.category?.id);
              this.formControl['countInStock'].setValue(product.countInStock);
              this.formControl['description'].setValue(product.description);
              this.formControl['richDescription'].setValue(product.richDescription);
              this.formControl['isFeatured'].setValue(product.isFeatured);
              this.imageDisplay = product.image;
              this.formControl['image'].setValidators([]);
              this.formControl['image'].updateValueAndValidity();

            }
          )
        }
      }
    )
  }

  /** Cancel the operation */
  cancel() {
    this.location.back();
  }

    /** abreviation instruction */
    get formControl(): { [key: string]: AbstractControl } {
      return this.form.controls;
    }
}
