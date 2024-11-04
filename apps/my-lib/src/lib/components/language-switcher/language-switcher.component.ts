import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'vcs-language-switcher',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatMenuModule, TranslateModule],
  template: `
    <button mat-button [matMenuTriggerFor]="menu">
      {{ currentLang | uppercase }}
    </button>
    <mat-menu #menu="matMenu" >
      <button mat-menu-item (click)="switchLanguage('vi')">Tiếng Việt</button>
      <button mat-menu-item (click)="switchLanguage('en')">English</button>
    </mat-menu>
  `
})
export class LanguageSwitcherComponent {
  currentLang:any = 'vi';


  constructor(private translationService: TranslationService, private translateService: TranslateService) {

    this.currentLang = this.translateService.getBrowserLang()
    this.switchLanguage(this.currentLang)
  }

  switchLanguage(lang: string) {
    this.currentLang = lang
    this.translationService.setLanguage(lang);
  }
}
