import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UNICA_APPLICATION_OFFICE, UNICA_APPLICATION_PARAM,
  UNICA_PID_OFFICE,
   UNICA_PID_PARAM,
   UNICA_SERVICEID_OFFICE,
    UNICA_SERVICEID_PARAM,
    UNICA_USER_OFFICE,
    UNICA_USER_PARAM,
    X_IBM_CLIENT_ID_PARAM } from '../../../../../business/flows/config/header.constant';
import { API_ENTRYPASS, API_GET_HEALTH_SURVEY, API_GET_PARAMETER,
   API_POST_CHECKINTOUT, API_POST_REPORT_SYMP } from '../../../../../business/flows/config/url.constants';
import { IGetEntryPass, IMainUser, IParameter,
   IRealtedParty, ISurveyHealth } from '../../../../../business/models/IModel-module';
import { IRequestCheck, IRequestPostEntry, IRequestReportSymp } from '../models/RequestSupplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService implements OnInit {
  user:IMainUser=null;
  emp:IRealtedParty=null;
  parameter:Array<IParameter>=[];
  constructor(
    private http:HttpClient
  ) {
    
   }
  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("user"));
    if(this.user!==null){ 
      this.emp=this.user.relatedParty;
    }
  }
  handleError(error:HttpErrorResponse){ 
    return throwError(error);
  }
  validateStatusToken(daily:IGetEntryPass){ 
    let banner:string="";
    let viewStatus:number=null;
    let value:string="";
    let ready:boolean;
    let formMessage:string="";
    let modalMessage:string="";
    if(daily.status==="0"){
      viewStatus=0;
      modalMessage=daily.description
    }else{ 
      if(daily.pass===false){
        banner='No tienes un pase activo en este momento.';
        formMessage=daily.description;
        viewStatus=1;
        if(Number(daily.status)===3){
          viewStatus = 3;
          banner = "Su acceso se encuentra inhabilitado temporalmente debido a que reportó posibles síntomas de COVID-19. Por favor comuníquese con el gestor de su empresa para seguir los protocolos de salud correspondientes."    
          formMessage=banner;
          modalMessage=daily.description;
        }
      }
      if(daily.pass===true){
        if(Number(daily.status)===2){ 
          viewStatus=2;
          value=daily.token;
          formMessage="Ya llenó el formulario"
          banner='¡Tu pase está activo! Úsalo para ingresar a oficina.';
          modalMessage=daily.description;
        }
        if(Number(daily.status)===3){
          viewStatus = 3;
          banner = "Su acceso se encuentra inhabilitado temporalmente debido a que reportó posibles síntomas de COVID-19. Por favor comuníquese con el gestor de su empresa para seguir los protocolos de salud correspondientes."    
          formMessage=banner;
          modalMessage=daily.description;
        }
        if(Number(daily.status)===4){ 
          viewStatus=4;
          banner="Su acceso se encuentra inhabilitado temporalmente debido a que reportó posibles síntomas de COVID-19. Por favor comuníquese con el gestor de su empresa para seguir los protocolos de salud correspondientes.";
          formMessage=banner;
          modalMessage=daily.description;
        }
      }        
      ready=true;
    }
    
    return {
      "banner":banner,
      "viewStatus":viewStatus,
      "value":value,
      "ready":ready,
      "formMessage":formMessage,
      "modalMessage":modalMessage
    }
  }
  // starter data -> city,transport,sede y daily review
  loadDataSupplier(code:any,entityLegal:any):Observable<any>{ 
    const headers = new HttpHeaders({
			'UNICA-PID': UNICA_PID_PARAM,
			'UNICA-ServiceId': UNICA_SERVICEID_PARAM,
			'X-IBM-Client-Id': X_IBM_CLIENT_ID_PARAM,
			'UNICA-User': UNICA_USER_PARAM,
			'UNICA-Application': UNICA_APPLICATION_PARAM
		});
    const options = { headers: headers };
    console.log(options);
    let param="?code=@&father=$";
    param=param.replace("@",code).replace("$",entityLegal);
    return this.http.get<IParameter[]>(API_GET_PARAMETER+param,options)
    .pipe(
      catchError(this.handleError)
    )
  }

  loadSympForm(userId:string,nationalType:string,nationalId:string):Observable<any>{
    const headers=new HttpHeaders({
      'UNICA-PID': UNICA_PID_OFFICE,
			'UNICA-ServiceId': UNICA_SERVICEID_OFFICE,
			'UNICA-User': UNICA_USER_OFFICE,
			'UNICA-Application': UNICA_APPLICATION_OFFICE
    })
    const options = { headers: headers };
    const param="?userId=@&nationalType=document&nationalId=documentValue"
    .replace("@",userId)
    .replace("document",nationalType)
    .replace("documentValue",nationalId);
    return this.http.get<ISurveyHealth>(API_GET_HEALTH_SURVEY+param,options)
    .pipe(
      catchError(this.handleError)
      )
  }

  accessPass(userId:string,nationalType:string,nationalId:string,token:string):Observable<any>{
    const headers=new HttpHeaders({
      'UNICA-PID': UNICA_PID_OFFICE,
			'UNICA-ServiceId': UNICA_SERVICEID_OFFICE,
			'UNICA-User': UNICA_USER_OFFICE,
			'UNICA-Application': UNICA_APPLICATION_OFFICE
    })
    const options = { headers: headers };
    const param="?userId="+userId+"&nationalType="+nationalType+"&nationalId="+nationalId+"&token="+token;
    return this.http.get<IGetEntryPass[]>(API_ENTRYPASS+param,options).pipe(
      catchError(this.handleError)
    )
  }

  generateAccessPass(postEntry:IRequestPostEntry):Observable<any>{ 
    const headers=new HttpHeaders({
      'UNICA-PID': UNICA_PID_OFFICE,
			'UNICA-ServiceId': UNICA_SERVICEID_OFFICE,
			'UNICA-User': UNICA_USER_OFFICE,
			'UNICA-Application': UNICA_APPLICATION_OFFICE
    })
    const options = { headers: headers };
    return this.http.post(API_ENTRYPASS,postEntry,options).pipe(
      catchError(this.handleError)
    )
  }
  generateReportSymp(requestReport:IRequestReportSymp):Observable<any>{
    const headers=new HttpHeaders({
      'UNICA-PID': UNICA_PID_OFFICE,
			'UNICA-ServiceId': UNICA_SERVICEID_OFFICE,
			'UNICA-User': UNICA_USER_OFFICE,
			'UNICA-Application': UNICA_APPLICATION_OFFICE
    })
    const options = { headers: headers };
    return this.http.post(API_POST_REPORT_SYMP,requestReport,options).pipe(
      catchError(this.handleError)
    )
  }

  generateCheckInOut(requestCheck:IRequestCheck):Observable<any>{
    const headers=new HttpHeaders({
      'UNICA-PID': UNICA_PID_OFFICE,
			'UNICA-ServiceId': UNICA_SERVICEID_OFFICE,
			'UNICA-User': UNICA_USER_OFFICE,
			'UNICA-Application': UNICA_APPLICATION_OFFICE
    })
    const options = { headers: headers };
    return this.http.post(API_POST_CHECKINTOUT,requestCheck,options).pipe(
      catchError(this.handleError)
    )
  }
}
