import {createAction, props} from "@ngrx/store";
import {CreateUserInputInterface} from "@/modules/create-user/types/create-user-input.interface";
import {BackendErrorsInterface} from "@/types/backend-errors.interface";

export const createUserAction = createAction(
  '[CREATE USER] submit',
  props<{createUserInput: CreateUserInputInterface}>()
);
export const createUserSuccessAction = createAction('[CREATE USER] submit success');
export const createUserFailureAction = createAction(
  '[CREATE USER] submit failure',
  props<{validationErrors: BackendErrorsInterface}>()
);
