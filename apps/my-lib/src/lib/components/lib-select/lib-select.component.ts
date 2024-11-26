import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';
import { ControlValueAccessorDirective } from '../../directives/control-value-accessor.directive';

@Component({
  selector: 'lib-select',
  standalone: true,
  imports: [
    CommonModule,
    ValidationErrorsComponent,
    ControlValueAccessorDirective,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './lib-select.component.html',
  styleUrl: './lib-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LibSelectComponent),
      multi: true,
    },
  ],
})
export class LibSelectComponent<T> extends ControlValueAccessorDirective<T> {
  @Input() options: T[] = [];
  @Input() label = '';
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() selectId = `vcs-select-${Math.random().toString(36).substr(2, 9)}`;
}
