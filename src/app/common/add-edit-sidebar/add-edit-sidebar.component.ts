import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-edit-sidebar',
  templateUrl: './add-edit-sidebar.component.html',
  styleUrls: ['./add-edit-sidebar.component.scss']
})
export class AddEditSidebarComponent implements OnInit {
  @Input() openAddEditBar: Boolean = false;
  @Input() set width(val: any) {
    this.sideBarWidth = val;
    this.manageCloseButtonPosition();
  }
  @Output() closeBar = new EventEmitter();
  sideBarWidth: any = '80%';
  closeButtonRightPosition: any = '81%';

  constructor() { }

  ngOnInit() {
  }

  manageCloseButtonPosition() {
    if (this.sideBarWidth.indexOf('%') !== -1) {
      this.closeButtonRightPosition = parseInt(this.sideBarWidth) + 1;
      this.closeButtonRightPosition = this.closeButtonRightPosition.toString() + '%';

    } else if (this.sideBarWidth.indexOf('px') !== -1) {
      this.closeButtonRightPosition = parseInt(this.sideBarWidth) + 10;
      this.closeButtonRightPosition = this.closeButtonRightPosition.toString() + 'px'
    }
  }

  closeSideBar() {
    this.openAddEditBar = false
    this.closeBar.emit();
  }

  isMobile() {
    const ua = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|Mozilla|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua);
  }

  closeLeftMenu() {
    if (this.isMobile()) {
      if (document.body.classList.contains('sidebar-enable')) {
        document.body.classList.remove('sidebar-enable');
        document.body.classList.add('left-side-menu-condensed');
      }
    }
  }
}
