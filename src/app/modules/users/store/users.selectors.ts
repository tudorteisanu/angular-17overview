import {createSelector} from "@ngrx/store";
import {UsersStoreStateInterface} from "@/modules/users/types";
import {USERS_FEATURE_STORE_KEY} from "@/modules/users/constants";

export const selectUsersFeature = (state: any) => state[USERS_FEATURE_STORE_KEY];

export const selectIsFetching = createSelector(
  selectUsersFeature,
  (state: UsersStoreStateInterface) => state.isFetching
);

export const selectUsers = createSelector(
  selectUsersFeature,
  (state: UsersStoreStateInterface) => state.items
);
