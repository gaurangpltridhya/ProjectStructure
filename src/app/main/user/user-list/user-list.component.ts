import { Subscription } from 'rxjs';
import { UserService } from './../../shared/services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  usersData!: User[];
  userDataSubscription!: Subscription;

constructor(private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userDataSubscription = this.userService.userChanged.subscribe((userData: User[]) => {
      this.usersData = userData;
    });
    this.usersData = this.userService.getUsersList();
  }

  // add new user
  addNewUser(){
    this.router.navigate(['add'], {relativeTo: this.activatedRoute})
  }

  // edit user
  editUser(index: number){
    this.router.navigate(['edit/'+ index], {relativeTo: this.activatedRoute})
  }
  
  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe();
  }

}
