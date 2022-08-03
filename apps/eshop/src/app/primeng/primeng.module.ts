import { NgModule } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';

const UX_PRIME = [
  AccordionModule,
  ButtonModule
]

@NgModule({
  imports: [UX_PRIME],
  exports: [UX_PRIME]
})
export class PrimengModule { }
