import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from "@angular/common/http";
import { PID, SERVICEID, CLIENDID, USER, APPLICATION, } from 'src/app/business/flows/config/header.constant';


@Injectable({
  providedIn: 'root'
})
export class RedService {

  
  // API_URI = 'https://embajadorqa.azurewebsites.net/embajador/v1';
  API_URI = 'http://localhost:8095/embajador/v1';

  constructor(private http: HttpClient) { }

  getRedTypes() {

    const headers = new HttpHeaders({
			'UNICA-PID': PID,
			'UNICA-ServiceId': SERVICEID,
			'X-IBM-Client-Id': CLIENDID,
			'UNICA-User': USER,
			'UNICA-Application': APPLICATION
    });
    const options = { headers: headers };
    return this.http.get(`${this.API_URI}/listarRedTypes/` , options);
  }

  getRedCategory() {

    const headers = new HttpHeaders({
			'UNICA-PID': PID,
			'UNICA-ServiceId': SERVICEID,
			'X-IBM-Client-Id': CLIENDID,
			'UNICA-User': USER,
			'UNICA-Application': APPLICATION
    });
    const options = { headers: headers };
    return this.http.get(`${this.API_URI}/listarRedCategory/` , options);
  }

  getRedSubCategory() {

    const headers = new HttpHeaders({
			'UNICA-PID': PID,
			'UNICA-ServiceId': SERVICEID,
			'X-IBM-Client-Id': CLIENDID,
			'UNICA-User': USER,
			'UNICA-Application': APPLICATION
    });
    const options = { headers: headers };
    return this.http.get(`${this.API_URI}/listarRedSubCategory/` , options);
  }

}
