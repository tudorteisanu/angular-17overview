import {inject} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {of} from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import {
  createUserAction,
  createUserFailureAction,
  createUserSuccessAction
} from "@/modules/create-user/store/actions/create-user.action";
import {CreateUserService} from "@/modules/create-user/services/create-user.service";
import {Router} from '@angular/router';

export const createUserEffect = createEffect(
  (actions$ = inject(Actions), createUserService = inject(CreateUserService)) => {
    return actions$.pipe(
      ofType(createUserAction),
      exhaustMap(({createUserInput}) =>
        createUserService.addUser(createUserInput).pipe(
          map(() => createUserSuccessAction()),
          catchError((error) => {
            return of(createUserFailureAction({validationErrors: error.error.errors}))
          }
          )
        )
      )
    );
  },
  { functional: true }
);

export const createUserSuccess = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(createUserSuccessAction),
      exhaustMap(() => router.navigateByUrl('/users')
      )
    );
  },
  { functional: true, dispatch: false }
);
