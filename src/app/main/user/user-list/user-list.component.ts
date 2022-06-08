import { Subscription } from 'rxjs';
import { UserService } from './../../shared/services/user.service';
import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/user.model';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { AdvancedSortableDirective, SortEvent } from 'src/app/shared/advanced-sortable.directive';
import { Constants } from 'src/app/API-URL/contants';
import { UtilityService } from 'src/app/common/utility.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [ConfirmationService],
})
export class UserListComponent implements OnInit, OnDestroy {
  @ViewChildren(AdvancedSortableDirective) headers!: QueryList<AdvancedSortableDirective>;

  usersData!: User[];
  msgs: Message[] = [];
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
    private confirmationService: ConfirmationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private messageService: MessageService,
    public constant: Constants,
    public _util: UtilityService,

  ) {
    this.datatableParams = this.constant.datatableParam;
    this.selectedPageLength = this.datatableParams.length;
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.totalRecord = 100; //TODO: remove it
    this.recordsFiltered = 20; //TODO: remove it


    // this.userDataSubscription = this.userService.userChanged.subscribe(
    //   (userData: User[]) => {
    //     this.usersData = userData;
    //   }
    // );
    // this.usersData = this.userService.getUsersList();

    this.userList();
  }

  // add new user
  addNewUser() {
    this.router.navigate(['add'], { relativeTo: this.activatedRoute });
  }

  // edit user
  editUser(index: any) {
    this.router.navigate(['edit/' + index], {
      relativeTo: this.activatedRoute,
    });
  }

  // delete user
  deleteUser(index: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.userService.deleteUser(index).subscribe(res => {
          this.userList();
        });
        this.messageService.add({severity:'success', summary:'', detail: 'Delete user successfully!'});
      },
      reject: () => {
        // this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have rejected'}];
      },
    });
  }

  // view User
  viewUser(index: any) {
    this.router.navigate(['view/' + index], {
      relativeTo: this.activatedRoute,
    });
  }

  // users List 
  userList(){
    this.datatableParams.start = 0;
    this.userDataSubscription = this.userService.getUsersList().subscribe((resData: any) => {
      this.usersData = resData.Users;
      console.log('this.usersData :>> ', this.usersData);
    });
  }

  //user block
  block = true;

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
