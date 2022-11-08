import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class NetworkInterceptor implements HttpInterceptor {
  constructor(
    private loadingService: LoadingService,
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Intercepting, Showing Loading Spinner -Network Interceptor');
    this.loadingService.showLoading();

    if (this.authService.isAuthenticated) {
      console.log(
        'User is authenticated. Cloning request, appending jwt token: '
      );
      console.log(this.authService.jwtToken);
      req = req.clone({
        headers: req.headers.append(
          'x-access-token',
          this.authService.jwtToken
        ),
      });
    }

    return next.handle(req).pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
  }
}
