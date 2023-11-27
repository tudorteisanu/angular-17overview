import { Component, inject } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MenuItemInterface } from 'src/app/core/types';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { menu } from 'src/app/core/settings';
import { AuthStore } from "@/auth/auth.store";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  store = inject(AuthStore);
  router = inject(Router);
  currentUser = this.store.currentUser;

  get links(): MenuItemInterface[] {
    return menu
  }

  logout(): void {
    this.store.logout();
    this.router.navigateByUrl('/')
  }
}
