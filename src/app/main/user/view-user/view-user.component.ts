import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from './../../shared/services/user.service';
import { User } from './../../../shared/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  userData!: any;
  id!: any;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.viewUser(this.id)
    })
  }

  // view User
  viewUser(id: any){
    this.userData = this.userService.getUser(id).subscribe(resView => {console.log('resView :>> ', resView);});
    console.log('this.userData :>> ', this.userData);
  }

}
