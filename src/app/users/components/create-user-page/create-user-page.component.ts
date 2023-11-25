import { Component, effect, inject, Signal } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormBuilder,ReactiveFormsModule, Validators } from "@angular/forms";
import { DefaultLayoutComponent } from "@/core/layouts/default-layout/default-layout.component";
import { TextFieldComponent } from '@/core/components/text-field/text-field.component';
import { CardComponent } from "@/core/components/card/card.component";
import { BackendErrorsInterface } from '@/core/types/backend-errors.interface';
import { UsersStore } from "@/users/users.store";

@Component({
  selector: 'app-create-user-page',
  standalone: true,
  templateUrl: './create-user-page.component.html',
  styleUrl: './create-user-page.component.scss',
  imports: [CommonModule, ReactiveFormsModule, DefaultLayoutComponent, TextFieldComponent, CardComponent]
})
export class CreateUserPageComponent {
  store = inject(UsersStore);
  isSubmitting: Signal<boolean> = this.store.isSubmitting;
  errors: Signal<BackendErrorsInterface> = this.store.validationErrors;
  createUserForm = this.fb.group({
    email: this.fb.nonNullable.control('', { validators: [Validators.required, Validators.email] }),
    username: this.fb.nonNullable.control('', { validators: [Validators.required, Validators.minLength(2), Validators.maxLength(180)] }),
    bio: [null, [Validators.minLength(10), Validators.maxLength(180)]],
  })

  constructor(
    private fb: FormBuilder,
  ) {
    effect(() => {
      if (this.errors()) {
        console.log(this.errors());
        // Object.entries(this.errors()).forEach(([field, messages]) => {
        //   this.createUserForm.controls[field as keyof typeof this.createUserForm.controls].setErrors({ backend: messages })
        // })
      }
    })
  }

  createUser(): void {
    this.createUserForm.markAllAsTouched();

    if (this.createUserForm.invalid) {
      return;
    }

    this.store.createUser( this.createUserForm.getRawValue())
  }
}
