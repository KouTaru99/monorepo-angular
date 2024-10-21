import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNzI18n, vi_VN } from 'ng-zorro-antd/i18n'; // Import locale
import { registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { provideToastr } from 'ngx-toastr';
import { OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';

registerLocaleData(localeVi); // Đăng ký locale data



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    provideAnimations(),
    provideNzI18n(vi_VN),
    importProvidersFrom(NzModalModule),
    provideToastr(),
    importProvidersFrom(OwlDateTimeModule),
    importProvidersFrom(OwlNativeDateTimeModule),
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'vi'},
  ],
};
