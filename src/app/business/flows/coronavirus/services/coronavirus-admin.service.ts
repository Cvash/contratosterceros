import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IViewMain } from '../../../../../app/business/models/IModel-module';
import Swal from 'sweetalert2';
import { API_ASSIST_REPORT, API_CORONA_REQUESTDETAIL, API_CORONA_SEARCHEMPLOYEES, API_CRONICA_REPORT, API_DOWNLOAD_FILEAZURE_ZIP, API_GENERAL_REPORT, API_GET_ALL_SURVEY_P, API_GET_CORONAVIRUS_PRECONDITION_EDIT, API_GET_FIND_BY_STATUS, API_GET_RESERVATION, API_POST_CORONAVIRUS_CBO, API_REQUEST_DETAILS_REPORT, API_SAVE_MASSIVE_DATA_REQUEST, REPORT_BP_JAVA, REPORT_RESERVATION_JAVA, REPORT_SURVEY_JAVA } from '../../config/url.constants';
import { IAdminData, ICoronavirusFormEdit, IStandard } from '../models/response-corona-form';

@Injectable({
  providedIn: 'root'
})
export class CoronavirusAdminService {
  module: Array<IViewMain> = [];
  arrayIdRole: Array<any> = [];

  constructor(private http:HttpClient) { }
  
  handleError(error:HttpErrorResponse){
    return throwError(error)
  }
  showAlertCoronaFormAdmin(banner:any,message:string){
    Swal.fire({
      icon:banner,
      title:message
    })
  }
  showPreconditionCollection(employeeId:string):Observable<any>{
    const param = "?id_employee=" + employeeId;
    return this.http.get<ICoronavirusFormEdit>(API_GET_CORONAVIRUS_PRECONDITION_EDIT + param).pipe(
      catchError(this.handleError)
    )
  }
  searchEmployeeByCondition(byemployeeinp:string,idRole:any):Observable<any>{
    const request = { filter: byemployeeinp, role_x:idRole}
    return this.http.post<IAdminData[]>(API_CORONA_SEARCHEMPLOYEES, request).pipe
    (
      catchError(this.handleError)
    )
  }
  loadDataCoronaFormAdmin(employeeID):Observable<any>{
    const Json={
      "id_emp":employeeID
    }
    return this.http.post(API_POST_CORONAVIRUS_CBO,Json,{}).pipe(
      catchError(this.handleError)
    )
  }
  findByStatusFilter(idStatus:string,arrayIdRole:Array<any>):Observable<any>{ 
    const param = {"status":idStatus,
                    "param":arrayIdRole};
    return this.http.post<IAdminData[]>(API_GET_FIND_BY_STATUS,param,{}).pipe(
      catchError(this.handleError)
    )
  }
  showDetailsCoronaAdmin(requestId:number):Observable<any>{
    return this.http.get(API_CORONA_REQUESTDETAIL + "/" + requestId).pipe(
      catchError(this.handleError)
    )
  }
  saveMassiveCoronaRequest(fileName:string,src:any,iden:string,userId:string):Observable<any>{
    const json={
      "file_name":fileName,
      "src":src,
      "identifiers":iden,
      "created_by":userId,
      "updated_by":userId
    }
  return this.http.post(API_SAVE_MASSIVE_DATA_REQUEST,json,{ }).pipe(
    catchError(this.handleError)
  )
  }
  surveyReportAsync(employeeId:string,surveyId:string):Observable<any>{
    
    const param="?idEmployee="+employeeId+"&idSurvey="+surveyId;
    return this.http.get(REPORT_SURVEY_JAVA+param,{responseType: 'blob' as 'json',reportProgress:true,observe:"events"})
    
  }
  reservationReportAsync(employeeId:string,reservaId:string):Observable<any>{
    const param="?idEmployee="+employeeId+"&idSchedule="+reservaId;
    return this.http.get(REPORT_RESERVATION_JAVA+param,{responseType: 'blob' as 'json',reportProgress:true,observe:"events"})
  }

  generalReportAsync(idRole:any,userId:string):Observable<any>{
    const param={
      "param":idRole,
      "userId":userId}
      
    return this.http.post(API_GENERAL_REPORT,param,{ reportProgress:true,observe:"events",responseType: 'blob'})
  }

  reportBp(employeeId:string):Observable<any>{
    const param="?idEmployee="+employeeId;
    return this.http.get(REPORT_BP_JAVA+param,{responseType: 'blob' as 'json'})
  }

  requestDetailReport(idRole:any,userId:string):Observable<any>{
    const param={
      "param":idRole,
      "userId":userId}
      return this.http.post<Blob>(API_REQUEST_DETAILS_REPORT,param,{reportProgress:true,observe:"events",responseType: 'blob' as 'json'})
  }
  assistReportEmployee(idRole:any,userId:string):Observable<any>{
    const param={
      "param":idRole,
      "userId":userId}
    return this.http.post<Blob>(API_ASSIST_REPORT,param,{responseType: 'blob' as 'json'})
  }
  cronicaReport(idRole:any,userId:string):Observable<any>{
    const param={
      "param":idRole,
      "userId":userId}
    return this.http.post<Blob>(API_CRONICA_REPORT,param,{responseType: 'blob' as 'json'})
  }
  fileReportEmployee(idRole:any){
    const param={
      "param":idRole}
    return this.http.post<Blob>(API_DOWNLOAD_FILEAZURE_ZIP,param,{responseType: 'blob' as 'json'})
  }
  showEnabledSurvey():Observable<any>{
  return this.http.get<IStandard>(API_GET_ALL_SURVEY_P)
  }
  showEnabledSchedule():Observable<any>{
  return  this.http.get<IStandard>(API_GET_RESERVATION)
  }

  addPermissionSearchService() {
    this.arrayIdRole=[];
    this.module = JSON.parse(localStorage.getItem("permission"));
    this.module.forEach(element => {
      element.entitlement.forEach(entitle => {
        entitle.manageableAsset.forEach(manageable => {
          if (manageable.action === "R&W") {
            this.arrayIdRole.push(element.id);
          }
        });
      });
    });
    return this.arrayIdRole;
  }
}
