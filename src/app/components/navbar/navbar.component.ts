import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkInterface } from '@/types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent{
  links: LinkInterface[] = [
    {
      title: 'Home',
      url: '/'
    },
    {
      title: 'Users',
      url: '/users'
    },
    {
      title: 'Create user',
      url: '/users/add'
    }
  ]
}
