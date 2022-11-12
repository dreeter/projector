import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { shareReplay, Subscription, take, takeUntil } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoginInfo } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  loginSuccessSub: Subscription = {} as Subscription;
  loginFailureSub: Subscription = {} as Subscription;
  registrationSuccessSub: Subscription = {} as Subscription;

  authForm: FormGroup = {} as FormGroup;
  @ViewChild('formGroupDirective') formGroupDirective: FormGroupDirective =
    {} as FormGroupDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.loginSuccessSub = this.authService.loginSuccess.subscribe(
      (success: boolean) => {
        this.router.navigateByUrl('/home');
      }
    );

    this.loginFailureSub = this.authService.loginFailure.subscribe(
      (error: Error) => {
        this.snackBar.open('Invalid Username or Password', undefined, {
          duration: 3000,
        });
        this.authForm.reset();
        this.formGroupDirective.resetForm();
      }
    );

    this.registrationSuccessSub = this.authService.registrationSuccess
      .pipe(shareReplay({ bufferSize: 1, refCount: true }))
      .subscribe(() => {
        this.snackBar.open('Registration Successful. Please Login', undefined, {
          duration: 7000,
        });
      });
  }

  onSubmit(formGroupDirective: FormGroupDirective) {
    const loginInfo: LoginInfo = {
      username: this.authForm.get('username')!.value,
      password: this.authForm.get('password')!.value,
    };

    this.authService.login(loginInfo);
  }

  ngOnDestroy() {
    this.loginFailureSub.unsubscribe();
    this.loginSuccessSub.unsubscribe();
  }
}
