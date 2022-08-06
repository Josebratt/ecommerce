import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeModule } from 'primeng/badge';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { CartService } from './services/cart.service';

@NgModule({
  imports: [CommonModule, BadgeModule],
  declarations: [CartIconComponent],
  exports: [CartIconComponent],
})
export class OrdersModule {
  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
  }
}
