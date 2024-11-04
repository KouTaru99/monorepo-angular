import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLang = new BehaviorSubject<string>('vi');

  constructor(private translate: TranslateService) {
    // Set default language
    translate.setDefaultLang('vi');

    // Get browser language or use default
    const browserLang = translate.getBrowserLang();
    console.log(browserLang,'browser language');

    translate.use(browserLang?.match(/en|vi/) ? browserLang : 'vi');
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang.next(lang);
  }

  getCurrentLang() {
    return this.currentLang.asObservable();
  }
}
