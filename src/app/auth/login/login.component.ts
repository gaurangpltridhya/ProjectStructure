import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
    private auth: AuthService
  ) { }

  ngOnInit(): void {

    this.loginForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$")]],
      // , Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$")
      password: ['', Validators.required]
    });


  }

  /**
   * login func
   */
  submitLoginData() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      // && !this.phoneCheckValid 
      return;
    }

    this.auth.adminlogin(this.loginForm.value).subscribe({
      next: (data: any) => {
        console.log(data);
        this.router.navigate(['/']);
      }
    })
  }

}
