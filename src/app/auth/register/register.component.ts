import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from 'src/app/API-URL/contants';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;

  formSubmitted: Boolean = false;
  registrationFormSubmitted: Boolean = false;
  phoneCheckValid: Boolean = false;
  emailCheckValid: Boolean = false;
  existingEmail: string = '';
  existingPhone: string = '';

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private auth: AuthService,
    public _constants: Constants,
  ) {

  }

  ngOnInit(): void {
    this.registrationForm = this.builder.group({
      // firstName: ['', [Validators.required]],
      // lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$")]],
      // phone: ['', [Validators.required, Validators.pattern('[- +()0-9]+'), Validators.minLength(10)]],
      // username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // confirmPassword: ['', [Validators.required, confirmPasswordValidator]]
    });

    // Update the validity of the 'confirmPassword' field
    // when the 'password' field changes
    this.registrationForm.get('password')?.valueChanges
      .pipe()
      .subscribe(() => {
        this.registrationForm.get('confirmPassword')?.updateValueAndValidity();
      });
  }

  /**
   * get form controls
   */
  get form() {
    return this.registrationForm.controls;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------


  /**
   * check register email exist
   * use this when need to verify email for existing or not
   * @returns 
   */
  registerEmailCheck() {
    if (this.registrationForm.value?.email !== '' && this.existingEmail !== this.registrationForm.value?.email) {
      this.existingEmail = this.registrationForm.value?.email;
    } else {
      return;
    }
    this.auth.registerEmailCheck(this.registrationForm.value?.email).subscribe((res: any) => {
      if (res.status == 200) {
        this.emailCheckValid = res.data?.result;
      }
    })
  }

  /**
   * check register phone exist
   * use this when need to verify phone for existing or not
   * @returns 
   */
  registerPhoneCheck() {
    if (this.registrationForm.value?.phone !== '' && this.existingPhone !== this.registrationForm.value?.phone) {
      this.existingPhone = this.registrationForm.value?.phone;
    } else {
      return;
    }
    this.auth.registerEmailCheck(this.registrationForm.value?.phone).subscribe((res: any) => {
      if (res.status == 200) {
        this.phoneCheckValid = res.data?.result;
      }
    })
  }


  submitRegistrationData() {
    this.registrationFormSubmitted = true;
    if (this.registrationForm.invalid) {
      return;
    }

    this.auth.admin_Register(this.registrationForm.value).subscribe((res: any) => {
      if (res.code == 200) {
        console.log("succesfully Added user");
      }
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