import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }
  flag = true;
  ngOnInit(): void {
  }

  onclickNavOpen(flag: boolean): void{
    this.flag = !flag;
    if(flag){
    document.getElementsByTagName("body")[0].classList.add('body--menu-opened');
    } else{
    document.getElementsByTagName("body")[0].classList.remove('body--menu-opened')
    }
  }
}
