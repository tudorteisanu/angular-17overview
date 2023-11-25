import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
    selector: 'app-default-layout',
    standalone: true,
    templateUrl: './default-layout.component.html',
    styleUrl: './default-layout.component.scss',
    imports: [CommonModule, NavbarComponent]
})
export class DefaultLayoutComponent {

}
