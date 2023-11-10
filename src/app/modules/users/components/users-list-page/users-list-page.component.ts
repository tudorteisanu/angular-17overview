import {Component, OnInit, Signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserInterface} from "@/types";
import {Store} from "@ngrx/store";
import {fetchUsersAction} from "@/modules/users/store/actions/fetch-users.action";
import {selectErrorMessage, selectIsFetching, selectUsers} from "@/modules/users/store/users.selectors";
import {deleteUserAction} from "@/modules/users/store/actions/delete-user.action";
import { DataTableComponent } from "@/components/data-table/data-table.component";
import { userTableHeaders } from '../../data';

@Component({
    selector: 'app-users-list-page',
    standalone: true,
    templateUrl: './users-list-page.component.html',
    styleUrl: './users-list-page.component.scss',
    imports: [CommonModule, DataTableComponent]
})
export class UsersListPageComponent implements OnInit{
  users: Signal<UserInterface[]> = this.store.selectSignal(selectUsers)
  isFetching: Signal<boolean> = this.store.selectSignal(selectIsFetching);
  errorMessage: Signal<string| null> = this.store.selectSignal(selectErrorMessage);

  constructor(private store: Store) {}

  get headers(): any {
    return userTableHeaders;
  }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.store.dispatch(fetchUsersAction())
  }

  deleteUser(id: string) {
    this.store.dispatch(deleteUserAction({id}))
  }
}
