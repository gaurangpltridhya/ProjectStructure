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
    this.isUserAuthnticated = this.auth.getAuthStatus();
  }

  ngOnInit(): void {
    if (this.isUserAuthnticated) {
      this.getuserInfoData();
    }
  }


  openLoginPopup(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(LoginComponent, dialogConfig);
  }

  openRegisterPopup(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(RegisterComponent, dialogConfig);
  }

  getuserInfoData() {
    this.auth.userInfoData().subscribe((res: any) => {
      if (res.code == 200) {
        console.log(res.data);

        this.UserBalance = res.data;
      }
    })
  }

  /**
   * on change language from language selector
   */
  OnChangeLanguage() {

  }
}
