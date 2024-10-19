import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
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
