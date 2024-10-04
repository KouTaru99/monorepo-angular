import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'vcs-icon',
  templateUrl: './vcs-icon.component.html',
  styleUrls: ['./vcs-icon.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule],
})
export class VcsIconComponent implements OnInit {
  @Input() iconName = '';
  iconSvg: SafeHtml = '';

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadIcon();
  }

  private loadIcon() {
    const iconPath = `assets/icons/${this.iconName}.svg`;
    this.http.get(iconPath, { responseType: 'text' })
      .subscribe({
        next: (svg: string) => {
          this.iconSvg = this.sanitizer.bypassSecurityTrustHtml(svg);
        },
        error: (error) => {
          console.error('Unable to load icon:', error);
          this.iconSvg = '';
        }
      });
  }
}
