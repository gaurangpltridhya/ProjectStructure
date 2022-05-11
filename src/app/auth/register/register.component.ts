import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  }

  get f() {
    return this.registrationForm.controls;
  }

  buildloginform() {
    this.registrationForm = this.builder.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      birthDate: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

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

