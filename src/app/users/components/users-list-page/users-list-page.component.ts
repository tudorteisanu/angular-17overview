import { Component, inject, Signal } from "@angular/core";
import { CommonModule } from '@angular/common';
import { UserInterface } from "@/core/types";
import { DataTableComponent } from "@/core/components/data-table/data-table.component";
import { userTableHeaders } from '../../data';
import { DefaultLayoutComponent } from "@/core/layouts/default-layout/default-layout.component";
import { TableHeaderInterface } from '@/core/types/table-header.interface';
import { CardComponent } from "@/core/components/card/card.component";
import { UsersStore } from "@/users/users.store";

@Component({
  selector: 'app-users-list-page',
  standalone: true,
  templateUrl: './users-list-page.component.html',
  styleUrl: './users-list-page.component.scss',
  imports: [CommonModule, DataTableComponent, DefaultLayoutComponent, CardComponent]
})
export class UsersListPageComponent {
  store = inject(UsersStore);
  users: Signal<UserInterface[]> = this.store.items;
  isFetching: Signal<boolean> = this.store.isFetching;
  errorMessage: Signal<string | null> = this.store.errorMessage;

  get headers(): TableHeaderInterface<UserInterface>[] {
    return userTableHeaders;
  }

  deleteUser(id: string) {
    this.store.deleteUser(id)
  }
}
