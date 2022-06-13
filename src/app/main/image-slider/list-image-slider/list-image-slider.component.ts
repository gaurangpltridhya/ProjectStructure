import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IMAGE_PATH } from 'src/app/API-URL/contants';
import { UtilityService } from 'src/app/common/utility.service';
import { BaseApiService } from 'src/app/core/api/base-api.service';
import { AdvancedSortableDirective, SortEvent } from 'src/app/shared/advanced-sortable.directive';
import { AddImageSliderComponent } from '../add-image-slider/add-image-slider.component';

@Component({
  selector: 'app-list-image-slider',
  templateUrl: './list-image-slider.component.html',
  styleUrls: ['./list-image-slider.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class ListImageSliderComponent implements OnInit {
  @ViewChildren(AdvancedSortableDirective) headers!: QueryList<AdvancedSortableDirective>;

  imageInfos?: Array<any> = [];
  IMAGE_PATH = IMAGE_PATH;

  // pagination
  dtSearch: any = {};
  recordsFiltered = 0;
  totalRecord = 0;
  startIndex = 0;
  endIndex = 0;
  datatableParams!: any;
  showProductCategoryListLoader: Boolean = false;
  selectedPageLength!: number;

  constructor(private uploadService: BaseApiService,
    private dialog: MatDialog,
    public _util: UtilityService,
    ) { }

  ngOnInit(): void {
    this.uploadService.getFilesOfImageSlider().subscribe((res:any)=>{
      this.imageInfos = res?.getImages;
      console.log('30',this.imageInfos)

    });
  }
  
  /**
   * get image slider list
   */
   getImageSliderList() {
    this.datatableParams.start = 0; // for call API from page evet func
  }
   
   OpenImagePopup(): void{
    this.dialog.open(AddImageSliderComponent, {
      panelClass: 'add-image-slidder',
      disableClose: true,
      // data: {
      //   request: reqData
      // }
    }).afterClosed()
      .subscribe((response: any) => {
        if (response) {
          
        } else {
        }
      });
  }
  
  onSort({ column, direction }: SortEvent) {
    this.datatableParams.sort = { active: column, dir: direction }
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.getImageSliderList();
  }

    /**
* pagination page change event
*/
// public onpageChange(event: any) {
//   this.showProductCategoryListLoader = true;
//   this.datatableParams.start = (event - 1) * this.datatableParams.length;
//   this._productCategoryService.getProductCategoryList(this.datatableParams, this.dtSearch, '').subscribe((res: any) => {
//     if (res.status == 200) {

//       this.productCategoryList = res.data.list;
//       this.recordsFiltered = res.data.recordsFiltered;
//       this.totalRecord = res.data.recordsTotal;
//       let footerCount = this._util.getDatatableFooterCount(res.data.list.length, event, this.datatableParams.length, this.datatableParams.start, this.recordsFiltered);
//       this.startIndex = footerCount.startIndex;
//       this.endIndex = footerCount.endIndex;
//       this.showProductCategoryListLoader = false;
//     }
//   }, (error: any) => {
//     this.showProductCategoryListLoader = false;
//   });
// }
   }

