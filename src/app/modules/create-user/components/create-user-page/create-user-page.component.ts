import {Component, computed, Signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {createUserAction} from "@/modules/create-user/store/actions/create-user.action";
import {selectIsSubmitting, selectValidationErrors} from "@/modules/create-user/store/create-user.selectors";
import {BackendErrorsInterface} from "@/types/backend-errors.interface";

@Component({
  selector: 'app-create-user-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-user-page.component.html',
  styleUrl: './create-user-page.component.scss'
})
export class CreateUserPageComponent {
  isSubmitting: Signal<boolean> = this.store.selectSignal(selectIsSubmitting);
  errors: Signal<BackendErrorsInterface> = this.store.selectSignal(selectValidationErrors);
  parsetErrors: Signal<string | null> = computed(() => {
    if (this.errors()) {
      return Object.values(this.errors() || {}).join(', ')
    }

    return null
  });

  createUserForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username:  ['', [Validators.required, Validators.minLength(2), Validators.maxLength(180)]],
    bio: ['', [Validators.minLength(10), Validators.maxLength(180)]],
  })

  constructor(
    private fb: NonNullableFormBuilder,
    private store: Store,
    ) {
  }

  createUser(): void {
    this.createUserForm.markAllAsTouched();

    if (this.createUserForm.invalid) {
      return;
    }

    this.store.dispatch(createUserAction({createUserInput: this.createUserForm.getRawValue()}))
  }
}
