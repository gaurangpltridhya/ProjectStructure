import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { ConfirmedValidator } from '../shared/confirmed.validator';
// import { ToastrService } from 'ngx-toastr/toastr/toastr.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;
  Mobile = /^[6-9]\d{9}$/;
  password_reg = '(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{6,}';
  editMode = false;
  id!: any;

  // get form controls
  get userFormControls() {
    return this.userForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let userFirstName: any = '';
    let userLastName: any = '';
    let userMobile: any = '';
    let userEmail: any = '';
    let userRole: any = '';
    let userPassword: any = '';
    let userConfirmPassword: any = '';

    if (this.editMode) {
     this.userService
        .getUser(this.id)
        .subscribe((userData: any) => {
          console.log('userData.user :>> ', userData.User);
          this.userForm.setValue({
            firstName: userData.User.firstName,
            lastName: userData.User.lastName,
            contact: userData.User.contact,
            email: userData.User.email,
            role: userData.User.role,
            password: userData.User.password,
            confirmPassword: userData.User.password,
          });
        });
      
      // userFirstName = user.firstName;
      // userLastName = user.lastName;
      // userMobile = user.mobile;
      // userEmail= user.email;
      // userRole= user.role;
      // userPassword = user.password;
      // userConfirmPassword = user.confirmPassword;
    }

    this.userForm = this.fb.group(
      {
        firstName: [userFirstName, [Validators.required]],
        lastName: [userLastName, [Validators.required]],
        contact: [
          userMobile,
          [Validators.required, Validators.pattern(this.Mobile)],
        ],
        email: [userEmail, [Validators.required, Validators.email]],
        role: [userRole, [Validators.required]],
        password: [
          userPassword,
          [Validators.required, Validators.minLength(6)],
        ],
        confirmPassword: [userConfirmPassword, [Validators.required]],
      },
      { validator: ConfirmedValidator('password', 'confirmPassword') }
    );
  }

  // submit button
  onSubmit() {
    if (this.editMode) {
      this.userService.updateUser(this.id, this.userForm.value);
      this.messageService.add({
        severity: 'success',
        summary: '',
        detail: 'Update user successfully!',
      });
    } else {
      this.userService.addUser(this.userForm.value).subscribe((res) => {});
      this.messageService.add({
        severity: 'success',
        summary: '',
        detail: 'Add user successfully!',
      });
    }
    this.onCancel();
  }

  // cancel button
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
