import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { RegisterComponent } from 'src/app/auth/register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isUserAuthnticated: Boolean = false;
  UserBalance: Array<any> = [];
  userSelectedLauguage: string = '';

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
  ) {
  }

  ngOnInit(): void {
  }

}
