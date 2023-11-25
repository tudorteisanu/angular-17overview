import { UserInterface } from "@/core/types";
import { TableHeaderInterface } from "@/core/types/table-header.interface";

export const userTableHeaders: TableHeaderInterface<UserInterface>[] = [
  {
    value: 'username',
    text: 'Username',
  },
  {
    value: 'email',
    text: 'Email',
  },
  {
    value: 'bio',
    text: 'Bio',
  },
  {
    value: 'actions',
    text: '',
  },
]
