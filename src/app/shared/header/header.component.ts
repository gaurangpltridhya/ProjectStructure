import { JwtService } from './../../auth/jwt.service';
import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { RegisterComponent } from 'src/app/auth/register/register.component';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isUserAuthnticated: Boolean = false;
  UserBalance: Array<any> = [];
  userSelectedLauguage: string = '';
  notificationCount: number = 1;

  private subscriptions: Subscription[] = [];

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    public _commonService: CommonService,
    private router: Router,
    private jwtService: JwtService
  ) {
  }

  ngOnInit(): void {
    const subject = this._commonService.pushNotification.subscribe((res: any) => {
      this.notificationCount++;
    });
    this.subscriptions.push(subject);
  }

  onSignOut(){
    this.jwtService.destoryToken();
    this.jwtService.destoryUser();
    this.router.navigate(['/auth']);
  }


  ngOnDestroy(): void {
    if (this.subscriptions.length > 0) { // unsubscribe all subscription
      this.subscriptions.forEach(sub => {
        sub.unsubscribe();
      });
    }
  }

}
