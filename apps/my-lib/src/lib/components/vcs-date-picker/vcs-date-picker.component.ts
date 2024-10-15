import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';

registerLocaleData(localeVi);

@Component({
  selector: 'vcs-date-picker',
  standalone: true,
  imports: [CommonModule, NzDatePickerModule],
  providers: [{ provide: NZ_I18N, useValue: vi_VN }],
  templateUrl: './vcs-date-picker.component.html',
  styleUrls: ['./vcs-date-picker.component.scss'],
})
export class VcsDatePickerComponent {}
