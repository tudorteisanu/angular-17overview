import {UserInterface} from "@/types";
import {BackendErrorsInterface} from "@/types/backend-errors.interface";

export interface UsersStoreStateInterface {
  isFetching: boolean;
  items: UserInterface[];
  errorMessage: string | null
}
