import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthStore } from "@/auth/store/auth.store";

export const authGuard: CanActivateFn = () => {
  const store = inject(AuthStore);
  const router = inject(Router);

  const isLoggedId = store.isLoggedIn;

  if (!isLoggedId) {
    router.navigate(['/login'])
    return false
  }

  return true
};
