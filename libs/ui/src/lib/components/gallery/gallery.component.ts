import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styles: [],
})
export class GalleryComponent implements OnInit {
  selectedImageUrl = '';

  @Input() images: string[] = [];

  ngOnInit(): void {
    console.log(this.hasImages);
    
    if (this.hasImages) {
      this.selectedImageUrl = this.images[0];
    }
  }

  changeSelectedImage(imageUrl: string) {
    this.selectedImageUrl = imageUrl;
  }

  get hasImages() {
    console.log(this.images);
    return this.images.length > 0;
  }
}
