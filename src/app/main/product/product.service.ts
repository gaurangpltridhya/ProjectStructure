import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { ADD_PRODUCT } from 'src/app/API-URL/contants';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private _httpClient: HttpClient,
    private toasterService: ToastrService,
  ) { }



  addProductByCategoryId(data: any, imageArray: any) {

    let formData = new FormData();
    for (const fl of imageArray) {
      formData.append("attachments", fl.file, fl.fileName);
    }

    delete data?.images;
    formData.append("data", JSON.stringify(data));
    return this._httpClient.put(ADD_PRODUCT, formData).pipe(
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
