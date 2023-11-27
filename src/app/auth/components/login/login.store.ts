import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { inject } from "@angular/core";
import { BackendErrorsInterface } from "@/core/types/backend-errors.interface";
import { Router } from "@angular/router";
import { LoginInputInterface } from "@/auth/types/login-input.interface";
import { AuthStore } from "@/auth/auth.store";
import { LoginService } from "@/auth/components/login/login.service";

export const LoginStore = signalStore(
  { providedIn: 'root' },
  withState<{
    isSubmitting: boolean,
    validationErrors: BackendErrorsInterface,
    errorMessage: string | null,
  }>({
    isSubmitting: false,
    validationErrors: null,
    errorMessage: null,
  }),
  withMethods(state => {
    const loginService = inject(LoginService);
    const authStore = inject(AuthStore);
    const router = inject(Router);

    return {
      login: async (loginInput: LoginInputInterface) => {
        patchState(state, {
          isSubmitting: true,
        })
        loginService.login(loginInput).subscribe(({
          next: ({user, tokens}) => {
            patchState(state, {
              isSubmitting: false,
            })
            const {access, refresh} = tokens;
            authStore.setAccessToken(access);
            authStore.setRefreshToken(refresh);
            authStore.setCurrentUser(user);
            router.navigateByUrl('/')
          },
          error: (error) => {
            patchState(state, {
              isSubmitting: false,
              validationErrors: error.error.errors,
              errorMessage: error.error.message,
            })
          }
        }));
      }
    }
  }),
)
