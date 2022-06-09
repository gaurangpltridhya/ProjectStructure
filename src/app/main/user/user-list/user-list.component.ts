import { Subscription } from 'rxjs';
import { UserService } from './../../shared/services/user.service';
import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { User } from 'src/app/shared/user.model';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { AdvancedSortableDirective, SortEvent } from 'src/app/shared/advanced-sortable.directive';
import { Constants } from 'src/app/API-URL/contants';
import { UtilityService } from 'src/app/common/utility.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomConfirmationPopupComponent } from 'src/app/common/custom-confirmation-popup/custom-confirmation-popup.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [ConfirmationService],
})
export class UserListComponent implements OnInit, OnDestroy {
  @ViewChildren(AdvancedSortableDirective) headers!: QueryList<AdvancedSortableDirective>;

  usersData!: User[];
  userDataSubscription!: Subscription;
  myVariable = false;
  addClass = false;

  // sorting
  datatableParams!: any;

  // pagination
  dtSearch: any = {};
  recordsFiltered = 0;
  totalRecord = 0;
  startIndex = 0;
  endIndex = 0;
  selectedPageLength!: number;
  showUserListLoader: Boolean = false;

  constructor(
    private primengConfig: PrimeNGConfig,
    private userService: UserService,
    private messageService: MessageService,
    public constant: Constants,
    public _util: UtilityService,
    public dialog: MatDialog,
  ) {
    this.datatableParams = this.constant.datatableParam;
    this.selectedPageLength = this.datatableParams.length;
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.totalRecord = 100; //TODO: remove it
    this.recordsFiltered = 20; //TODO: remove it
    this.userList();
  }

  // delete user
  deleteUser(index: string){
    let data = {
      okButtonText: 'Yes',
      cancelButtonText: 'No',
      titleText: 'Are you sure',
      message: 'Do you want to delete this record?'
    }
    this.dialog.open(CustomConfirmationPopupComponent, {
      panelClass: 'custom-confirmation',
      disableClose: true,
      data: data
    }).afterClosed().subscribe((response: any) => {
      if(!response){
        return;
      }

      if(response){
        this.userService.deleteUser(index).subscribe(res => {
          this.userList();
          this.messageService.add({severity:'success', summary:'', detail: 'Delete user successfully!', life: 1000});
        })
      }

    })
  }

  // users List 
  userList(){
    this.datatableParams.start = 0;
    this.userDataSubscription = this.userService.getUsersList().subscribe((resData: any) => {
      this.usersData = resData.Users;
    });
  }

  // block user
  blockUser(index: any){
    let data = {
      okButtonText: 'Yes',
      cancelButtonText: 'No',
      titleText: 'Are you sure',
      message: 'Do you want to block this user?'
    }
    this.dialog.open(CustomConfirmationPopupComponent, {
      panelClass: 'custom-confirmation',
      disableClose: true,
      data: data
    }).afterClosed().subscribe((response: any) => {
      if(!response){
        return;
      }

      if(response){
        // block user code
      }

    })
  }

  // sort table data
  onSort({ column, direction }: SortEvent) {
    this.datatableParams.sort = { active: column, dir: direction }
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.userList();
  }

  // pagination page change event
  public onpageChange(event: any) {
    this.showUserListLoader = true;
    this.datatableParams.start = (event - 1) * this.datatableParams.length;
    this.userService.getUsersPageList(this.datatableParams, this.dtSearch, '').subscribe((res: any) => {
      if (res.status == 200) {

        this.usersData = res.data.list;
        this.recordsFiltered = res.data.recordsFiltered;
        this.totalRecord = res.data.recordsTotal;
        let footerCount = this._util.getDatatableFooterCount(res.data.list.length, event, this.datatableParams.length, this.datatableParams.start, this.recordsFiltered);
        this.startIndex = footerCount.startIndex;
        this.endIndex = footerCount.endIndex;
        this.showUserListLoader = false;
      }
    }, (error: any) => {
      this.showUserListLoader = false;
    });
  }


  // unsubscribe subscription
  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe();
  }
}
