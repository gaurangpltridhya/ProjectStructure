import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


export interface SelectItem<T = any> {
  label?: string;
  value: T;
  styleClass?: string;
  icon?: string;
  title?: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss']
})

export class DataViewComponent implements OnInit {

  products: Array<any> = [];
  sortOptions!: SelectItem[];

  sortOrder!: number;

  sortField!: string;

  constructor(
    private _httpClient: HttpClient
  ) { }

  ngOnInit(): void {

    this.getProducts();
  }

  /**
   * get product data
   */
  getProducts() {
    this._httpClient.get<any>('assets/json/product.json').subscribe(res => {
      console.log(res);

      this.products = res.data;
    });

  }

}
