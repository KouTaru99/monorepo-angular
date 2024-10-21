import { Component, NgZone } from '@angular/core';
import { Toast, ToastrService, ToastPackage, IndividualConfig } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'custom-toast-from-material',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './custom-toast-from-material.component.html',
  styleUrls: ['./custom-toast-from-material.component.scss']
})
export class CustomToastFromMaterialComponent extends Toast<any> {
  icon: string;

  constructor(
    override toastrService: ToastrService,
    override toastPackage: ToastPackage,
    protected override ngZone?: NgZone
  ) {
    super(toastrService, toastPackage, ngZone);
    this.icon = this.getIcon();
  }

  action() {
    const config = this.toastPackage.config as IndividualConfig & { data?: { action?: () => void } };
    if (config.data?.action && typeof config.data.action === 'function') {
      config.data.action();
    }
    this.remove();
  }

  getIcon(): string {
    switch (this.toastPackage.toastType) {
      case 'success': return 'check_circle';
      case 'error': return 'error';
      case 'warning': return 'warning';
      default: return 'info';
    }
  }
}
