import { UserPermissionComponent } from './../user-permission/user-permission.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserComponent } from './../../user/user.component';
import { UserAccessComponent } from './../user-access.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message, PrimeNGConfig } from "primeng/api";
@Component({
  selector: 'app-user-access-list',
  templateUrl: './user-access-list.component.html',
  styleUrls: ['./user-access-list.component.scss']
})
export class UserAccessListComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {

  }

  addNew(){
    this.router.navigate(['add'],{relativeTo: this.activatedRoute})
  }

}
