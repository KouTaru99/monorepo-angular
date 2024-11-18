import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { TranslationService } from '../services/translation.service';

@Injectable({ providedIn: 'root' })
export class LanguageGuard implements CanActivate {
  constructor(private translationService: TranslationService) {}

  canActivate(): boolean {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
      this.translationService.setLanguage(savedLang);
    }
    return true;
  }
}
