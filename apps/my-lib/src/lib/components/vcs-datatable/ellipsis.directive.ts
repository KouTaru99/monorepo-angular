import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[vcsEllipsis]',
  standalone: true,
  hostDirectives: [MatTooltip]
})
export class VcsEllipsisDirective implements AfterViewInit {
  constructor(
    private el: ElementRef,
    private tooltip: MatTooltip
  ) {
    this.el.nativeElement.style.maxHeight = '100px';
    this.el.nativeElement.style.overflow = 'hidden';
    this.el.nativeElement.style.textOverflow = 'ellipsis';
    this.el.nativeElement.style.whiteSpace = 'nowrap';
  }

  ngAfterViewInit() {
    if (this.el.nativeElement.scrollHeight > this.el.nativeElement.clientHeight) {
      this.tooltip.message = this.el.nativeElement.textContent;
      this.tooltip.disabled = false;
    } else {
      this.tooltip.disabled = true;
    }
  }
}
