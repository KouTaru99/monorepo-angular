import { Injectable, TemplateRef } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

interface ToastConfig {
  backgroundColor: string;
  icon: string;
  textColor: string;
}


@Injectable({
  providedIn: 'root'
})
export class VcsToastService {
  private toastConfigs: { [key: string]: ToastConfig } = {
    success: { backgroundColor: '#f6ffed', icon: 'check-circle', textColor: '#52c41a' },
    info: { backgroundColor: '#e6f7ff', icon: 'info-circle', textColor: '#1890ff' },
    warning: { backgroundColor: '#fffbe6', icon: 'exclamation-circle', textColor: '#faad14' },
    error: { backgroundColor: '#fff2f0', icon: 'close-circle', textColor: '#f5222d' },
  };

  private template: TemplateRef<{}> | null = null;

  constructor(private notification: NzNotificationService) {}

  setTemplate(template: TemplateRef<{}>) {
    this.template = template;
  }

  show(message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', duration = 3000) {
    const config = this.toastConfigs[type];

    if (this.template) {
      this.notification.template(
        this.template,
        {
          nzDuration: duration,
          nzStyle: { backgroundColor: config.backgroundColor },
          nzClass: 'custom-notification',
          nzData: { message, icon: config.icon }
        }
      );
    } else {
      // Fallback to basic notification if template is not set
      this.notification.create(type, '', message, {
        nzDuration: duration,
        nzStyle: { backgroundColor: config.backgroundColor },
        nzClass: 'custom-notification'
      });
    }
  }
}
