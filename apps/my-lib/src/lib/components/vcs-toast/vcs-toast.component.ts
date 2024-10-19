import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { NzIconModule } from 'ng-zorro-antd/icon';

interface ToastConfig {
  backgroundColor: string;
  icon: string;
  textColor: string;
}

@Component({
  selector: 'vcs-toast',
  standalone: true,
  imports: [CommonModule, NzNotificationModule, NzIconModule],
  template: `
    <ng-template #notificationTemplate let-data>
      <div class="custom-notification">
        <i nz-icon [nzType]="data.icon" nzTheme="outline"></i>
        <span>{{ data.message }}</span>
      </div>
    </ng-template>
  `
})
export class VcsToastComponent implements OnInit {
  @Input() message = '';
  @Input() type: 'success' | 'info' | 'warning' | 'error' = 'info';
  @Input() duration = 3000;

  private toastConfigs: { [key: string]: ToastConfig } = {
    success: { backgroundColor: '#f6ffed', icon: 'check-circle', textColor: '#52c41a' },
    info: { backgroundColor: '#e6f7ff', icon: 'info-circle', textColor: '#1890ff' },
    warning: { backgroundColor: '#fffbe6', icon: 'exclamation-circle', textColor: '#faad14' },
    error: { backgroundColor: '#fff2f0', icon: 'close-circle', textColor: '#f5222d' },
  };

  @ViewChild('notificationTemplate', { static: true }) notificationTemplate!: TemplateRef<{}>;

  constructor(private notification: NzNotificationService) {}

  ngOnInit() {
    this.showNotification();
  }

  private showNotification() {
    const config = this.toastConfigs[this.type];
    this.notification.create(
      this.type,
      '',
      this.message,
      {
        nzDuration: this.duration,
        nzStyle: { backgroundColor: config.backgroundColor },
        nzClass: 'custom-notification',
        nzData: { message: this.message, icon: config.icon }
      }
    );
  }
}
