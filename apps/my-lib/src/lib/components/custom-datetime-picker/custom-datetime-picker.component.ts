import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DateTimeAdapter, OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS } from '@danielmoncada/angular-datetime-picker';

const MY_NATIVE_FORMATS = {
  fullPickerInput: {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false},
  datePickerInput: {day: '2-digit', month: '2-digit', year: 'numeric'},
  timePickerInput: {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false},
  monthYearLabel: {year: 'numeric', month: 'short'},
  dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
  monthYearA11yLabel: {year: 'numeric', month: 'long'},
  rangePickerInput: {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false},
};

@Component({
  selector: 'custom-datetime-picker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  templateUrl: './custom-datetime-picker.component.html',
  styleUrl: './custom-datetime-picker.component.scss',
  providers: [
    {provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS},
  ]
})
export class CustomDatetimePickerComponent implements OnInit {
  selectedDate: Date | Date[] | null = null;

  constructor(private dateTimeAdapter: DateTimeAdapter<Date>) {
    this.dateTimeAdapter.setLocale('vi');
  }

  ngOnInit() {
    console.log('custom-datetime-picker');
  }

  parseDate(dateString: string): Date | null {
    if (!dateString) return null;
    const parts = dateString.split(/[/ :]/);
    if (parts.length !== 6) return null;
    const [day, month, year, hours, minutes, seconds] = parts.map(Number);
    return new Date(year, month - 1, day, hours, minutes, seconds);
  }

  // formatDate(date: Date | null): string {
  //   if (!date) return '';
  //   return date.toLocaleString('vi-VN', {
  //     day: '2-digit',
  //     month: '2-digit',
  //     year: 'numeric',
  //     hour: '2-digit',
  //     minute: '2-digit',
  //     second: '2-digit',
  //     hour12: false
  //   });
  // }

  onDateTimeChange(value: Date | Date[] | null) {
    console.log('Selected date:', value);
    // Thêm xử lý khác nếu cần
  }

  formatDateRange(dateRange: Date | Date[] | null): string {
    if (!dateRange) return '';
    if (Array.isArray(dateRange)) {
      return dateRange.map(date => this.formatSingleDate(date)).join(' - ');
    }
    return this.formatSingleDate(dateRange);
  }

  formatSingleDate(date: Date | null): string {
    if (!date) return '';
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  }
}
