import {createReducer, on} from "@ngrx/store";
import {
  fetchUsersAction,
  fetchUsersFailureAction,
  fetchUsersSuccessAction
} from "@/modules/users/store/actions/fetch-users.action";
import {UsersStoreStateInterface} from "@/modules/users/types/users-store-state.interface";
import {deleteUserSuccessAction} from "@/modules/users/store/actions/delete-user.action";

const initialState: UsersStoreStateInterface = {
  isFetching: false,
  items: [],
  errorMessage: null,
}

export const usersReducers = createReducer(initialState,
  on(fetchUsersAction, state => ({
    ...state,
    isFetching: true
  })),
  on(fetchUsersSuccessAction, (state, action) => ({
    ...state,
    isFetching: false,
    items: action.items
  })),
  on(fetchUsersFailureAction, (state, action) => ({
    ...state,
    isFetching: false,
    errorMessage: action.errorMessage,
  })),
  on(deleteUserSuccessAction, (state, action) => ({
    ...state,
    isFetching: false,
    items: state.items.filter(item => item.id !== action.id),
  })),
  )
