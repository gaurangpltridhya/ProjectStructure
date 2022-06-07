import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { GET_PRODUCT_CATEGORY_LIST } from 'src/app/API-URL/contants';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(
    private _httpClient: HttpClient,
    private toasterService: ToastrService,
    // private authenticationService: AuthenticationService
  ) { }


  getProductCategoryList(dtParams: any, dtSearch: any, type: any) {
    dtParams['search'] = dtSearch
    return this._httpClient.post(GET_PRODUCT_CATEGORY_LIST, dtParams).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(error => {
        // this.toasterService.error(error.error.message);
        this.commonErrorHandler(error.error.status);
        return throwError(error);
      })
    );
  }


  commonErrorHandler(errorStatus: any) {
    if (errorStatus === 401) {
      // this.authenticationService.logout();
    }
  }
}
