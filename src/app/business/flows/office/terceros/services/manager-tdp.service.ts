import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IMainUser } from '../../../../../../app/business/models/IModel-module';
import { API_TER_MNG_TDP_POST, API_TER_POST_ADD_USERSERVICE,API_TER_GET_COMPANY, API_TER_COMPANY_SERVICE, API_TER_COMPANY_SERVICES, API_TER_GET_COMPANYSERVICE_DESCRIPTION } from '../../../config/url.constants';
import { EmployeeData, ShowMngTdp } from '../models/ResponseSupplier';

@Injectable({
  providedIn: 'root'
})
export class ManagerTdpService {

  constructor(
    private http:HttpClient
  ) { }
  handeError(error:HttpErrorResponse){
    return throwError(error);
  }
  searchEmployeeByEntity(request:any):Observable<any>{
    return this.http.post<EmployeeData[]>(API_TER_MNG_TDP_POST, request).pipe(
      catchError(this.handeError)
    )
  }
  showManagerGestorTdp(obj:any):Observable<any>{ 
    const param="?idService="+obj.id;
    return this.http.get<ShowMngTdp[]>(API_TER_POST_ADD_USERSERVICE+param).pipe(
      catchError(this.handeError)
    )
  }
  addUserService(userService:any):Observable<any>{
    const json={
      "uServ":userService
    }
    return this.http.post(API_TER_POST_ADD_USERSERVICE,json,{}).pipe(
      catchError(this.handeError)
    )
  }
  findCompanyByRuc(ruc:string):Observable<any>{
    const param="?ruc="+ruc;
    return this.http.get(API_TER_GET_COMPANY+param).pipe(
      catchError(this.handeError)
    )
  }
  createCompanyService(request:any):Observable<any>{ 
    return this.http.post(API_TER_COMPANY_SERVICE, request).pipe(
      catchError(this.handeError)
    )
  }
  loadContentManager(user:IMainUser):Observable<any>{
    return this.http.get(API_TER_COMPANY_SERVICES + user.id).pipe(
      catchError(this.handeError)
    )
  }
  showDescriptionCompanyService(idServ:string):Observable<any>{
    const param="?id_serv="+idServ;
    return this.http.get(API_TER_GET_COMPANYSERVICE_DESCRIPTION+param).pipe(
      catchError(this.handeError)
    )
}
  removeGestorTdpService(obj:{
    id_emp:number,
    user_id:number,
    idService:number
  }):Observable<any>{
    const json = {
      "emp":obj
    }
    return this.http.put(API_TER_POST_ADD_USERSERVICE,json,{}).pipe(
      catchError(this.handeError)
    )
  }
}
