import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { CustomToastFromMaterialComponent } from './custom-toast-from-material.component';

interface CustomToastConfig extends Partial<IndividualConfig> {
  data?: { actionLabel?: string; action?: () => void };
}

@Injectable({
  providedIn: 'root'
})
export class CustomToastFromMaterialService {
  constructor(private toastr: ToastrService) {}

  private showToast(title: string, message: string, type: string, actionLabel?: string, action?: () => void) {
    const config: CustomToastConfig = {
      toastComponent: CustomToastFromMaterialComponent,
      toastClass: `ngx-toastr custom-toast toast-${type}`,
      closeButton: true,
      timeOut: 0,
      extendedTimeOut: 1000,
      progressBar: true,
      positionClass: 'toast-top-right',
      data: { actionLabel, action }
    };
    this.toastr.show(message, title, config, type);
  }

  showSuccess(title: string, message: string, actionLabel?: string, action?: () => void) {
    this.showToast(title, message, 'success', actionLabel, action);
  }

  showInfo(title: string, message: string, actionLabel?: string, action?: () => void) {
    this.showToast(title, message, 'info', actionLabel, action);
  }

  showWarning(title: string, message: string, actionLabel?: string, action?: () => void) {
    this.showToast(title, message, 'warning', actionLabel, action);
  }

  showError(title: string, message: string, actionLabel?: string, action?: () => void) {
    this.showToast(title, message, 'error', actionLabel, action);
  }
}
