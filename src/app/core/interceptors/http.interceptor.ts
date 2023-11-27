import { HttpHeaders, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthStore } from "@/auth/auth.store";

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(AuthStore);
  const accessToken = store.accessToken();

  let url = req.url;

  if (!url.startsWith('http')) {
    url = `http://localhost:5001${req.url}`
  }

  const request = req.clone({
    url
  })

  if (!accessToken) {
    return next(request);
  }

  return next( request.clone({
    headers: new HttpHeaders().set('authorization', `Bearer ${accessToken}`),
  }));
};
