import { Component, Input, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';


const deafultMessages = {
  required: 'Required field',
  minlength: 'Minimum length {requiredLength} (actual: {actualLength})',
  maxlength: 'Minimum length {requiredLength} (actual: {actualLength})',
  email: 'Invalid email format',
}

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss',
})
export class TextFieldComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() messages: Record<string, string> = {};
  @Input('type') inputType = 'text';

  touched = false;
  disabled = false;
  value = '';

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  get name(): string | undefined{
    return String(this.ngControl.name)
  }

  get errors(): Record<string, any> {
    return this.ngControl?.errors || {}
  }

  get errorMessages(): string {
    return Object.entries(this.errors)
      .map(([key, options]) => {

        if (key === 'backend') {
          return options
        }

        return this.parseTranslationParams(this.commonMessages[key], options)
      })
      .join(', ')
  }

  get commonMessages(): Record<string, any> {
    return {
      ...deafultMessages,
      ...this.messages,
    }
  }

  get areMessagesShown(): boolean {
    return Boolean(this.ngControl?.touched) && Boolean(this.errorMessages)
  }

  onChange = (value: string): void => {

  };

  onTouched = () => { };

  writeValue(obj: string): void {
    this.value = obj;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (!this.disabled) {
      this.disabled = isDisabled
    }
  }

  registerOnChange(onChange: (value: string) => void) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  private parseTranslationParams(
    translation: string | Record<string, any>,
    options: Record<string, any>,
  ): string {
    try {
      return translation.replace(/{([^{}]*)}/g, (_: string, key: string) => {
        return this.getPropertyByString(options, key) || '';
      });
    } catch (e) {
      return '';
    }
  }

  getPropertyByString(object: Record<string, any>, property: string, sep = '.') {
    try {
      let translation: Record<string, any> = object;

      property.split(sep).map((key) => {
        translation = translation[key];
      });
      return translation;
    } catch (e) {
      return property;
    }
  }


}
