import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const token: string | null = localStorage.getItem('token');
  if (token && req.url.includes('cart')) {
    req = req.clone({ setHeaders: { token } });
  }

  return next(req);
};
