import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

@Injectable({ providedIn: 'root' })
export class BaseApiService {
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    private baseUrl = 'http://localhost:8080';

    constructor(protected http: HttpClient) { }

    protected makeRequest<T>(method: Methods, endpoint: any, params: any, responseType?: 'json', headers?: HttpHeaders): Observable<T> {
        const urlParams = this.getUrlParams(params, method);
        const url = `${endpoint}${urlParams}`;

        const options = {
            body: params,
            headers: headers || this.headers,
            responseType
        };

        return this.http.request<T>(method, url, options);
    }

    private getUrlParams(params: any, type: any): string {
        let urlParams = new HttpParams();
        if (type === 'GET') {
            for (const key in params) {
                if (params.hasOwnProperty(key)) {
                    if (Array.isArray(params[key])) {
                        params[key].forEach((element: any) => {
                            urlParams = urlParams.append(key, element);
                        });
                    } else {
                        urlParams = urlParams.set(key, params[key]);
                    }
                }
            }
        }
        if (urlParams.toString() === '') {
            return urlParams.toString();
        }
        return '?' + urlParams.toString();
    }

    
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('image', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles() {
    return this.http.get(`${this.baseUrl}/`, {}).pipe(
      map((res: any) => {
        return res;

      }),
      catchError((error: any) => {
        // this.commonErrorHandler(error.error.status);
        return throwError(error)
      })
    )
}

deleteFiles(id :any){
  return this.http.delete(`${this.baseUrl}/`+id, {body:id}).pipe(
    map((res :any) => {
      return res;
    }),
    catchError((error: any) => {
      // this.commonErrorHandler(error.error.status);
      return throwError(error)
    })
  )
}
}