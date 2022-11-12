import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, shareReplay, Subject } from 'rxjs';
import { AuthGuardService } from './auth-guard.service';

export interface LoginInfo {
  username: string;
  password: string;
}

export interface RegistrationInfo {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;
  jwtToken: string = '';
  loginSuccess: Subject<boolean> = new Subject<boolean>();
  loginFailure: Subject<Error> = new Subject<Error>();
  registrationSuccess: Subject<boolean> = new Subject<boolean>();
  registrationFailure: Subject<Error> = new Subject<Error>();

  user: any = {};

  constructor(private http: HttpClient) {
    console.log('Authentication Service constructing');
  }

  login(loginInfo: LoginInfo): void {
    this.http.post('http://localhost:3000/auth/signin', loginInfo).subscribe({
      next: (response: any) => {
        console.log(response);
        console.log('Successful Login');
        this.user = response;
        this.isAuthenticated = true;
        this.jwtToken = response.accessToken;
        this.loginSuccess.next(true);
      },
      error: (error: Error) => {
        console.log('Failed Login');
        this.loginFailure.next(error);
      },
    });
  }

  register(registrationInfo: RegistrationInfo): void {
    this.http
      .post('http://localhost:3000/auth/signup', registrationInfo)
      .subscribe({
        next: (response) => {
          console.log(response);
          console.log('Successful Registration');
          this.registrationSuccess.next(true);
        },
        error: (error: Error) => {
          console.log('Failed Registration');
          this.registrationFailure.next(error);
        },
      });
  }
}
