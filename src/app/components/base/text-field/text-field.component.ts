import { Component, Input, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss',
})
export class TextFieldComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() messages: any = {};
  @Input('type') inputType = 'text';

  touched = false;
  disabled = false;
  value = '';

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  get errors(): any {
    return this.ngControl?.errors || {}
  }

  get errorMessages(): any {
    return Object.entries(this.errors)
    .map(([key, options]) => this.parseTranslationParams(this.messages[key], options))
    .join(', ')
  }

  get areMessagesShown(): boolean {
    return Boolean(this.ngControl?.touched) && Boolean(this.errorMessages)
  }

  onChange = (value: string) => {
    throw new Error('Method not implemented!')
  };

  onTouched = () => {};

  writeValue(obj: any): void {
    this.value = obj;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (!this.disabled) {
      this.disabled = isDisabled
    }
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
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
    options: unknown,
  ): string {
    try {
      return translation.replace(/{([^{}]*)}/g, (_: string, key: string) => {
        return this.getPropertyByString(options, key) || '';
      });
    } catch (e) {
      return '';
    }
  }

  getPropertyByString(object: unknown, property: string, sep = '.') {
    try {
      let translation: any = object;

      property.split(sep).map((key) => {
        translation = translation[key];
      });
      return translation;
    } catch (e) {
      return property;
    }
  }


}
