import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from "@/core/layouts/default-layout/default-layout.component";
import { GalleryComponent } from "@/core/components/gallery/gallery.component";

@Component({
    selector: 'app-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
  imports: [CommonModule, DefaultLayoutComponent, GalleryComponent]
})
export class HomePageComponent {

}
