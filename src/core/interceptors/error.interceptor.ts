import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 0) {
        toastrService.error('Connection error. Please try again.');
      }
      // else if (error.status === 401) {
      //   toastrService.warning('Unauthorized. Please login.');
      // }
      else if (error.status === 500) {
        toastrService.error('Server error.');
      } else {
        toastrService.error(error.error?.message || 'An error occurred');
      }
      return throwError(() => error);
    })
  );
};
