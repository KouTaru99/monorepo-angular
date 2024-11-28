import { Component, Input, Inject, Injector, forwardRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OWL_DATE_TIME_LOCALE, OWL_DATE_TIME_FORMATS, OwlDateTimeModule, OwlNativeDateTimeModule, DateTimeAdapter } from '@danielmoncada/angular-datetime-picker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LibInputComponent } from '../vcs-input/vcs-input.component';
import { distinctUntilChanged } from 'rxjs';
import { filter } from 'rxjs';
import { ControlValueAccessorDirective } from '../../directives/control-value-accessor.directive';
import { DATE_TIME_PICKER_TYPE_FORMATS } from './date';
import { DateTimePickerType } from './date';
import { MY_NATIVE_FORMATS } from './date';


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
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    LibInputComponent,
  ],
  providers: [
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'vi' },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDatetimePickerComponent),
      multi: true,
    },
  ]
})
export class CustomDatetimePickerComponent<T> extends ControlValueAccessorDirective<T> {
  @Input() type: DateTimePickerType = DateTimePickerType.DATE_SINGLE;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Output() dateValChange = new EventEmitter<any>();
  dateVal:any = null;
  format = DATE_TIME_PICKER_TYPE_FORMATS[this.type];
  dateTimePickerType = DateTimePickerType;

  constructor(
    private datetimeAdapter: DateTimeAdapter<Date>,
    @Inject(Injector) injector: Injector
  ) {
    super(injector);
    this.datetimeAdapter.setLocale('vi');
  }

  override ngOnInit() {
    super.ngOnInit();
    this.control?.valueChanges.pipe(
      distinctUntilChanged(),
      filter(value => !!value)
    ).subscribe(value => {
      if (value) {
        if (this.type === DateTimePickerType.DATE_RANGE || this.type === DateTimePickerType.DATE_TIME_RANGE) {
          const [fromPart, toPart] = value.split(' - ');
          const fromDate = this.parseDateTimeString(fromPart);
          const toDate = this.parseDateTimeString(toPart);
          this.dateVal = [fromDate || null, toDate || null]
        } else {
          const date = this.parseDateTimeString(value);
          this.dateVal = date || null;
        }
      }
      this.dateValChange.emit(this.dateVal);
    });
  }

  onDateTimePickerChange(event: any) {
    console.log(event.value);
    if (event.value || event.value.length) {
      if (this.type === DateTimePickerType.DATE_RANGE || this.type === DateTimePickerType.DATE_TIME_RANGE) {
        const [fromDate, toDate] = event.value;
        const formattedDateTime = `${this.formatDate(fromDate)} - ${this.formatDate(toDate)}`;
        this.control?.patchValue(formattedDateTime, {emitEvent: false});
      } else {
        this.control?.patchValue(this.formatDate(event.value), {emitEvent: false});
      }
    }
  }

  private formatDate(date: Date): string {
    const nativeFormat:any = this.type.includes('time') ? MY_NATIVE_FORMATS.fullPickerInput : MY_NATIVE_FORMATS.datePickerInput;
    if (!date) return '';
    const dateString = date.toLocaleString('vi', nativeFormat);
    return dateString;
  }

  private parseDateTimeString(value: string): Date | null {
    try {
      const [datePart, timePart] = this.type.includes('time') ? value.trim().split(' ') : [value.trim(), ''];
      const [day, month, year] = datePart.split('/').map(Number);
      const [hours, minutes, seconds] = timePart ? timePart.split(':').map(Number) : [0, 0, 0];
      const result = this.type.includes('time') ? new Date(year, month - 1, day, hours, minutes, seconds) : new Date(year, month - 1, day );
      return result.getMonth() === month - 1 ? result : null;
    } catch {
      return null;
    }
  }
}
