import { APP_INITIALIZER, ApplicationConfig, CSP_NONCE } from "@angular/core";
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { httpInterceptor } from '@/core/interceptors/http.interceptor';
import { errorInterceptor } from "@/core/interceptors/error.interceptor";
import { initializeApp } from "@/app.initializer";
import { AuthStore } from "@/auth/auth.store";

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: CSP_NONCE,
      useValue: 'myRandomNonceValue'
    },
    provideHttpClient(
      withFetch(),
      withInterceptors([
        httpInterceptor,
        errorInterceptor,
      ])),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [AuthStore],
    },
    provideRouter(routes),
  ],
};
