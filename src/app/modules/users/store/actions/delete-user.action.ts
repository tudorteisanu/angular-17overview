import {createAction, props} from "@ngrx/store";
import {UserInterface} from "@/types";
import {BackendErrorsInterface} from "@/types/backend-errors.interface";

export const deleteUserAction = createAction(
  '[USERS] delete user',
  props<{id: string}>(),
);
export const deleteUserSuccessAction = createAction(
  '[USERS] delete user success',
  props<{id: string}>(),
  );
export const deleteUserFailureAction = createAction(
  '[USERS] delete user failure',
  props<{validationErrors: BackendErrorsInterface}>(),
  );
