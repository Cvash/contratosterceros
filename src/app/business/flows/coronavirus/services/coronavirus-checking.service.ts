import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_DELETE_REMOVE_ASSIST, API_GET_CORONAVIRUS_ASSIST, API_POST_CORONAVIRUS_ASSIT_DATE, API_SAVE_MASSIVE_DATA } from '../../config/url.constants';
import { ICheckingData } from '../models/response-corona-form';

@Injectable({
  providedIn: 'root'
})
export class CoronavirusCheckingService {

  constructor(private http:HttpClient) { }

  saveMassiveChecking(filename:string,src:string,iden:string,userId:string):Observable<any>{ 
    const json={
      "file_name":filename,
      "src":src,
      "identifiers":iden,
      "created_by":userId,
      "updated_by":userId
    }

    return this.http.post(API_SAVE_MASSIVE_DATA,json,{ })
  }

  searchCoronaChecking(date1:string,date2:string,idRole:any):Observable<any>{
    let json={
      "start_date":date1==""?"":new Date(date1),
      "end_date":date2==""?"":new Date(date2),
      "param":idRole
    }
    return this.http.post<ICheckingData[]>(API_POST_CORONAVIRUS_ASSIT_DATE,json,{})
  }
  removeCheckingData(id:string):Observable<any>{ 
    const param="?id_check="+id;
    return this.http.delete(API_DELETE_REMOVE_ASSIST+param)
  }
  showDataManagementAssist(idRole:any):Observable<any>{ 
    const param = {"param":idRole};
    return this.http.post<ICheckingData[]>(API_GET_CORONAVIRUS_ASSIST,param,{})
  }
}
