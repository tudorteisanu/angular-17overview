import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextFieldComponent } from "@/core/components/text-field/text-field.component";
import { RouterLink } from '@angular/router';
import { CardComponent } from '@/core/components/card/card.component';
import { AuthLayoutComponent } from "@/core/layouts/auth-layout/auth-layout.component";
import { RegisterStore } from "./register.store";

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [CommonModule, TextFieldComponent, RouterLink, CardComponent, ReactiveFormsModule, AuthLayoutComponent]
})
export class RegisterComponent {
  fb = inject(NonNullableFormBuilder);
  store = inject(RegisterStore);
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(128)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]],
    email: ['', [Validators.required, Validators.email]],
    bio: ['', [Validators.required]],
  })

  signIn(): void {
    this.registerForm.markAllAsTouched()

    if (this.registerForm.invalid) {
      return;
    }

    this.store.register( this.registerForm.getRawValue())
  }
}
