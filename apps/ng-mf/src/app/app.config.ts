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
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// registerLocaleData(localeVi); // Đăng ký locale data

export class MultiTranslateHttpLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private resources: { prefix: string; suffix: string }[] = [{
      prefix: './assets/i18n/',
      suffix: '.json'
    }, {
      prefix: './assets/i18n/app-remote/',
      suffix: '.json'
    }]
  ) { }

  public getTranslation(lang: string): Observable<any> {
    return forkJoin(
      this.resources.map(config =>
        this.http.get(`${config.prefix}${lang}${config.suffix}`)
      )
    ).pipe(
      map(responses => {
        return responses.reduce((acc, curr) => {
          return { ...acc, ...curr };
        }, {});
      })
    );
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http);
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
    importProvidersFrom(
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        },
        defaultLanguage: 'en'
      })
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
};
