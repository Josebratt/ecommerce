import { NgModule } from '@angular/core';
import { BannerComponent } from './components/banner/banner.component';

import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [ButtonModule],
  exports: [
    BannerComponent
  ],
  declarations: [
    BannerComponent
  ]
})
export class UiModule {}
