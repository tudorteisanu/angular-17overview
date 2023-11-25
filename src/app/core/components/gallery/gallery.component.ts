import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";
import { CommonModule } from '@angular/common';
import Splide from "@splidejs/splide";

const DEFAULT_OPTIONS = {
  pagination: false,
  autoHeight: false,
  height: "100%",
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements AfterViewInit{
  @Input() showThumbnails: boolean = true;
  @Input() options: object = {};
  @ViewChild('galleryContent') galleryContent!: ElementRef;
  splide!: Splide;

  gallery = [
    {
      url: 'https://splidejs.com/images/slides/general/01.jpg',
      thumbnail: 'https://splidejs.com/images/slides/square-thumbnails/01.jpg'
    },
    {
      url: 'https://splidejs.com/images/slides/general/02.jpg',
      thumbnail: 'https://splidejs.com/images/slides/square-thumbnails/02.jpg'
    },
    {
      url: 'https://splidejs.com/images/slides/general/03.jpg',
      thumbnail: 'https://splidejs.com/images/slides/square-thumbnails/03.jpg'
    },
    {
      url: 'assets/images/bg-1.jpg',
      thumbnail: 'https://splidejs.com/images/slides/square-thumbnails/04.jpg'
    },
  ]

  ngAfterViewInit() {
    this.splide = new Splide(
      this.galleryContent.nativeElement,
      {
      ...DEFAULT_OPTIONS,
        ...this.options,
    });
    this.splide.mount();
  }


  goToSlide(index: number): void {
    this.splide.go( index );
  }

}
