import {inject} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {of} from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import {
  fetchUsersAction,
  fetchUsersFailureAction,
  fetchUsersSuccessAction
} from "@/modules/users/store/actions/fetch-users.action";
import {UsersListService} from "@/modules/users/services/users-list.service";

export const fetchUsers = createEffect(
  (actions$ = inject(Actions), usersListService = inject(UsersListService)) => {
    return actions$.pipe(
      ofType(fetchUsersAction),
      exhaustMap(() =>
        usersListService.fetchUsers().pipe(
          map((items) => fetchUsersSuccessAction({items})),
          catchError((error: { message: any }) =>
            of(fetchUsersFailureAction({validationErrors: error.message}))
          )
        )
      )
    );
  },
  { functional: true }
);
