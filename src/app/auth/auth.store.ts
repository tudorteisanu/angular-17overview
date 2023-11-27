import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { inject } from "@angular/core";
import { AuthService } from "@/auth/auth.service";
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
      fetchCurrentUser: () => {
        return authService.fetchUser()
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
        localStorage.setItem('accessToken', accessToken);
    },
      setRefreshToken: (refreshToken) => {
        patchState(state, {
          refreshToken,
        })

        localStorage.setItem('refreshToken', refreshToken);
      },
      setCurrentUser: (currentUser) => {
        patchState(state, {
          currentUser,
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
