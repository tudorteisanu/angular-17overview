import {createAction, props} from "@ngrx/store";
import {UserInterface} from "@/types";
import {BackendErrorsInterface} from "@/types/backend-errors.interface";

export const fetchUsersAction = createAction('[USERS] fetch users');
export const fetchUsersSuccessAction = createAction(
  '[USERS] fetch users success',
    props<{ items: UserInterface[] }>(),
  );
export const fetchUsersFailureAction = createAction(
  '[USERS] fetch users failure',
  props<{validationErrors: BackendErrorsInterface}>(),
  );
