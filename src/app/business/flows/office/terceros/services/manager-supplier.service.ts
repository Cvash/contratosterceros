import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { API_TER_GET_COMPANYSERVICE_SUPP_GESTOR, API_TER_POST_ADDNEW_GESTOR_SERVICE,
   API_TER_POST_SUPPLIERS_ADMIN, API_TER_SUPPLIERS, API_TER_SUPPLIER_DELETE } from '../../../config/url.constants';
import { IChangeSupp } from '../models/RequestSupplier';

@Injectable({
  providedIn: 'root'
})
export class ManagerSupplierService {

  constructor(private http:HttpClient) { }
  handleError(error:HttpErrorResponse){
    return throwError(error);
  }
  loadManagementSupplierData(supplierId:number,serviceId:number):Observable<any>{
    const param="?id_supp="+supplierId+"&id_serv="+serviceId;
    return this.http.get(API_TER_SUPPLIERS + param).pipe(
      catchError(this.handleError)
    )
  }
  showAlertCondition(banner:any,message:string){
    Swal.fire ({
      icon:banner,
      text:message
    })
  }
  loadManagementSubSupplierData(lstIdServices:any,userId:string):Observable<any>{ 
    const json={"id_serv":lstIdServices,"id_user":userId}
    return this.http.post(API_TER_POST_SUPPLIERS_ADMIN,json,{}).pipe(
      catchError(this.handleError)
    )
  }
  addNewServiceManagement(suppId:number,serviceId:number,userId:string):Observable<any>{
    let json:IChangeSupp;
    json={
      idSupp:suppId,
      idServ:serviceId,
      created_by:userId,
      updated_by:userId
    }
    const request={
      "supServ":json
    }
    return this.http.post(API_TER_POST_ADDNEW_GESTOR_SERVICE,request,{}).pipe
    (
      catchError(this.handleError)
    )
  }
  removeSupplierFromService(suppId:number,serviceId:number,userId:string,typeAction:string):Observable<any>{
    const request = {id:suppId,id_serv:serviceId,
      id_user:userId,type_action:typeAction};
    return this.http.post(API_TER_SUPPLIER_DELETE,request,{}).pipe(
      catchError(this.handleError)
    )
  }
  getCompanyServiceByUser(suppId:number,userId:string,typeAction:string):Observable<any>{ 
    const param="?id_supp="+suppId+"&id_user="+userId+"&type_action="+typeAction;
    return this.http.get(API_TER_GET_COMPANYSERVICE_SUPP_GESTOR+param).pipe(
      catchError(this.handleError)
    )
  }
  
}
