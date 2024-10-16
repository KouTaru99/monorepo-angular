import { Component, Input, OnInit } from '@angular/core';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'vcs-toast',
  standalone: true,
  imports: [NzMessageModule, NzIconModule, CommonModule, NzButtonModule],
  template: `
  `,
  styles: [``]
})
export class VcsToastComponent implements OnInit {
  @Input() message = '';
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'info';
  @Input() duration = 3000;
  @Input() icon = 'info-circle';
  @Input() backgroundColor = '#e6f7ff';

  private messageId: string | null = null;

  animationState: 'void' | 'visible' = 'void';

  constructor(private messageService: NzMessageService) {}

  ngOnInit() {
    this.animationState = 'visible';
  }

  show() {
    this.messageId = this.messageService.create(this.type, this.message ,{
      nzDuration: this.duration,
      nzPauseOnHover: true,
      nzAnimate: true,
    }).messageId;
  }
}
