import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDatePickerModule, NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';

registerLocaleData(localeVi);

@Component({
  selector: 'vcs-date-picker',
  standalone: true,
  imports: [CommonModule, NzDatePickerModule, FormsModule, NzButtonModule],
  providers: [{ provide: NZ_I18N, useValue: vi_VN }],
  templateUrl: './vcs-date-picker.component.html',
  styleUrls: ['./vcs-date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VcsDatePickerComponent implements AfterViewInit {
  @ViewChild(NzDatePickerComponent) datePicker!: NzDatePickerComponent;

  @Input() placeholder: string | string[] = 'Chọn ngày';
  @Input() format = 'dd/MM/yyyy';
  @Input() disabled = false;
  @Input() date: Date[] | null = null;
  @Output() dateChange = new EventEmitter<Date[]>();

  onDateChange(): void {
    if (this.date) {
      this.dateChange.emit(this.date);
    }
  }

  onCancel(): void {
    this.datePicker.checkAndClose()
  }

  onOpenChange(e: any) {
    console.log(e);
  }

  ngAfterViewInit(): void {
    const footer = document.querySelector('.ant-picker-footer');
    if (footer) {
      console.log(footer);
    }
  }

}
