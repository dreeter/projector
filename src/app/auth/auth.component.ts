import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
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

  authForm: FormGroup = {} as FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

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
        //show user success and allow them into the protected home route
        console.log('Successful Login, navigating to home route');
        this.router.navigateByUrl('/home');
      }
    );

    this.loginFailureSub = this.authService.loginFailure.subscribe(
      (error: Error) => {
        console.log('Login failure, showing user login error message');
        //show user error logging them in
      }
    );
  }

  onSubmit() {
    const loginInfo: LoginInfo = {
      username: this.authForm.get('username')!.value,
      password: this.authForm.get('password')!.value,
    };

    //call the authorization service to login the user
    //login will make call to login service, login service will return authentication subject
    this.authService.login(loginInfo);
  }

  ngOnDestroy() {
    this.loginFailureSub.unsubscribe();
    this.loginSuccessSub.unsubscribe();
  }
}
