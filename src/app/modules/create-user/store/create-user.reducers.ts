import {createReducer, on} from "@ngrx/store";
import {
  createUserAction,
  createUserFailureAction,
  createUserSuccessAction
} from "@/modules/create-user/store/actions/create-user.action";
import {CreateUserStateInterface} from "@/modules/create-user/types";

const initialState: CreateUserStateInterface = {
  isSubmitting: false,
  validationErrors: null,
}

export const createUserReducers = createReducer(
  initialState,
  on(createUserAction, state => ({
    ...state,
    isSubmitting: true
  })),
  on(createUserSuccessAction, state => ({
    ...state,
    isSubmitting: false,
    validationErrors: null,
  })),
  on(createUserFailureAction, (state, action) => ({
    ...state,
    isSubmitting: false,
    validationErrors: action.validationErrors
  })),
)
