import { Route } from "@angular/router";

export const authRoutes: Route[] = [
  {
    path: 'register',
    loadChildren: () => import('./components/register/register.route').then(m => m.registerRoute)
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.route').then(m => m.loginRoute)
  },
]
