import {Route} from "@angular/router";
import {UsersListPageComponent} from "@/modules/users/components/users-list-page/users-list-page.component";
import { provideState } from '@ngrx/store'
import {USERS_FEATURE_STORE_KEY} from "@/modules/users/constants";
import {usersReducers} from "@/modules/users/store/users.reducers";
import {provideEffects} from "@ngrx/effects";
import * as fetchUsers from "@/modules/users/store/effects/fetch-users.effects";
import * as deleteUser from "@/modules/users/store/effects/delete-user.effects";

export const usersRoutes: Route[] = [
  {
    path: '',
    component: UsersListPageComponent,
    providers: [
      provideState(USERS_FEATURE_STORE_KEY, usersReducers),
      provideEffects(fetchUsers, deleteUser)
    ]
  }
]
