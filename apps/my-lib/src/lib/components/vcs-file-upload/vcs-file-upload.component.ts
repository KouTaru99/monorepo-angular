import { Component, EventEmitter, Input, Output, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialogActions } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export interface FileInfo {
  file: File;
  size: string;
  progress: number;
}

@Component({
  selector: 'vcs-file-upload',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatProgressBarModule, MatIconModule, MatDialogModule, MatDialogActions, MatProgressSpinnerModule],
  templateUrl: './vcs-file-upload.component.html',
  styleUrl: './vcs-file-upload.component.scss',
})
export class VcsFileUploadComponent {
  @Input() accept = '*/*';
  @Input() multiple = false;
  files: File[] = [];
  isDragging = false;
  fileInfos: FileInfo[] = [];
  isUploading = false;

  constructor(
    public dialogRef: MatDialogRef<VcsFileUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.accept = data.accept || this.accept;
      this.multiple = data.multiple || this.multiple;
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = Array.from(event.dataTransfer?.files || []);
    this.handleFiles(files);
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      this.handleFiles(files);
    }
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  private handleFiles(files: File[]) {
    const newFiles = files.map(file => ({
      file: file,
      size: this.formatFileSize(file.size),
      progress: 0
    }));

    this.fileInfos = this.multiple ? [...this.fileInfos, ...newFiles] : [newFiles[0]];
    this.files = this.fileInfos.map(f => f.file);
  }

  async onUpload() {
    this.isUploading = true;

    // Giả lập upload progress
    for (let fileInfo of this.fileInfos) {
      for (let i = 0; i <= 100; i += 10) {
        fileInfo.progress = i;
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }

    this.isUploading = false;
    this.dialogRef.close(this.files);
  }

  removeFile(index: number) {
    this.fileInfos.splice(index, 1);
    this.files = this.fileInfos.map(f => f.file);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
