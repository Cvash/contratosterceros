import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_TER_SUPPLIER_UPDATESTATUS } from '../../../config/url.constants';

@Injectable({
  providedIn: 'root'
})
export class SupplierEnabledService {

  constructor(private http:HttpClient) { }

  handleError(error:HttpErrorResponse){ 
    return throwError(error);
  }

  sendDocumentBySupplier(suppId:number,document:string,userId:string){
    const request = {id:suppId, document: document, user_id: userId} 
    return this.http.post(API_TER_SUPPLIER_UPDATESTATUS, request).toPromise().catch(this.handleError)
  
  }
  
}
