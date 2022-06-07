import { JwtService } from './../../auth/jwt.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuItems: Array<any> = [];
  userRole: any;
  accessField!: any;
  constructor(private jwtService: JwtService) { }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('currentUser');
    this.userRole=JSON.parse(this.userRole).role; 
    this.accessField = this.userRole == 'Admin';
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
        access: true,
        // access: (this.access.includes('dashboard') // used for role access control
      },
      {
        label: 'Forms/Elements',
        icon: '',
        link: 'forms',
        access: true,
        // access: (this.access.includes('forms')
      },
      {
        label: 'Common Elements',
        icon: '',
        link: 'common-elements',
        access: true
        // access: (this.access.includes('forms')
      },
      {
        label: 'Form Layouts',
        icon: '',
        link: 'form-layouts',
        access: true,
        // access: (this.access.includes('forms')
      },
      {
        label: 'Data View',
        icon: '',
        link: 'data-view',
        access: true,
        // access: (this.access.includes('forms')
      },
      {
        label: 'AGM Map',
        icon: '',
        link: 'agm-map',
        access: true,
        // access: (this.access.includes('forms')
      },
      {
        label: 'Charts',
        icon: '',
        link: 'charts',
        access: true,
        // access: (this.access.includes('forms')
      },
      {
        label: 'Tables',
        icon: '',
        link: 'tables',
        access: true,
        // access: (this.access.includes('forms')
      },
      {
        label: 'Product Category',
        icon: '',
        link: 'product-category',
        access: true,
        // access: (this.access.includes('forms')
      },
      {
        label: 'User',
        icon: '',
        link: '/user',
        access: this.accessField,
        // access: (this.access.includes('dashboard') // used for role access control
      },
      {
        label: 'Components',
        icon: '',
        access: true,
        childAvailable: true,
        link: 'component',
        subItems: [
          {
            label: 'tables',
            link: '/component/tables',
            access: true,
          },
        ],
      }

    ]
  }

  // /**
  //  * manage parent class for highlight
  //  */
  // manageParent(event: any, index: number) {
  //   debugger
  //   let currentClickedEle: any = document.getElementById("components-nav-" + index);
  //   console.log(currentClickedEle.classList.contains('show'));
  //   if (currentClickedEle.classList.contains('show')) {
  //     currentClickedEle.closest('li').classList.remove("show");
  //   } else {
  //     currentClickedEle.closest('li').classList.add("show");
  //   }
  //   // currentClickedEle.closest('li').style.color = 'red';

  // }


  // showHideChild(index: number) {
  //   let currentClickedEle: any = document.querySelector(".collaps-main-" + index);
  //   let selectorD = currentClickedEle.querySelector('.show');
  //   // debugger
  //   // console.log(currentClickedEle.closest('ul').classList.contains('show'));
  //   if (selectorD !== null) {
  //     // currentClickedEle.closest('ul').classList.remove("show");
  //   } else {
  //     // currentClickedEle.closest('ul').classList.add("show");
  //     var childNodes: any = document.getElementsByClassName("collaps-main-" + index);
  //     debugger
  //     childNodes = childNodes.childNodes;
  //     for (var i = 0; i < childNodes.length; i++) {
  //       console.log(childNodes[i].className);

  //       if (childNodes[i].className == 'collapse') {
  //         debugger
  //         childNodes[i].className = "show";
  //       }
  //     }
  //   }
  // }

  // /**
  //  * hide sub items of all navbar
  //  */
  // hideSubItems() {
  //   let menubarDiv: any = document.getElementById("sidebar");
  //   var fourChildNode = menubarDiv.querySelector('.show');
  //   console.log(fourChildNode);

  //   // fourChildNode.classList.remove("show");
  // }

}
