import { Directive, Inject, Injector, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  Validators,
  NgControl,
  FormControlName,
  FormGroupDirective,
  FormControlDirective,
} from '@angular/forms';
import { Subject, distinctUntilChanged } from 'rxjs';

@Directive({
  selector: '[libControlValueAccessor]',
  standalone: true,
})
export class ControlValueAccessorDirective<T>
  implements ControlValueAccessor, OnInit
{
  control: FormControl | undefined;
  isRequired = false;
  private _value: T | null = null;

  private _isDisabled = false;
  private _destroy$ = new Subject<void>();
  private _onTouched!: () => T;

  constructor(@Inject(Injector) private injector: Injector) {}

  ngOnInit() {
    this.setFormControl();
    this.isRequired = this.control?.hasValidator(Validators.required) ?? false;
  }

  setFormControl() {
    try {
      const formControl = this.injector.get(NgControl);

      switch (formControl.constructor) {
        case FormControlName:
          this.control = this.injector
            .get(FormGroupDirective)
            .getControl(formControl as FormControlName);
          break;
        default:
          this.control = (formControl as FormControlDirective)
            .form as FormControl;
          break;
      }
    } catch (err) {
      this.control = new FormControl();
    }
  }

  writeValue(value: T): void {
    this._value = value;
    if (this.control && value !== this.control.value) {
      this.control.patchValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: (val: T | null) => T): void {
    if (this.control) {
      this.control.valueChanges
        .pipe(distinctUntilChanged())
        .subscribe(value => {
          this._value = value;
          fn(value);
        });
    }
  }

  registerOnTouched(fn: () => T): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
    if (this.control) {
      if (isDisabled && !this.control.disabled) {
        this.control.disable({ emitEvent: false });
      } else if (!isDisabled && this.control.disabled) {
        this.control.enable({ emitEvent: false });
      }
    }
  }
}
