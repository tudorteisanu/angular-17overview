import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { inject } from "@angular/core";
import { LoginInputInterface } from "@/auth/types/login-input.interface";
import { AuthService } from "@/auth/services/auth.service";
import { UserInterface } from "@/core/types";
import { tap, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<{
    currentUser: null | UserInterface,
    isLoggedIn: boolean,
    accessToken: string | null,
    refreshToken: string | null,
  }>({
    currentUser: null,
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
  }),
  withMethods(state => {
    const authService = inject(AuthService);

    return {
      login: (loginInput: LoginInputInterface) => {
        return authService.login(loginInput)
          .pipe(
            tap((payload) => {
            const {
              user: currentUser,
              tokens: {
              access: accessToken,
              refresh: refreshToken,
            } } = payload;
            patchState(state, {
              accessToken,
              refreshToken,
              currentUser,
            })

              localStorage.setItem('accessToken', accessToken);
              localStorage.setItem('refreshToken', refreshToken);
          })
          );
      },
      fetchCurrentUser: () => {
return          authService.fetchUser()
  .pipe(tap((currentUser) => {
    patchState(state, {
      currentUser
    })
  }))
      },
      logout: async () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      },
      setAccessToken: (accessToken) => {
        patchState(state, {
          accessToken,
        })
    },
      setRefreshToken: (refreshToken) => {
        patchState(state, {
          refreshToken,
        })
    },
      removeAccessToken() {
        patchState(state, {
          accessToken: null,
        })
      },
      processRefreshToken: () => {
        return authService.refreshToken(<string>state.refreshToken())
          .pipe(
            tap(({ accessToken }) => {
            patchState(state, {
              accessToken
            })
            localStorage.setItem('accessToken', accessToken)
          }),
            catchError((error)=> {
              patchState(state, {
                refreshToken: null
              })
              return throwError(() => error)
            })
          )
      }
    }
  }),
)
