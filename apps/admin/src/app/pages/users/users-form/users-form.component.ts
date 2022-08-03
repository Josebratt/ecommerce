import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@ecommerce/users';

import * as countriesLib from "i18n-iso-countries";
import { timer, takeUntil, Subject } from 'rxjs';
declare const require: (arg0: string) => countriesLib.LocaleData;

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styles: []
})
export class UsersFormComponent implements OnInit {

  form!: FormGroup;
  isSubmitted = false;
  editmode = false;
  currentUserId = '';
  countries: unknown[] = [];
  endsubs$: Subject<unknown> = new Subject();

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._initUserForm();
    this._checkEditMode();
    this._getcontries();
  }

  private _initUserForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: ['']
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      id: this.currentUserId,
      name: this.formControl['name'].value,
      passwordHash:this.formControl['password'].value,
      email:this.formControl['email'].value,
      phone:this.formControl['phone'].value,
      isAdmin:this.formControl['isAdmin'].value,
      street:this.formControl['street'].value,
      apartment:this.formControl['apartment'].value,
      zip:this.formControl['zip'].value,
      city:this.formControl['city'].value,
      country:this.formControl['country'].value,
    };
    if (this.editmode) {
      this._updateUser(user);
    } else {
      this._addUser(user);
    }
  }

  private _addUser(user: User) {
    this.usersService.createUser(user).pipe(takeUntil(this.endsubs$)).subscribe({
      next: (user) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success Message',
          detail: `User ${user.name} is created`,
        });
        timer(2000)
          .pipe(takeUntil(this.endsubs$))
          .subscribe({ next: () => this.location.back() });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error Message',
          detail: `User is not created`,
        });
      }
    }
    );
  }

  /**/
  private _checkEditMode() {
    let id = '';
    this.route.params.subscribe(
      (params) => {
        id = params['id']
        if (id) {
          this.editmode = true;
          this.currentUserId = id;
          this.usersService.getUser(id).pipe(takeUntil(this.endsubs$)).subscribe((user) => {
            this.formControl['name'].setValue(user.name);
            this.formControl['email'].setValue(user.email);
            this.formControl['phone'].setValue(user.phone);
            this.formControl['isAdmin'].setValue(user.isAdmin);
            this.formControl['street'].setValue(user.street);
            this.formControl['apartment'].setValue(user.apartment);
            this.formControl['zip'].setValue(user.zip);
            this.formControl['city'].setValue(user.city);
            this.formControl['country'].setValue(user.country);

            this.formControl['password'].setValidators([]);
            this.formControl['password'].updateValueAndValidity();
          });
        }
      });
  }

  private _updateUser(user: User) {
    this.usersService.updateUser(user).pipe(takeUntil(this.endsubs$)).subscribe({
      next: (user) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success Message',
          detail: `User ${user.name} is updated`,
        });
        timer(2000)
          .pipe(takeUntil(this.endsubs$))
          .subscribe({ next: () => this.location.back() });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error Message',
          detail: `User is not updated`,
        });
      }
    }
    );
  }

  onCancel() {
    this.location.back();
  }

  //
  private _getcontries() {
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
    this.countries = Object.entries(countriesLib.getNames("en", { select: "official" })).map(
      (entry) => {
        return {
          id: entry[0],
          name: entry[1]
        }
      }
    );
  }

    /** abreviation instruction */
    get formControl(): { [key: string]: AbstractControl } {
      return this.form.controls;
    }

}
