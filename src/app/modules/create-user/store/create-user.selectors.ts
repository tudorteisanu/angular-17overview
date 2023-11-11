import {createSelector} from "@ngrx/store";
import {CREATE_USER_FEATURE_KEY} from "@/modules/create-user/constants";
import {CreateUserStateInterface} from "@/modules/create-user/types";

export const selectUsersFeature = (state: any) => state[CREATE_USER_FEATURE_KEY];

export const selectIsSubmitting = createSelector(
  selectUsersFeature,
  (state: CreateUserStateInterface) => state.isSubmitting
);

export const selectValidationErrors = createSelector(
  selectUsersFeature,
  (state: CreateUserStateInterface) => state.validationErrors
);

export const selectErrorByName = (name: string) => createSelector(
  selectUsersFeature,
  (state: CreateUserStateInterface) => {
    if (state.validationErrors) {
      return state.validationErrors[name].join(', ')
    }
    return null
  }
);
