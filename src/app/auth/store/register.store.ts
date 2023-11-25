import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { inject } from "@angular/core";
import { BackendErrorsInterface } from "@/core/types/backend-errors.interface";
import { Router } from "@angular/router";
import { RegisterInputInterface } from "@/auth/types/register-input.interface";
import { AuthService } from "@/auth/services/auth.service";

export const RegisterStore = signalStore(
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
    const registerService = inject(AuthService);
    const router = inject(Router);

    return {
      register: async (loginInput: RegisterInputInterface) => {
        patchState(state, {
          isSubmitting: true,
        })
        registerService.register(loginInput).subscribe(({
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
