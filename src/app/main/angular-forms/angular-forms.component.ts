import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/common/common.service';

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

  // ngb date picker
  singleDate = new Date();
  dateRange = {}

  // p-autocomplete
  customerName: any = {};
  customerList: Array<any> = [
    { name: 'Ved', _id: 1 },
    { name: 'Emma', _id: 2 },
    { name: 'Jorden', _id: 3 },
    { name: 'Josef', _id: 4 },
    { name: 'Vyom', _id: 5 },
  ]
  // p-autocomplete multiselect
  selectedCustomers: Array<any> = [];

  // p-chips
  chipList: Array<any> = [];

  // ng select
  ngSelectedCustomer: string = '';
  ngSelectedCustomerList: Array<any> = [];

  constructor(
    private _formBuilder: FormBuilder,
    private calendar: NgbCalendar, // ngb ref,
    public _commonService: CommonService
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


  /**
   * on switch toggle
   * @param event 
   */
  onswitchToggle(event: any) {
    console.log(event.target.checked);

  }

  /**
   * on change range
   * @param event 
   */
  onChangeRange(event: any) {
    console.log(event.target.value);

  }

  /**
   * on change ngb datepicker value
   * @param event 
   */
  onSelectDate(event: any) {
    console.log(event);

  }

  /**
   * flat picker change event
   * @param event 
   */
  flatpickrChange(event: any) {
    debugger
  }

  /**
   * autocomplete on value clear
   * @param autocomplete 
   */
  clearItem(autocomplete: any) {
    autocomplete.value = '';
    autocomplete.show();
  }
  /**
   * om type get data reg search
   * @param event 
   */
  getCustomerSortList(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.customerList.length; i++) {
      let customer = this.customerList[i];
      if (customer.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(customer);
      }
    }
    this.customerList = filtered;
  }


  /**
   * update count of notification using observable
   * manage notification update on btn click
   */
  pushNotification() {
    this._commonService.updateNotification(true);
  }

}
