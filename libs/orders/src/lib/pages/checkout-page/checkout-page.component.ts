import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderItem } from '@ecommerce/orders';

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [],
})
export class CheckoutPageComponent implements OnInit {
  checkoutFormGroup!: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId = '609d65943373711346c5e950';
  countries = [];
  formBuilder: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this._initCheckoutForm();
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required],
    });
  }

  placeOrder() {}

  backToCart() {
    this.router.navigate(['/cart']);
  }

  get formControl() {
    return this.checkoutFormGroup.controls;
  }
}
