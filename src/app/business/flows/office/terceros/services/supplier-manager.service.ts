import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pid } from 'process';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_TER_GET_VERIFY_EXIST, API_TER_POST_FINDMASSIVE_SUPPLIER, API_TER_SUPPLIER } from '../../../config/url.constants';
import { IRequestPostAddSupplier } from '../models/RequestSupplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierManagerService {

  constructor(private http:HttpClient) {
   }
  
  handleError(error:HttpErrorResponse){
    return throwError(error);
  }
   
  searchSupplierDocument(nationalId:string,userType:string,companyId:string):Observable<any>{
    const request="?nationalId="+nationalId+"&typeUser="+userType+"&idService="+companyId;
    return this.http.get(API_TER_GET_VERIFY_EXIST+request).pipe(
      catchError(this.handleError)
    )
   }
  addNewSupplier(request:Array<IRequestPostAddSupplier>):Observable<any>{
  return this.http.post(API_TER_SUPPLIER,request).pipe(
    catchError(this.handleError)
  )
  }
  editNewSupplier(request:Array<IRequestPostAddSupplier>,serviceId:number):Observable<any>{
    return this.http.put(API_TER_SUPPLIER,{supp:request,idService:serviceId}).pipe(
      catchError(this.handleError)
    )
    }
    findByNationalId(request:any){
      const json = {
        "supp":request
      }
      return this.http.post(API_TER_POST_FINDMASSIVE_SUPPLIER,json,{}).pipe(
        catchError(this.handleError)
      )
    }
}
