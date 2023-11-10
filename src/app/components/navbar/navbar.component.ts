import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemInterface } from '@/types';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { menu } from '@/settings';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent{
  get links(): MenuItemInterface[] {
    return menu
  }
}
