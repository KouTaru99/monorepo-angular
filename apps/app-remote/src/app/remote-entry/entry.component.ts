import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRemoteHomeComponent } from './app-remote-home.component';

@Component({
  standalone: true,
  imports: [CommonModule, AppRemoteHomeComponent],
  selector: 'app-app-remote-entry',
  template: `
    <app-remote-home></app-remote-home>
  `,
})
export class RemoteEntryComponent {}
