import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'environments/environment.development';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const symbol = req.url.match(/\?/) ? '&' : '?';

  const apiReq = req.clone({
    url: `${environment.apiBaseUrl}${req.url}${symbol}${environment.apiKey}`
  });

  return next(apiReq);
};

