import {Component, OnInit, Signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {createUserAction} from "@/modules/create-user/store/actions/create-user.action";
import {selectIsSubmitting, selectValidationErrors} from "@/modules/create-user/store/create-user.selectors";
import {Meta} from "@angular/platform-browser";
import { DefaultLayoutComponent } from "@/layouts/default-layout/default-layout.component";
import { TextFieldComponent } from '@/components/base/text-field/text-field.component';
import { CardComponent } from "@/components/base/card/card.component";
import { Observable } from 'rxjs';

@Component({
    selector: 'app-create-user-page',
    standalone: true,
    templateUrl: './create-user-page.component.html',
    styleUrl: './create-user-page.component.scss',
    imports: [CommonModule, ReactiveFormsModule, DefaultLayoutComponent, TextFieldComponent, CardComponent]
})
export class CreateUserPageComponent implements OnInit{
  isSubmitting: Signal<boolean> = this.store.selectSignal(selectIsSubmitting);
  errors: Observable<any> = this.store.select(selectValidationErrors);
  createUserForm = this.fb.group({
    email: ['', [ Validators.email]],
    username:  ['', [Validators.minLength(2), Validators.maxLength(180)]],
    bio: ['', [Validators.minLength(10), Validators.maxLength(180)]],
  })

  constructor(
    private fb: NonNullableFormBuilder,
    private store: Store,
    private meta: Meta
    ) {
  }

  ngOnInit(): void {
    this.setMetadata();
    this.listenErrorsChange();
  }

  createUser(): void {
    this.createUserForm.markAllAsTouched();

    if (this.createUserForm.invalid) {
      return;
    }

    this.store.dispatch(createUserAction({createUserInput: this.createUserForm.getRawValue()}))
  }

  listenErrorsChange(): void {
    this.errors.subscribe((data: any) => {
      if (data) {
        Object.entries(data).forEach(([field, messages]) => {
          (this.createUserForm.controls as any)[field].setErrors({ backend: messages })
        })
      }
    })
  }

  setMetadata(): void {
    this.meta.addTag({
      'name': 'description',
      content: 'Some description'
    })
    this.meta.addTag({
      'name': 'title',
      content: 'Page title',
    })
  }
}
