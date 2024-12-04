import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ControlValueAccessorDirective } from '../../directives/control-value-accessor.directive';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';


type InputType = 'text' | 'number' | 'email' | 'password';

@Component({
  selector: 'lib-input',
  templateUrl: './vcs-input.component.html',
  styleUrls: ['./vcs-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LibInputComponent),
      multi: true,
    },
    provideNgxMask()
  ],
  standalone: true,
  imports: [
    ValidationErrorsComponent,
    NgxMaskDirective,
    NgxMaskPipe, ReactiveFormsModule, CommonModule],
})
export class LibInputComponent<T> extends ControlValueAccessorDirective<T> {
  @Input() label = '';
  @Input() type: InputType = 'text';
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() id = `vcs-input-${Math.random().toString(36).substr(2, 9)}`;
  @Input() showMaskTyped = true
  @Input() dropSpecialCharacters = false
  @Input() validation = false
  @Input() mask = ''
  @Input() leadZeroDateTime = false
  @Input() inputType: 'text' | 'number' | 'tel-vn' = 'text'
  @Output() inputValChange = new EventEmitter<any>();

  override ngOnInit() {
    super.ngOnInit();
    this.control?.valueChanges.subscribe((value) => {
      this.inputValChange.emit(value);
    });
  }
}
