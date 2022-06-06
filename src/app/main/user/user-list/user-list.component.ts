import { Subscription } from 'rxjs';
import { UserService } from './../../shared/services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/user.model';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [ConfirmationService],
})
export class UserListComponent implements OnInit, OnDestroy {
  usersData!: User[];
  msgs: Message[] = [];
  userDataSubscription!: Subscription;
  myVariable = false;
  addClass = false;

  constructor(
    private primengConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private messageService: MessageService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.userDataSubscription = this.userService.userChanged.subscribe(
      (userData: User[]) => {
        this.usersData = userData;
      }
    );
    this.usersData = this.userService.getUsersList();
    console.log('this.usersData :>> ', this.usersData);
  }

  // add new user
  addNewUser() {
    this.router.navigate(['add'], { relativeTo: this.activatedRoute });
  }

  // edit user
  editUser(index: number) {
    this.router.navigate(['edit/' + index], {
      relativeTo: this.activatedRoute,
    });
  }

  // delete user
  deleteUser(index: number) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.userService.deleteUser(index);
        this.messageService.add({severity:'success', summary:'', detail: 'Delete user successfully!'});
      },
      reject: () => {
        // this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have rejected'}];
      },
    });
  }

  // view User
  viewUser(index: number) {
    this.router.navigate(['view/' + index], {
      relativeTo: this.activatedRoute,
    });
  }

  onchange(i: any){
    this.addClass = !this.addClass;
  }

  // unsubscribe subscription
  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe();
  }
}
