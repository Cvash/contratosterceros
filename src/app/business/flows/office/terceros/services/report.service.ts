import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_TER_REPORT_MODULE } from '../../../config/url.constants';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient) { }

  handleError(error:HttpErrorResponse){
    return throwError(error);
  }

  loadDataOptinos(userId:string):Observable<any>{
    const param="?userId="+userId;
    return this.http.get(API_TER_REPORT_MODULE+param).pipe(
      catchError(this.handleError)
    )
  }
  downloadReportSupplier(json:any):Observable<any>{
    
    return this.http.post(API_TER_REPORT_MODULE,json,{responseType: 'blob' as 'json'}).pipe(
      catchError(this.handleError)
    )
  }
  generateReportSupplier(json:any):Observable<any>{
    return this.http.post(API_TER_REPORT_MODULE,json,{}).pipe(
      catchError(this.handleError)
    )
  }
}
