import { Component, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/API-URL/contants';
import { CustomConfirmationPopupComponent } from 'src/app/common/custom-confirmation-popup/custom-confirmation-popup.component';
import { UtilityService } from 'src/app/common/utility.service';
import { AdvancedSortableDirective, SortEvent } from 'src/app/shared/advanced-sortable.directive';
import { AddProductCategoryComponent } from '../add-product-category/add-product-category.component';
import { ProductCategoryService } from '../product-category.service';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.scss']
})
export class ProductCategoryListComponent implements OnInit {
  @ViewChildren(AdvancedSortableDirective) headers!: QueryList<AdvancedSortableDirective>;

  productCategoryList: Array<any> = [
    { name: 'watch', type: 'watch', _id: 'qq232ewe3e', isDisabled: false },
    { name: 'goggles', type: 'goggles', _id: 'qq232dewe3e', isDisabled: false },
    { name: 'bags', type: 'bags', _id: 'qq232ewex3e', isDisabled: true },
    { name: 'bags', type: 'bags', _id: 'qq232ewex3e', isDisabled: false },
    { name: 'AC', type: 'ac', _id: 'qq232xaewe3e', isDisabled: false },

  ]
  dtSearch: any = {};
  recordsFiltered = 0;
  totalRecord = 0;
  startIndex = 0;
  endIndex = 0;
  datatableParams!: any;
  showProductCategoryListLoader: Boolean = false;
  selectedPageLength!: number;

  constructor(
    public _util: UtilityService,
    private router: Router,
    public _productCategoryService: ProductCategoryService,
    public constant: Constants,
    public dialog: MatDialog,
    private toasterService: ToastrService
  ) {
    this.datatableParams = this.constant.datatableParam;
    this.selectedPageLength = this.datatableParams.length;
  }

  ngOnInit(): void {
    this.totalRecord = 100; //TODO: remove it
    this.recordsFiltered = 20; //TODO: remove it
    this.datatableParams.start = 0; // for call API from page evet func

    let data = {
      okButtonText: 'Ok',
      cancelButtonText: 'Close',
      titleText: 'Are you sure',
      message: 'Do you want to delete?'
    }
    // this.dialog.open(CustomConfirmationPopupComponent, {
    //   panelClass: 'custom-confirmation',
    //   disableClose: true,
    //   data: data
    // }).afterClosed()
    //   .subscribe((response: any) => {

    //   });
  }

  /**
   * get product category list
   */
  getProductCategoryList() {
    this.datatableParams.start = 0; // for call API from page evet func
  }

  /**
* pagination page change event
*/
  public onpageChange(event: any) {
    this.showProductCategoryListLoader = true;
    this.datatableParams.start = (event - 1) * this.datatableParams.length;
    this._productCategoryService.getProductCategoryList(this.datatableParams, this.dtSearch, '').subscribe((res: any) => {
      if (res.status == 200) {

        this.productCategoryList = res.data.list;
        this.recordsFiltered = res.data.recordsFiltered;
        this.totalRecord = res.data.recordsTotal;
        let footerCount = this._util.getDatatableFooterCount(res.data.list.length, event, this.datatableParams.length, this.datatableParams.start, this.recordsFiltered);
        this.startIndex = footerCount.startIndex;
        this.endIndex = footerCount.endIndex;
        this.showProductCategoryListLoader = false;
      }
    }, (error: any) => {
      this.showProductCategoryListLoader = false;
    });
  }

  /**
  * Sort table data
  * @param param0 sort the column
  *
  */
  onSort({ column, direction }: SortEvent) {
    this.datatableParams.sort = { active: column, dir: direction }
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.getProductCategoryList();
  }


  /**
   * show material dialog for add product category
   */
  showAddProductCategoryDialog(data: any) {

    this.dialog.open(AddProductCategoryComponent, {
      panelClass: 'add-product-category',
      disableClose: true,
      data: {
        data: data
      }
    }).afterClosed()
      .subscribe((response: any) => {

      });
  }

  /**
   * manage category status
   * @param isDisabled 
   */
  manageProductCategoryStatus(isDisabled: Boolean) {

    this._productCategoryService.manageProductCategoryStatus(isDisabled).subscribe((res: any) => {
      if (res.status == 200) {
        this.toasterService.success(res?.message);
        this.getProductCategoryList();
      }
    }, (error: any) => {

    });
  }
}
