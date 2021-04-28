import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { API_DOCUMENT_GENERATION, API_DOCUMENT_PREVIEW, API_DOC_DOCUMENTS, API_DOC_DOCUMENT_TEMPLATES } from '../../config/url.constants';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(
    private http:HttpClient
  ) { }

  chargedTemplateStatus():Observable<any>{
    return this.http.get(API_DOC_DOCUMENTS);
  }

  selectTemplateDocument():Observable<any>{
    return this.http.get(API_DOC_DOCUMENT_TEMPLATES);
  }
  saveTemplateDocument(request:any):Observable<any> {
    return this.http.post(API_DOC_DOCUMENT_TEMPLATES,request);
  }
  updateTemplateDocument(request:any):Observable<any> { 
    return this.http.put(API_DOC_DOCUMENT_TEMPLATES,request);
  }
  generateTemplate(bodyHtml:string,titleDoc:string,userId:string,templateId:any,
  rows:any,headers:any):Observable<any> { 
   const data = {
    body:bodyHtml, 
    title:titleDoc,
    user_id:userId,
    id_template:null,
    rows :rows,
    headers:headers
    };
    return this.http.post(API_DOCUMENT_GENERATION,data,{ responseType: 'blob' });
  }
  generatePreview(bodyPreview:string,rows:any,hoja:any):Observable<any> {
    const data = {
      "body":bodyPreview, 
      "rows" :rows,
      "headers":hoja
    }; 
    return this.http.post(API_DOCUMENT_PREVIEW, data, { responseType: 'blob' })
  }
  showAlertDocument(i:any,body:string,ti:string, ht:string){
    Swal.fire({
      icon: i,
      title:ti,
      text: body,
      html:ht
    })
  }
  }
