import {createAction, props} from "@ngrx/store";
import {UserInterface} from "@/types";

export const fetchUsersAction = createAction('[USERS] fetch users');
export const fetchUsersSuccessAction = createAction(
  '[USERS] fetch users success',
    props<{ items: UserInterface[] }>(),
  );
export const fetchUsersFailureAction = createAction(
  '[USERS] fetch users failure',
  props<{errorMessage: string }>(),
  );
