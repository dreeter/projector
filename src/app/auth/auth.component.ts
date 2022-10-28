import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  authForm: FormGroup = {} as FormGroup;
  isLoginMode: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null),
      passwordConfirmation: new FormControl(null),
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    //get email and password

    if (!this.isLoginMode) {
      //get password confirmation
    } else {
      this.authService.login();
      this.router.navigate(['/']);
    }

    //call the authorization service to login or register the user
  }
}
