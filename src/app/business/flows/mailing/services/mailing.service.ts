import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs';
import { IMainUser } from '../../../../../app/business/models/IModel-module';
import Swal from 'sweetalert2';
import { API_DELETE_ATTACHS, API_GET_SECTION, API_GET_TEMPLATE, API_MAIL_CHECK_STATUS, 
API_MAIL_SENTDETAILS, API_MAIL_SENTS, API_SECTIONS, API_SEND_MAIL, API_SENTDETAILS_ATTACHMENT,
API_SESSION_ATTACHS, API_TEMPLATES, API_UPLOAD_FILE_AZURE, API_UPLOAD_FILE_BACKEND } from '../../config/url.constants';
import { IMailTemplate } from '../models/responseMailing';

@Injectable({
  providedIn: 'root'
})
export class MailingService {
  @BlockUI() blockUI: NgBlockUI;
  user:IMainUser=null;
  constructor(private http:HttpClient) {
    this.user=JSON.parse(localStorage.getItem("user"));
   }

  uploadFileBinary(base64file:any,fileType:string,fileName:string,userId:string):Observable<any>{
    // Upload binary
    const request = {
      "binary": base64file,
      "type": fileType,
      "name":fileName,
      "user_id": userId
    }       
    return this.http.post(API_UPLOAD_FILE_BACKEND, request)
  }
  selectTemplate():Observable<any>{
    return this.http.get(API_TEMPLATES)
  }
  saveTemplate(template:IMailTemplate):Observable<any>{
    return this.http.post(API_TEMPLATES,template,{})
  }
  updateTemplate(template:IMailTemplate):Observable<any>{
    return this.http.put(API_TEMPLATES,template,{})
  }
  sentEmails(request:any):Observable<any>{
    return this.http.post(API_SEND_MAIL,request,{})
  }
  // API ENVIOS
  sentMail = (request) => {
    /* console.log("ENTRO A SENTMAIL") */
    this.user=JSON.parse(localStorage.getItem("user"));
    const userId = this.user.id;
    request.user_id = userId;
    
    this.sentEmails(request).toPromise().then(resp => {
      console.log(resp);
    });
    Swal.fire({
      icon: 'success',
      title: "Enviando correos",
      html:"El preceso se realizará en segundo plano. Revise la sección <b>Status</b> para hacer seguimiento a los envios."
    })
  }

  mergeTemplate = (template:IMailTemplate) => {
    const userId =  this.user.id;
    if (template.id === 0){
      // INSERT
      template.created_by = userId;
      this.blockUI.start("Guardando...");
      this.saveTemplate(template).toPromise().then(resp => {
        this.responseMergeMailingTemplate(resp,'Nueva plantilla <b>' + template.title + '</b> fue <b>creada</b> con éxito.');
      });
    }else{
      // UPDATE
      template.updated_by = userId;
      this.blockUI.start("Guardando...");
      this.updateTemplate(template).toPromise().then(resp => {
        this.responseMergeMailingTemplate(resp, 'Plantilla <b>' + template.title + '</b> fue <b>actualizada</b> con éxito.');
      });
    }
  }
  responseMergeMailingTemplate(resp:any,message:string){ 
    this.blockUI.stop();
        if (resp['status'] === 1){
          Swal.fire({
            icon:'success',
            html: message
          })
        }else{
          Swal.fire({
            icon:'error',
            html: "Se produjo un error: " + resp['mensaje']
          })
        }
  }
  modalSectionsService(){
    return this.http.get(API_SECTIONS)
  }
  showSwalAlertCustoms(i:any,message:string){
    Swal.fire({
      icon:i,
      text:message
    })
  }
  showSwalAlertHtmlContent(i:any,tit:string,message:string){
    Swal.fire({
      icon:i,
      title:tit,
      html:message
    })
  }
  loadMails():Observable<any>{
    return this.http.get(API_MAIL_SENTS);
  }

  loadMailsSendDetails(idElement:number):Observable<any>{
    return this.http.get(API_MAIL_SENTDETAILS+idElement);
  }
  checkStatus(id:any):Observable<any>{
    return this.http.get(API_MAIL_CHECK_STATUS + id);
  }

  onLoadFileAttach(userId:string):Observable<any>{
    return this.http.post(API_SESSION_ATTACHS, {"user_id": userId});
  }
  addAttachList(base64file:any,typeFile:string,fileName:string,userId:string):Observable<any>{ 
    // Upload binary
    const request = {
      "binary": base64file,
      "type": typeFile,
      "name":fileName,
      "user_id": userId
    }       
    return this.http.post(API_UPLOAD_FILE_BACKEND, request);
  }
  sendDetailsAttachment(idDetail:any):Observable<any>{
    return this.http.get(API_SENTDETAILS_ATTACHMENT + idDetail)
  }
  uploadFileAzureStore(base64file:any,fileName:string,container:string):Observable<any>{
    return this.http.post(API_UPLOAD_FILE_AZURE,
      {
        _local_name_file:base64file,
        _type_file:fileName,
        _identifiers:1,
        _container:container
      })
  }
  async getBodyById(id:number){
    return await this.http.get(API_GET_SECTION + id)
  }
  chargeTemplate(id:any):Observable<any>{
    return this.http.get(API_GET_TEMPLATE + id)
  }

  removeAttach(id:any):Observable<any>{ 
    return this.http.delete(API_DELETE_ATTACHS+"?idAttach="+id);
  }
}
