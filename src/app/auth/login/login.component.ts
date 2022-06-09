import { JwtService } from './../jwt.service';
import { Component, OnInit } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 

  loginForm!: FormGroup;
  loginFormSubmitted: Boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private oauthService: OAuthService,
    private messageService: MessageService,
  ) {
    var isAuthenticated = this.auth.getAuthStatus();
    if (!isAuthenticated) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {

    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$")]],
      // , Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$")
      password: ['', Validators.required]
    });


  }

  /**
   * get form controls
   */
  get form() {
    return this.loginForm.controls;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------


  /**
   * login func
   */
  submitLoginData() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      // && !this.phoneCheckValid 
      return;
    }

    // if (this.loginForm.value.password === 'admin') { //TODO: remove this if condition when API implemented
    //   localStorage.setItem('access_token', 'token');
    //   this.router.navigate(['/']);
    // }

    this.auth.adminlogin(this.loginForm.value).subscribe({
      next: (data: any) => {
        console.log(data);
        this.router.navigate(['/']);
        this.messageService.add({
          severity: 'success',
          summary: '',
          detail: 'Login Succesfully!',
          life: 1000
        });
      },
      error: (data: any) => {
        this.messageService.add({
          severity: 'error',
          summary: '',
          detail: 'User Not Found!',
          life: 1000
        });
      }
    })
  }

  onClick(): void{
    console.log('first');
    this.oauthService.initLoginFlow();
  }
}
