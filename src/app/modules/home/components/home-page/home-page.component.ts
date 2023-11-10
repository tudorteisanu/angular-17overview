import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from "../../../../layouts/default-layout/default-layout.component";

@Component({
    selector: 'app-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    imports: [CommonModule, DefaultLayoutComponent]
})
export class HomePageComponent {

}
