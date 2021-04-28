import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { API_GET_CORONAVIRUS_EDIT_FORM, API_GET_DISABLED_ACCESS, API_POST_CORONAVIRUS_CBO, API_POST_CORONAVIRUS_REQUEST, API_SAVE_CORONA_DOCUMENT } from '../../config/url.constants';
import { ICoronavirusFormEdit } from '../models/response-corona-form';

@Injectable({
  providedIn: 'root'
})
export class CoronavirusFormService {

  constructor(
    private http:HttpClient
  ) { }

  handleError(error:HttpErrorResponse){
    return throwError(error)
  }

  showAlertCoronaForm(banner:any,message:string){
    Swal.fire({
      icon:banner,
      title:message
    })
  }

  saveCoronaDocument(src, docId:string, typeDoc:string, catDoc:string, filename:string,
     employeeId:string, userId:string, containerCoronaDocument:string):Observable<any>{
    const json={
      "src": src,
      "identifier": employeeId,
      "container": containerCoronaDocument,
      "id_doc": docId,
      "typeDoc": typeDoc,
      "catDoc": catDoc,
      "filename": filename,
      "id_emp": employeeId,
      "created_by": userId,
      "updated_by": userId
    }
    return this.http.post(API_SAVE_CORONA_DOCUMENT, json, {}).pipe(
      catchError(this.handleError)
    )
  }
  getDataFormEdit(employeeId:string):Observable<any>{
    const url = "?id_employee=" + employeeId;
    return this.http.get<ICoronavirusFormEdit[]>(API_GET_CORONAVIRUS_EDIT_FORM + url)
    .pipe(
      catchError(this.handleError)
    )
  }
  registerCoronaRequest(request):Observable<any>{
    const json = {
      "request":request
    }
    return this.http.post(API_POST_CORONAVIRUS_REQUEST, json, {}).pipe(
      catchError(this.handleError)
    )
  }
  removeAccessPass(employeeId:string):Observable<any>{
    const request="?employee="+employeeId
    return this.http.get(API_GET_DISABLED_ACCESS+request).pipe(
      catchError(this.handleError)
    )
  }
  getDataFormCoronavirus(employeeId:string):Observable<any>{
    const json = {
      "id_emp": employeeId
    }
    return this.http.post(API_POST_CORONAVIRUS_CBO, json, {}).pipe(
      catchError(this.handleError)
    )
  }
}
