import {BackendErrorsInterface} from "@/core/types/backend-errors.interface";

export interface CreateUserInterface {
  email: string;
  username: string;
  bio: string | null
}

export interface CreateUserStateInterface {
  isSubmitting: boolean,
  validationErrors: BackendErrorsInterface,
}
