import {inject} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {of} from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import {UsersListService} from "@/modules/users/services/users-list.service";
import {
  deleteUserAction,
  deleteUserFailureAction,
  deleteUserSuccessAction
} from "@/modules/users/store/actions/delete-user.action";

export const deleteUser = createEffect(
  (actions$ = inject(Actions), usersListService = inject(UsersListService)) => {
    return actions$.pipe(
      ofType(deleteUserAction),
      exhaustMap(({id}) =>
        usersListService.deleteUser(id).pipe(
          map(() => deleteUserSuccessAction({id})),
          catchError((error: { message: any }) =>
            of(deleteUserFailureAction({validationErrors: error.message}))
          )
        )
      )
    );
  },
  { functional: true }
);
