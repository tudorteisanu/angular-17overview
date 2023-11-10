import {BackendErrorsInterface} from "@/types/backend-errors.interface";

export interface CreateUserStateInterface {
  isSubmitting: boolean,
  validationErrors: BackendErrorsInterface,
}
