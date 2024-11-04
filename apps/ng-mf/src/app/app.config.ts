import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
// import { registerLocaleData } from '@angular/common';
// import localeVi from '@angular/common/locales/vi';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { provideToastr } from 'ngx-toastr';
// import { OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// registerLocaleData(localeVi); // Đăng ký locale data

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(NzModalModule),
    provideToastr(),
    // importProvidersFrom(OwlDateTimeModule),
    // importProvidersFrom(OwlNativeDateTimeModule),
    // {provide: OWL_DATE_TIME_LOCALE, useValue: 'vi'},
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        },
        defaultLanguage: 'vi'
      })
    )
  ],
};
