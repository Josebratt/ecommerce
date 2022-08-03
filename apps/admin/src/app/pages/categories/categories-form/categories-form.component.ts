import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CategoriesService, Category } from '@ecommerce/products';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject, timer, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [],
})
export class CategoriesFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  isSubmited = false;
  editmode = false;
  currentCategoryId = '';
  endsubs$: Subject<unknown> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff'],
    });

    this._checkEditMode();
  }

  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.form.invalid) {
      return;
    }

    const category: Category = {
      id: this.currentCategoryId,
      name: this.formControl['name'].value,
      icon: this.formControl['icon'].value,
      color: this.formControl['color'].value,
    };

    if (this.editmode) {
      this._updateCategory(category);
    } else {
      this._addCategory(category);
    }
  }

  /** create and save the new category */
  private _addCategory(category: Category) {
    this.categoriesService
      .createCategory(category)
      .pipe(takeUntil(this.endsubs$))
      .subscribe({
        next: (category) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success Message',
            detail: `Category ${category.name} is created`,
          });
          timer(2000)
            .pipe(takeUntil(this.endsubs$))
            .subscribe({ next: () => this.location.back() });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error Message',
            detail: `Category is not created`,
          });
        }
      });
  }

  /** */
  private _checkEditMode() {
    let id = '';
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
      id = params['id'];
      if (id) {
        this.editmode = true;
        this.currentCategoryId = id;
        this.categoriesService
          .getCategory(id)
          .pipe(takeUntil(this.endsubs$))
          .subscribe((category) => {
            this.formControl['name'].setValue(category.name);
            this.formControl['icon'].setValue(category.icon);
            this.formControl['color'].setValue(category.color);
          });
      }
    });
  }

  /** Update Data of Category*/
  private _updateCategory(category: Category) {
    this.categoriesService
      .updateCategory(category)
      .pipe(takeUntil(this.endsubs$))
      .subscribe({
        next: (category) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success Message',
            detail: `Category ${category.name} is updated`,
          });
          timer(2000)
            .pipe(takeUntil(this.endsubs$))
            .subscribe({ next: () => this.location.back() });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error Message',
            detail: `Category ${error.message} is not updated`,
          });
        }
      });
  }

  // Cancel the operation
  cancel() {
    this.location.back();
  }

  /** abreviation instruction */
  get formControl(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
