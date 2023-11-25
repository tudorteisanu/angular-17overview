import { HttpInterceptorFn } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { of, throwError } from "rxjs";
import { inject } from "@angular/core";
import { AuthStore } from "@/auth/store/auth.store";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(AuthStore);

  if (req.url.includes( '/refresh')) {
    return next(req)
  }

  return next(req).pipe(
    catchError((error, retryRequest) => {
    if (error.error.error === 'token_expired') {
      store.processRefreshToken().subscribe({
        next: () => {
          retryRequest.subscribe();
        },
        error: () => {
          store.logout();
        }
      })
    }
    if (error.status === 401) {

      // store.logout()
      // router.navigateByUrl('/login')
      return of(error)
    }

    return throwError(() => error);
  }))
};
