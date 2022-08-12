import { Subject, takeUntil } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart, CartService, Order, OrderItem, OrderService } from '@ecommerce/orders';
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
  unsubs$: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService
    ) {}

  ngOnInit(): void {
    this._initCheckoutForm();
    this._autoFillUserData();
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

  private _autoFillUserData() {
    this.usersService
      .observeCurrentUser()
      .pipe(takeUntil(this.unsubs$))
      .subscribe((user) => {
        if (user) {
          this.userId = user.id as string;
          this.formControl['name'].setValue(user.name);
          this.formControl['email'].setValue(user.email);
          this.formControl['phone'].setValue(user.phone);
          this.formControl['city'].setValue(user.city);
          this.formControl['street'].setValue(user.street);
          this.formControl['country'].setValue(user.country);
          this.formControl['zip'].setValue(user.zip);
          this.formControl['apartment'].setValue(user.apartment);
        }
        console.log(user);
        
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

/*     const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.formControl['street'].value,
      shippingAddress2: this.formControl['apartment'].value,
      city: this.formControl['city'].value,
      zip: this.formControl['zip'].value,
      country: this.formControl['country'].value,
      phone: this.formControl['phone'].value,
      status: 0,
      user: this.userId,
      dateOrdered: `${Date.now()}`
    }; */

   /*  this.orderService.createOrder(order).subscribe(
      () => {
        //redirect to thank you page // payment
        this.cartService.emptyCart();
        this.router.navigate(['/success']);
      },
      () => {
        //display some message to user
      }
    ); */
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  get formControl() {
    return this.checkoutFormGroup.controls;
  }
}
