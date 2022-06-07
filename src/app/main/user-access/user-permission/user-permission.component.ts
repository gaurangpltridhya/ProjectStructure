import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';






@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.scss']
})
export class UserPermissionComponent implements OnInit {

userPermissionForm: FormGroup;



  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.userPermissionForm = this.fb.group({
      role: [''],
      create: [''],
      edit: [''],
      delete: ['']
    })
  }

  checks=false;
  bulk(e:any ){
if (e.target.checked==true){
  this.checks=true;
}
else{
  this.checks=false;

}
  }

  onSubmit(){
    console.log('hi', this.userPermissionForm.value);
    this.router.navigate(['/user-access'])
  }

}
