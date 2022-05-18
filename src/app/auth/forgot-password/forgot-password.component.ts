import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  emailForm!: FormGroup;
  emailFormSubmitted: Boolean = false;
  otpForm!: FormGroup;
  otpFormSubmitted: Boolean = false;
  emailverifySuccess: Boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
  ) {

  }

  ngOnInit(): void {
    this.emailForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$")]],
    });
    this.otpForm = this._formBuilder.group({
      otp: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, confirmPasswordValidator]]
    });

    // Update the validity of the 'confirmPassword' field
    // when the 'password' field changes
    this.otpForm.get('password')?.valueChanges
      .pipe()
      .subscribe(() => {
        this.otpForm.get('confirmPassword')?.updateValueAndValidity();
      });

  }

  /**
   * get form controls
   */
  get emailform() {
    return this.emailForm.controls;
  }

  /**
   * get form controls
   */
  get otpform() {
    return this.otpForm.controls;
  }


  /**
   * verify email for existing person or not
   */
  submitEmailForPasswordRecovery() {

    this.emailFormSubmitted = true;
    if (this.emailForm.invalid) {
      return;
    }

    this.emailverifySuccess = true; // TODO: remove when use below API

    this.auth.verifyEmailForForgotPassword(this.emailForm.value?.phone).subscribe((res: any) => {
      if (res.status == 200) {
        this.emailverifySuccess = true;
      }
    }, error => {

    })

  }

  /**
   * reset password with otp
   */
  resetPasswordWithOTP() {
    this.otpFormSubmitted = true;
    if (this.otpForm.invalid) {
      return;
    }

    this.emailverifySuccess = true; // TODO: remove when use below API

    this.auth.resetPasswordWithOTP(this.emailForm.value?.phone).subscribe((res: any) => {
      if (res.status == 200) {
        console.log('Password reset successfully');
        this.router.navigate(['/auth/login']);
      }
    }, error => {

    })
  }


}



/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get('password');
  const confirmPassword = control.parent.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null;
  }

  if (confirmPassword.value === '') {
    return null;
  }

  if (password.value === confirmPassword.value) {
    return null;
  }

  return { passwordsNotMatching: true };
};