import { Route } from "@angular/router";
import { authGuard } from "@/core/guards/auth.guard";

export const usersRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('@/users/components/users-list-page/users-list-page.component').then(m => m.UsersListPageComponent),
    canActivate: [authGuard]
  },
  {
    path: 'add',
    loadComponent: () => import('@/users/components/create-user-page/create-user-page.component').then(m => m.CreateUserPageComponent),
    canActivate: [authGuard]
  }
]
