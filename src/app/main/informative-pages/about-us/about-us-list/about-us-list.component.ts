import { AboutUsData } from './../model/aboutUs.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us-list',
  templateUrl: './about-us-list.component.html',
  styleUrls: ['./about-us-list.component.scss']
})
export class AboutUsListComponent implements OnInit {

  aboutUsListData: AboutUsData[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
