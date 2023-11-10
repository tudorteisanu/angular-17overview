import {Component, OnInit, Signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserInterface} from "@/types";
import {Store} from "@ngrx/store";
import {fetchUsersAction} from "@/modules/users/store/actions/fetch-users.action";
import {selectIsFetching, selectUsers} from "@/modules/users/store/users.selectors";
import {deleteUserAction} from "@/modules/users/store/actions/delete-user.action";

@Component({
  selector: 'app-users-list-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-list-page.component.html',
  styleUrl: './users-list-page.component.scss'
})
export class UsersListPageComponent implements OnInit{
  users: Signal<UserInterface[]> = this.store.selectSignal(selectUsers)
  isFetching: Signal<boolean> = this.store.selectSignal(selectIsFetching);
  validationErrors: Signal<boolean> = this.store.selectSignal(selectIsFetching);

  constructor(private store: Store) {}

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
