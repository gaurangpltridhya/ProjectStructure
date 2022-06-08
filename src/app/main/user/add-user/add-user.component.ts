import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { ConfirmedValidator } from '../shared/confirmed.validator';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  addUserForm!: FormGroup;
  Mobile = /^[6-9]\d{9}$/;
  password_reg = '(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{6,}';
  editMode = false;
  id!: any;

  // get form controls
  get addUserFormControls() {
    return this.addUserForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = this.id != null;
      this.initForm();
    });
  }

  // create add User form
  private initForm() {
    if (this.id) {
      this.userService.getUser(this.id).subscribe((userData: any) => {
        this.addUserForm.patchValue({
          firstName: userData.User.firstName,
          lastName: userData.User.lastName,
          contact: userData.User.contact,
          email: userData.User.email,
          role: userData.User.role,
          password: userData.User.password,
          confirmPassword: userData.User.password,
        });
      });
    }

    this.addUserForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        contact: [
          '',
          [Validators.required, Validators.pattern(this.Mobile)],
        ],
        email: ['', [Validators.required, Validators.email]],
        role: ['', [Validators.required]],
        password: [
          '',
          [Validators.required, Validators.minLength(6)],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: ConfirmedValidator('password', 'confirmPassword') }
    );
  }

  // submit button
  onAddUserSubmit() {
    if (this.id) {
        this.userService.updateUser(this.id,this.addUserForm.value).subscribe((res: any)=> {
          console.log('res update :>> ', res);
        })

      this.messageService.add({
        severity: 'success',
        summary: '',
        detail: 'Update user successfully!',
      });
    } else {
      this.userService.addUser(this.addUserForm.value).subscribe((res) => {});
      this.messageService.add({
        severity: 'success',
        summary: '',
        detail: 'Add user successfully!',
      });
    }
    this.router.navigate(['/user']);
  }
}
