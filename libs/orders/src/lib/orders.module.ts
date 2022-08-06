import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CartIconComponent
  ],
  exports: [
    CartIconComponent
  ],
})
export class OrdersModule {}
