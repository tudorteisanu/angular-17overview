import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { inject } from "@angular/core";
import { BackendErrorsInterface } from "@/core/types/backend-errors.interface";
import { Router } from "@angular/router";
import { LoginInputInterface } from "@/auth/types/login-input.interface";
import { AuthStore } from "@/auth/store/auth.store";

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
    const authService = inject(AuthStore);
    const router = inject(Router);

    return {
      login: async (loginInput: LoginInputInterface) => {
        patchState(state, {
          isSubmitting: true,
        })
        authService.login(loginInput).subscribe(({
          next: () => {
            patchState(state, {
              isSubmitting: false,
            })
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
