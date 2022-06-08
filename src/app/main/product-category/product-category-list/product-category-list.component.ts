import { Component, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Constants } from 'src/app/API-URL/contants';
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
    { name: 'watch', type: 'watch', _id: 'qq232ewe3e' },
    { name: 'goggles', type: 'goggles', _id: 'qq232dewe3e' },
    { name: 'bags', type: 'bags', _id: 'qq232ewex3e' },
    { name: 'bags', type: 'bags', _id: 'qq232ewex3e' },
    { name: 'AC', type: 'ac', _id: 'qq232xaewe3e' },

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
  ) {
    this.datatableParams = this.constant.datatableParam;
    this.selectedPageLength = this.datatableParams.length;
  }

  ngOnInit(): void {
    this.totalRecord = 100; //TODO: remove it
    this.recordsFiltered = 20; //TODO: remove it
    this.datatableParams.start = 0; // for call API from page evet func
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
  showAddProductCategoryDialog() {
    this.dialog.open(AddProductCategoryComponent, {
      panelClass: 'add-product-category',
      disableClose: true,
      data: {
        data: {}
      }
    }).afterClosed()
      .subscribe((response: any) => {

      });
  }
}
