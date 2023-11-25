import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "@/core/components/navbar/navbar.component";
import { GalleryComponent } from "@/core/components/gallery/gallery.component";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterOutlet, NavbarComponent, GalleryComponent]
})
export class AppComponent {
  title = 'angular17-new-features';
}
