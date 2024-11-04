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
    this.el.nativeElement.style.whiteSpace = 'nowrap';
    this.el.nativeElement.style.maxWidth = '100px';
  }

  ngAfterViewInit() {
    this.tooltip.tooltipClass = 'vcs-tooltip';
    if (this.el.nativeElement.scrollWidth > this.el.nativeElement.clientWidth) {
      this.tooltip.message = this.el.nativeElement.textContent;
      this.tooltip.disabled = false;

    } else {
      this.tooltip.disabled = true;
    }
  }
}
