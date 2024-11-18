import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
// import { registerLocaleData } from '@angular/common';
// import localeVi from '@angular/common/locales/vi';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { provideToastr } from 'ngx-toastr';
// import { OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageInterceptor, AuthInterceptor } from '@ng-mf/my-lib';

// registerLocaleData(localeVi); // Đăng ký locale data

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withHashLocation()),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    provideAnimations(),
    importProvidersFrom(NzModalModule),
    provideToastr(),
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
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LanguageInterceptor,
      multi: true
    }
  ],
};
