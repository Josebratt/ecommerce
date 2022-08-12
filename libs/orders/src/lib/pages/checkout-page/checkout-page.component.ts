import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart, CartService, OrderItem, OrderService } from '@ecommerce/orders';
import { UsersService } from '@ecommerce/users';

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
  countries: unknown[] = [];;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService
    ) {}

  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCartItems();
    this._getcontries();
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

  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items.map(
      item => {
        return {
        product: item.productId,
        quantity: item.quantity
      }
    }
    ) as any;

    console.log(this.orderItems);
    
  }

  private _getcontries() {
    this.countries = this.usersService.getCountries();
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  get formControl() {
    return this.checkoutFormGroup.controls;
  }
}
