import { HttpInterceptorFn } from '@angular/common/http';

export const myNameInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
