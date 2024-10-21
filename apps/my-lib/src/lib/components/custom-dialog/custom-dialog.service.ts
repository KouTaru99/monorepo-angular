import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CustomDialogComponent } from './custom-dialog.component';
import { Observable } from 'rxjs';

export interface DialogData {
  type: 'confirm' | 'action' | 'information';
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  actions?: { label: string; value: any }[];
}

@Injectable({
  providedIn: 'root'
})
export class CustomDialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(data: DialogData, config?: MatDialogConfig): Observable<any> {
    const dialogConfig = {
      ...config,
      data: data
    };

    const dialogRef = this.dialog.open(CustomDialogComponent, dialogConfig);

    return dialogRef.afterClosed();
  }

  confirm(title: string, message: string, confirmText = 'Yes', cancelText = 'No'): Observable<boolean> {
    return this.openDialog({
      type: 'confirm',
      title,
      message,
      confirmText,
      cancelText
    });
  }

  action(title: string, message: string, actions: { label: string; value: any }[]): Observable<any> {
    return this.openDialog({
      type: 'action',
      title,
      message,
      actions
    });
  }

  information(title: string, message: string): Observable<void> {
    return this.openDialog({
      type: 'information',
      title,
      message
    });
  }

  closeAll(): void {
    this.dialog.closeAll();
  }
}
