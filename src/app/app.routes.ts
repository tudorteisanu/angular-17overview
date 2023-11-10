import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@/modules/home/home.routes')
      .then(m => m.homeRoutes)
  },
  {
    path: 'users/add',
    loadChildren: () => import('@/modules/create-user/create-user.routes')
      .then(m => m.createUserRoutes)
  },
  {
    path: 'users',
    loadChildren: () => import('@/modules/users/users.route')
      .then(m => m.usersRoutes)
  },
];
