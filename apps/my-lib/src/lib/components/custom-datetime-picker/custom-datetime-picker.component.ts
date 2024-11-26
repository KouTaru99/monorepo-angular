import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FormControl, ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { OWL_DATE_TIME_LOCALE, OWL_DATE_TIME_FORMATS, OwlDateTimeModule, OwlNativeDateTimeModule, DateTimeAdapter } from '@danielmoncada/angular-datetime-picker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const MY_NATIVE_FORMATS = {
  fullPickerInput: {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false},
  datePickerInput: {year: 'numeric', month: 'numeric', day: 'numeric'},
  timePickerInput: {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false},
  monthYearLabel: {year: 'numeric', month: 'short'},
  dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
  monthYearA11yLabel: {year: 'numeric', month: 'long'},
};

export interface DateTimeRange {
  fromDate: Date | null;
  toDate: Date | null;
}

@Component({
  selector: 'custom-datetime-picker',
  templateUrl: './custom-datetime-picker.component.html',
  styleUrls: ['./custom-datetime-picker.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    provideNgxMask(),
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'vi' },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS },
  ]
})
export class CustomDatetimePickerComponent implements OnInit, OnDestroy {
  @Input() dateTimeControl: FormControl = new FormControl();
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Output() dateRangeChange = new EventEmitter<DateTimeRange>();

  dateRangeForm!: FormGroup;

  constructor(
    private datetimeAdapter: DateTimeAdapter<Date>,
    private fb: FormBuilder
  ) {
    this.datetimeAdapter.setLocale('vi');
  }

  ngOnInit() {
    this.dateRangeForm = this.fb.group({
      date: [null],
      dateTime: this.dateTimeControl
    });

    // Subscribe to dateTime changes to sync with date picker
    this.dateRangeForm.get('dateTime')?.valueChanges.subscribe(value => {
      if (value) {
        const [fromPart, toPart] = value.split(' - ');
        const fromDate = this.parseDateTimeString(fromPart);
        const toDate = this.parseDateTimeString(toPart);

        if (fromDate && toDate) {
          this.dateRangeForm.patchValue({
            date: [fromDate, toDate]
          }, { emitEvent: false });
        }
      }
    });

    // Subscribe to date changes to emit values
    this.dateRangeForm.get('date')?.valueChanges.subscribe(value => {
      if (value && value.length === 2) {
        this.dateRangeChange.emit({
          fromDate: value[0],
          toDate: value[1]
        });
      }
    });
  }

  onDateTimePickerChange(event: any) {
    if (event && event.value.length === 2) {
      const [fromDate, toDate] = event.value;
      const formattedDateTime = `${this.formatDate(fromDate)} - ${this.formatDate(toDate)}`;
      this.dateRangeForm.patchValue({
        date: [fromDate, toDate],
        dateTime: formattedDateTime
      });
    }
  }

  ngOnDestroy() {
    // Cleanup subscriptions if needed
  }

  private formatDate(date: Date): string {
    if (!date) return '';
    const dateString = date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    return dateString;
  }

  private parseDateTimeString(value: string): Date | null {
    if (!value || value.length < 19) return null;

    try {
      const [time, date] = value.trim().split(' ');
      if (!time || !date) return null;

      const [hours, minutes, seconds] = time.split(':').map(Number);
      const [day, month, year] = date.split('/').map(Number);

      // Validate time format
      if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59 ||
          seconds < 0 || seconds > 59) {
        return null;
      }

      // Validate date format
      if (day < 1 || day > 31 || month < 1 || month > 12) {
        return null;
      }

      const result = new Date(year, month - 1, day, hours, minutes, seconds);

      // Check if date is valid (e.g., 31/04/2024 is invalid)
      if (result.getMonth() !== month - 1) {
        return null;
      }

      return result;
    } catch {
      return null;
    }
  }
}
