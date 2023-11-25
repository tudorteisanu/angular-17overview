import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@/home/home.routes')
      .then(m => m.homeRoutes),
  },
  {
    path: 'users',
    loadChildren: () => import('@/users/users.route')
      .then(m => m.usersRoutes)
  },
  {
    path: '',
    loadChildren: () => import('@/auth/auth.route')
      .then(m => m.authRoutes)
  },
];
