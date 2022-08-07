import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CartService } from './services/cart.service';

import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';



const routes: Routes = [
  { path: 'cart', component: CartPageComponent },
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), BadgeModule, ButtonModule, InputNumberModule],
  declarations: [CartIconComponent, CartPageComponent],
  exports: [CartIconComponent, CartPageComponent],
})
export class OrdersModule {
  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
  }
}
