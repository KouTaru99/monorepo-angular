import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDatetimePickerComponent } from '@ng-mf/my-lib';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-datetime-modal',
  standalone: true,
  imports: [CommonModule, CustomDatetimePickerComponent, MatDialogModule, MatIconModule],
  templateUrl: './datetime-modal.component.html',
  styleUrl: './datetime-modal.component.scss',
})
export class DatetimeModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DatetimeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose() {
    this.dialogRef.close();
  }

}
