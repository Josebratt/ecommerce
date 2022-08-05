import { NgModule } from '@angular/core';
import { BannerComponent } from './components/banner/banner.component';

import { ButtonModule } from 'primeng/button';
import { GalleryComponent } from './components/gallery/gallery.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ CommonModule, ButtonModule],
  exports: [
    BannerComponent,
    GalleryComponent
  ],
  declarations: [
    BannerComponent,
    GalleryComponent
  ]
})
export class UiModule {}
