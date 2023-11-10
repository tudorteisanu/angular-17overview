import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CreateUserPageComponent} from "@/modules/create-user/components/create-user-page/create-user-page.component";
import {StoreModule} from "@ngrx/store";
import {CREATE_USER_FEATURE_KEY} from "@/modules/create-user/constants";
import {createUserReducers} from "@/modules/create-user/store/create-user.reducers";
import {EffectsModule} from "@ngrx/effects";

const routes: Routes = [
  {
    path: '',
    component: CreateUserPageComponent,
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(CREATE_USER_FEATURE_KEY, createUserReducers),
    EffectsModule.forFeature([]),
  ]
})
export class CreateUserModule { }
