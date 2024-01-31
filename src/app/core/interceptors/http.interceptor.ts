import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'environments/environment.prod';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const symbol = req.url.indexOf('?') >= 0 ? '&' : '?';

  const apiReq = req.clone({
    url: `${environment.apiBaseUrl}${req.url}${symbol}apikey=${environment.apiKey}`
  });

  return next(apiReq);
};

