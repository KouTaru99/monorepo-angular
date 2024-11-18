import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import { TranslationService } from '../services/translation.service';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {
  constructor(private translationService: TranslationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.translationService.getCurrentLang().pipe(
      take(1),
      switchMap(lang => {
        const clonedReq = req.clone({
          headers: req.headers.set('Accept-Language', lang)
        });
        return next.handle(clonedReq);
      })
    );
  }
}
