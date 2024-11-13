import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VcsSelectComponent } from '@ng-mf/my-lib';

@Component({
  selector: 'app-remote-home',
  standalone: true,
  imports: [CommonModule, VcsSelectComponent],
  templateUrl: './app-remote-home.component.html',
  styleUrl: './app-remote-home.component.scss',
})
export class AppRemoteHomeComponent {
  options = [
    { key: '1', value: 'Option 1 123123 213123 123123 123123' },
    { key: '2', value: 'Option 2' },
    { key: '3', value: 'Option 3 123123123123' },
    { key: '4', value: 'Option 4' },
    { key: '5', value: 'Option 5' },
    { key: '6', value: 'Option 6' },
  ];

  onChange(event: any) {
    console.log(event);
  }
}
