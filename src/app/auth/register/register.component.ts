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
  registerForm!: FormGroup;

  currency_list: Array<any> = this._constants.currency;
  datesList: Array<any> = this._constants.datesList;
  monthsList: Array<any> = this._constants.monthsList;
  yearsList: Array<any> = this._constants.yearsList;
  pagetab: number = 1;
  countryCodeList: Array<any> = [];
  countryName: string = '';
  formSubmitted: Boolean = false;
  registerFormSubmitted: Boolean = false;
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
    return this.registerForm.controls;
  }

  buildloginform() {
    this.registerForm = this.builder.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      birthDate: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  /**
   * check register email exist
   * @returns 
   */
  registerEmailCheck() {
    if (this.registerForm.value?.email !== '' && this.existingEmail !== this.registerForm.value?.email) {
      this.existingEmail = this.registerForm.value?.email;
    } else {
      return;
    }
    this.auth.registerEmailCheck(this.registerForm.value?.email).subscribe((res: any) => {
      if (res.status == 200) {
        this.emailCheckValid = res.data?.result;
      }
    })
  }

  /**
   * check register phone exist
   * @returns 
   */
  registerPhoneCheck() {
    if (this.registerForm.value?.phone !== '' && this.existingPhone !== this.registerForm.value?.phone) {
      this.existingPhone = this.registerForm.value?.phone;
    } else {
      return;
    }
    this.auth.registerEmailCheck(this.registerForm.value?.phone).subscribe((res: any) => {
      if (res.status == 200) {
        this.phoneCheckValid = res.data?.result;
      }
    })
  }


  register() {
    this.registerFormSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.auth.admin_Register(this.registerForm.value).subscribe((res: any) => {
      if (res.code == 200) {
        console.log("succesfully Added user");
      }
    })
  }

}

