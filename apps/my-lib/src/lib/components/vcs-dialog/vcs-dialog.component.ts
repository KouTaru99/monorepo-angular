import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
export const MY_NATIVE_FORMATS = {
  fullPickerInput: {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'},
  datePickerInput: {year: 'numeric', month: 'numeric', day: 'numeric'},
  timePickerInput: {hour: 'numeric', minute: 'numeric', second: 'numeric'},
  monthYearLabel: {year: 'numeric', month: 'short'},
  dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
  monthYearA11yLabel: {year: 'numeric', month: 'long'},
  rangePickerInput: {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'},

};
@Component({
  selector: 'vcs-dialog',
  standalone: true,
  imports: [CommonModule, NzModalModule],
  templateUrl: './vcs-dialog.component.html',
  styleUrls: ['./vcs-dialog.component.scss'],
})
export class VcsDialogComponent {
  @Input() modalTitle: string = '';
  @Input() modalContent: string | TemplateRef<void> = '';
  @Input() okText: string = 'OK';
  @Input() cancelText: string = 'Cancel';
}
