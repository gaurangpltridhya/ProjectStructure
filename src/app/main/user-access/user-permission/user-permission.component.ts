import { MatDialogModule } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
// import { UserAccessPermissionService } from './../../shared/services/user-access-permission.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, FormsModule, ValidatorFn } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { UserAccessPermissionService } from './../user-access-permission.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.scss'],
  // providers: [UserAccessPermissionService],
})
export class UserPermissionComponent implements OnInit {
  

title = 'useraccesspermissionservice';
selectAllCheck=false;
addUserPermissionForm: FormGroup;
isFormSubmitted: Boolean = false;
users: {name: string; status: string }[] = [];
permission: any[]=[];
key: string = 'Name';
myItem: string;
Data: Array<any> = [
  { name: 'Create', value: 'Create' },
  { name: 'Edit', value: 'Edit' },
  { name: 'Delete', value: 'Delete' },

];




// storeName() {
//   localStorage.setItem(this.key, 'Angular');
//   this.myItem = localStorage.getItem(this.key);
// }

  // CheckBox 

name = 'Angular';

  ischecked: boolean = false
  checkAllTrades: boolean = false
  checkboxes = [
    { label: 'Create', value: 'Create', selected: false },
    { label: 'Edit', value: 'Edit', selected: false },
    { label: 'Delete', value: 'Delete', selected: false },
  ];


  toggleCheckboxAll(event: any) {

    this.onCheckboxChange(event);
    const checked = event.target.checked;
    this.checkboxes.forEach(item => {item.selected = checked});
  }

  singleCheckbox(event: any) {
    if (event.target.checked == true) {
      this.ischecked = true
    }

    if (this.ischecked && this.checkAllTrades) {
      event.target.checked = true
    }
  }
  constructor(
    private fb: FormBuilder,
     private activatedRoute: ActivatedRoute,
      private router: Router,
       private UserAccessPermissionService: UserAccessPermissionService) {
         this.addUserPermissionForm = this.fb.group({
          checkArray: ['', [Validators.required]]
         })
        }
        get f(){
          return this.addUserPermissionForm.controls
        }
        
  ngOnInit(): void {

     this.UserAccessPermissionService.permissionChanged
     .subscribe(
       (permission: any[]) => {
         this.permission = permission;
         console.log(2,this.permission);

       }
     );
     this.UserAccessPermissionService.getPermission();

       // Validation  

    this.addUserPermissionForm = this.fb.group({
      role: ['', [Validators.required]],
      checkArray: this.fb.array([], [Validators.required]),
      // create: [null],
      // edit: [null],
      // delete: [null]
    })
  }

  // opensweetalert(){
  //   Swal.fire({
  //     title: 'Do you want to save the changes?',
  //     showDenyButton: true,
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes',
  //     denyButtonText: `No`,
  //     confirmButtonColor: '#007FFF',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire('Saved!', '', 'success')

  //     } else if (result.isDenied) {
  //       Swal.fire('Changes are not saved', '', 'info')
  //     }
  //   })
  // }

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.addUserPermissionForm.get(
      'checkArray'
    ) as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  
// bulk(e:any ){
// if (e.target.checked==true){
//   this.selectAllCheck=true;
//   this.addUserPermissionForm.controls['create'].patchValue(true);
//   this.addUserPermissionForm.controls['edit'].patchValue(true);
//   this.addUserPermissionForm.controls['delete'].patchValue(true);
// }
// else{
//   this.selectAllCheck=false;
//   this.addUserPermissionForm.controls['create'].patchValue(null);
//   this.addUserPermissionForm.controls['edit'].patchValue(null);
//   this.addUserPermissionForm.controls['delete'].patchValue(null);
// }
//   }

  // FUnction on Save button 

  onSubmit(){
    this.isFormSubmitted = true
    if(this.addUserPermissionForm.invalid){
      return;
    }
    else{
      this.UserAccessPermissionService.addPermission(this.addUserPermissionForm.value);
      console.log('hi', this.addUserPermissionForm.value);
      this.router.navigate(['/user-access'])
    }
  }

}
