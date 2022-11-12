import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { RegistrationInfo } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = {} as FormGroup;

  registerSuccess: Subscription = {} as Subscription;
  registerFailure: Subscription = {} as Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      passwordConfirmation: new FormControl(null, Validators.required),
    });

    this.registerSuccess = this.authService.registrationSuccess.subscribe(
      (success: boolean) => {
        this.router.navigateByUrl('/auth');
      }
    );

    this.registerFailure = this.authService.registrationFailure.subscribe(
      (error: Error) => {
        this.snackBar.open(
          'Registration Unsuccessful. Username is Already in Use',
          undefined,
          {
            duration: 7000,
          }
        );
      }
    );
  }

  onSubmit() {
    const registrationInfo: RegistrationInfo = {
      username: this.registerForm.get('username')!.value,
      email: this.registerForm.get('email')!.value,
      password: this.registerForm.get('password')!.value,
    };

    this.authService.register(registrationInfo);
  }

  ngOnDestroy() {
    this.registerSuccess.unsubscribe();
    this.registerFailure.unsubscribe();
  }

  // passwordsMatch(formGroup: FormGroup): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     if (
  //       control.get('password')!.value ===
  //       control.get('passwordConfirmation')!.value
  //     ) {
  //       return { passwordsMatch: true };
  //     } else {
  //       return null;
  //     }
  //   };
  // }
}
