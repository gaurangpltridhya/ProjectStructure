import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;
  Mobile = /^[6-9]\d{9}$/;
  editMode = false;
  id!: number;

  // get form controls
  get userFormControls() {
    return this.userForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] !=null;
      this.initForm();
    })
  }

  private initForm() {
    
    let userFirstName: any = '';
    let userLastName: any = '';
    let userMobile: any = '';
    let userEmail: any = '';
    let userRole: any = '';

    if(this.editMode){
      const user = this.userService.getUser(this.id);
      console.log('user :>> ', user);
      userFirstName = user.firstName;
      userLastName = user.lastName;
      userMobile = user.mobile;
      userEmail= user.email;
      userRole= user.role;
    }

    this.userForm = this.fb.group({
      firstName: [userFirstName, [Validators.required]],
      lastName: [userLastName, [Validators.required]],
      mobile: [userMobile, [Validators.required, Validators.pattern(this.Mobile)]],
      email: [userEmail, [Validators.required]],
      role: [userRole, [Validators.required]],
    });
  }

  // submit button
  onSubmit() {
    console.log('value :>> ', this.userForm);
    if(this.editMode){
      this.userService.updateUser(this.id, this.userForm.value);
    }
    else{
      this.userService.addUser(this.userForm.value);
    }
    this.onCancel();
  }

  // cancel button
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
