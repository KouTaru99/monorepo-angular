import { Injectable, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { VcsDialogComponent } from './vcs-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class VcsDialogService {
  constructor(private modalService: NzModalService) {}

  showDialog(options: {
    title: string;
    content: string | TemplateRef<void>;
    okText?: string;
    cancelText?: string;
    onOk?: () => void;
    onCancel?: () => void;
  }): NzModalRef {
    return this.modalService.create({
      nzTitle: options.title,
      nzContent: VcsDialogComponent,
      nzData: {
        modalTitle: options.title,
        modalContent: options.content,
        okText: options.okText || 'OK',
        cancelText: options.cancelText || 'Cancel'
      },
      nzOnOk: options.onOk,
      nzOnCancel: options.onCancel
    });
  }

  showConfirm(options: {
    title: string;
    content: string;
    okText?: string;
    cancelText?: string;
    onOk?: () => void;
    onCancel?: () => void;
  }): void {
    this.modalService.confirm({
      nzTitle: options.title,
      nzContent: options.content,
      nzOkText: options.okText || 'OK',
      nzCancelText: options.cancelText || 'Cancel',
      nzOnOk: options.onOk,
      nzOnCancel: options.onCancel
    });
  }
}
