import { KeyValuePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'lib-validation-errors',
  templateUrl: './validation-errors.component.html',
  styleUrls: ['./validation-errors.component.scss'],
  standalone: true,
  imports: [CommonModule, KeyValuePipe],
})
export class ValidationErrorsComponent implements OnChanges {
  @Input() errors: Record<string, ValidationErrors> | null = {};
  @Input() customErrorMessages: Record<string, string> = {};
  errorMessages: Record<string, string> = {
    required: 'This field is required',
  };

  ngOnChanges(changes: SimpleChanges): void {
    const { customErrorMessages } = changes;
    if (customErrorMessages) {
      this.errorMessages = {
        ...this.errorMessages,
        ...customErrorMessages.currentValue,
      };
    }
  }
}