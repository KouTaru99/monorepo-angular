import { Component, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'custom-datetime-picker',
  templateUrl: './custom-datetime-picker.component.html',
  styleUrls: ['./custom-datetime-picker.component.scss'],
  standalone: true
})
export class CustomDatetimePickerComponent implements AfterViewInit {
  @ViewChildren('hoursFrom, minutesFrom, secondsFrom, dateFrom, monthFrom, yearFrom, hoursTo, minutesTo, secondsTo, dateTo, monthTo, yearTo')
  inputs!: QueryList<ElementRef>;

  ngAfterViewInit() {
    const inputElements = this.inputs.toArray();

    inputElements.forEach((input, index) => {
      const element = input.nativeElement as HTMLInputElement;

      element.addEventListener('keyup', (e: KeyboardEvent) => {
        if (e.key === 'Backspace' || e.key === 'Delete') return;

        const target = e.target as HTMLInputElement;
        let value = target.value;

        // Validate and format input
        if (value) {
          if (this.isHourInput(index)) {
            value = this.formatTwoDigits(value, 23);
          } else if (this.isMinuteOrSecondInput(index)) {
            value = this.formatTwoDigits(value, 59);
          } else if (this.isDateInput(index)) {
            value = this.formatTwoDigits(value, 31);
          } else if (this.isMonthInput(index)) {
            value = this.formatTwoDigits(value, 12);
          }

          target.value = value;

          // Move to next input if current is filled
          if (value.length === target.maxLength && index < inputElements.length - 1) {
            inputElements[index + 1].nativeElement.focus();
          }
        }
      });

      element.addEventListener('keydown', (e: KeyboardEvent) => {
        const target = e.target as HTMLInputElement;

        // Handle backspace
        if (e.key === 'Backspace' && !target.value && index > 0) {
          e.preventDefault();
          inputElements[index - 1].nativeElement.focus();
        }

        // Prevent non-numeric input except for special keys
        if (!/^\d$/.test(e.key) &&
            !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
          e.preventDefault();
        }
      });
    });
  }

  private formatTwoDigits(value: string, max: number): string {
    let numValue = parseInt(value);
    if (isNaN(numValue)) return '';

    // Ensure value doesn't exceed maximum
    numValue = Math.min(numValue, max);

    // Add leading zero for single digits
    return numValue.toString().padStart(2, '0');
  }

  private isHourInput(index: number): boolean {
    return index === 0 || index === 6;
  }

  private isMinuteOrSecondInput(index: number): boolean {
    return index === 1 || index === 2 || index === 7 || index === 8;
  }

  private isDateInput(index: number): boolean {
    return index === 3 || index === 9;
  }

  private isMonthInput(index: number): boolean {
    return index === 4 || index === 10;
  }
}
