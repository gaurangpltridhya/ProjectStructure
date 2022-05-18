import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuItems: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
    this.initialize();
  }


  /**
   * Initilize menu
   */
  initialize(): void { // left menu bar menus
    // this.menuItems = MENU;
    this.menuItems = [
      {
        label: 'Dashboard',
        icon: '',
        link: '/dashboard',
        // access: (this.access.includes('dashboard') // used for role access control
      },
      {
        label: 'Forms/Elements',
        icon: '',
        link: 'forms',
        // access: (this.access.includes('forms')
      },
      {
        label: 'Charts',
        icon: '',
        link: 'charts',
        // access: (this.access.includes('forms')
      },
      {
        label: 'Tables',
        icon: '',
        link: 'tables',
        // access: (this.access.includes('forms')
      },
      // {
      //   label: 'Components',
      //   icon: '',
      //   access: true,
      //   subItems: [
      //     {
      //       label: 'tables',
      //       link: '/tables',
      //     },
      //   ]
      // }
    ]
  }

  /**
   * manage parent class for highlight
   */
  manageParent(event: any, index: number) {
    debugger
    let currentClickedEle: any = document.getElementById("components-nav-" + index);
    console.log(currentClickedEle.classList.contains('show'));
    if (currentClickedEle.classList.contains('show')) {
      currentClickedEle.closest('li').classList.remove("show");
    } else {
      currentClickedEle.closest('li').classList.add("show");
    }
    // currentClickedEle.closest('li').style.color = 'red';

  }


  showHideChild(index: number) {
    let currentClickedEle: any = document.querySelector(".collaps-main-" + index);
    let selectorD = currentClickedEle.querySelector('.show');
    // debugger
    // console.log(currentClickedEle.closest('ul').classList.contains('show'));
    if (selectorD !== null) {
      // currentClickedEle.closest('ul').classList.remove("show");
    } else {
      // currentClickedEle.closest('ul').classList.add("show");
      var childNodes: any = document.getElementsByClassName("collaps-main-" + index);
      debugger
      childNodes = childNodes.childNodes;
      for (var i = 0; i < childNodes.length; i++) {
        console.log(childNodes[i].className);

        if (childNodes[i].className == 'collapse') {
          debugger
          childNodes[i].className = "show";
        }
      }
    }
  }

  /**
   * hide sub items of all navbar
   */
  hideSubItems() {
    let menubarDiv: any = document.getElementById("sidebar");
    var fourChildNode = menubarDiv.querySelector('.show');
    console.log(fourChildNode);

    // fourChildNode.classList.remove("show");
  }

}
