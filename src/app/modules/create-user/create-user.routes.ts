import {Route} from "@angular/router";
import { provideState } from '@ngrx/store'
import {provideEffects} from "@ngrx/effects";
import {CREATE_USER_FEATURE_KEY} from "@/modules/create-user/constants";
import {createUserReducers} from "@/modules/create-user/store/create-user.reducers";
import * as createUserEffect from "@/modules/create-user/store/effects/create-user.effects.";
import {CreateUserPageComponent} from "@/modules/create-user/components/create-user-page/create-user-page.component";

export const createUserRoutes: Route[] = [
  {
    path: '',
    component: CreateUserPageComponent,
    providers: [
      provideState(CREATE_USER_FEATURE_KEY, createUserReducers),
      provideEffects(createUserEffect)
    ]
  }
]
