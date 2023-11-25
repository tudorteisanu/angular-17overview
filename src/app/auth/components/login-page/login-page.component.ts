import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from "@/core/components/card/card.component";
import { TextFieldComponent } from "@/core/components/text-field/text-field.component";
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ErrorMessageComponent } from "@/core/components/error-message/error-message.component";
import {AuthLayoutComponent} from "@/core/layouts/auth-layout/auth-layout.component";
import { LoginStore } from "@/auth/store/login.store";

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  imports: [
    CommonModule,
    CardComponent,
    TextFieldComponent,
    ReactiveFormsModule,
    RouterLink,
    ErrorMessageComponent,
    AuthLayoutComponent,
  ]
})
export class LoginPageComponent {
  fb = inject(NonNullableFormBuilder);
  store = inject(LoginStore);
  errorMessage = this.store.errorMessage;
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })

  signIn(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      return;
    }

    this.store.login(this.loginForm.getRawValue())
  }
}
