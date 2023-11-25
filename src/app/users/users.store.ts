import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { inject } from "@angular/core";
import { UserInterface } from "@/core/types";
import { UsersListService } from "@/users/services/users-list.service";
import { BackendErrorsInterface } from "@/core/types/backend-errors.interface";
import { Router } from "@angular/router";
import {CreateUserInterface} from '@/users/types'

export const UsersStore = signalStore(
  { providedIn: 'root' },
  withState<{
    isFetching: boolean,
    isSubmitting: boolean,
    items: UserInterface[],
    errorMessage: string | null,
    validationErrors: BackendErrorsInterface,
  }>({
    isFetching: false,
    items: [],
    errorMessage: null,
    isSubmitting: false,
    validationErrors: null,
  }),
  withMethods(state => {
    const usersService = inject(UsersListService);
    const router = inject(Router);

    return {
      fetchUsers: async () => {
        patchState(state, {
          isFetching: true,
        })
        usersService.fetchUsers().subscribe(({
          next: (items) => {
            patchState(state, {
              isFetching: false,
              items,
            })
          },
          error: (error) => {
            patchState(state, {
              isFetching: false,
              errorMessage: error.error.message,
            })
          }
        }));
      },
      deleteUser(userId: string) {
        usersService.deleteUser(userId).subscribe(({
          next: () => {
            patchState(state, {
              items: state.items().filter(({id}) => id !== userId),
            })
          },
          error: (error) => {
            patchState(state, {
              errorMessage: error.error.message,
            })
          }
        }));
      },
      addUser: (user: UserInterface) => {
        patchState(state,
          {
            items: [
              ...state.items(),
            user
            ]
          }
          )
      },
      createUser: async (createUserInput: CreateUserInterface) => {
        patchState(state, {
          isSubmitting: true,
        })
        usersService.addUser(createUserInput).subscribe(({
          next: () => {
            patchState(state, {
              isSubmitting: false,
              validationErrors: null,
            })
            router.navigateByUrl('/users')
          },
          error: (error) => {
            patchState(state, {
              isSubmitting: false,
              validationErrors: error.error.errors
            })
          }
        }));
      }
    }
  }),
  withHooks(
    {
      onInit({ fetchUsers }) {
        fetchUsers()
      },
      onDestroy() {
        console.log('destroued users store');
      }
    }
  )
)
