import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-angular-forms',
  templateUrl: './angular-forms.component.html',
  styleUrls: ['./angular-forms.component.scss']
})
export class AngularFormsComponent implements OnInit {

  // froms
  @ViewChild('username') username!: ElementRef;

  uNameTemplateDriven: string = '';

  loginFormReactive!: FormGroup;
  loginFormSubmitted: Boolean = false;

  // sidebar
  @Input() set iuSearchManage(val: any) {
    this.uiSearchBoxHide = val;
  }
  uiSearchBoxHide: Boolean = false;

  // address pipe
  address: any = { // for address pipe exmple 
    line1: '401 to 410, Tridhya tech',
    city: 'Ahmedabad',
    province: 'Gujarat',
    postalCode: '380060'
  }

  constructor(
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loginFormReactive = this._formBuilder.group({
      username: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$")]],
    });
  }

  /**
 * get form controls
 */
  get form() {
    return this.loginFormReactive.controls;
  }

  /**
   * reactive form submit
   */
  submitUserName() {
    this.loginFormSubmitted = true;
    if (!this.loginFormReactive.invalid) {
      console.log('Reactive form submitted successfully');
    }
  }

  /**
   * template driven form submit
   */
  submitUnameTemplateDriven(form: any) {
    if (form) {
      console.log('Template driven form submitted successfully');

    }
  }

}
