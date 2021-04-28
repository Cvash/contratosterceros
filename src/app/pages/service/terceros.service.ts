import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/* Como se consume rutas es recomendable usar los HttpClient y HttpHeader */
import { PID, SERVICEID, CLIENDID, USER, APPLICATION } from 'src/app/business/flows/config/header.constant';

@Injectable({
  providedIn: 'root'
})
export class TercerosService {

  constructor( private http: HttpClient ) {  }

  API_URI = 'http://localhost:8096/contratoterceros/v8';

  /* se crea las funciones para obtener los datos del backend */
  getTerceros() {

    const headers = new HttpHeaders({
      'UNICA-PID': PID,
      'UNICA-ServiceId': SERVICEID,
      'X-IBM-Client-Id': CLIENDID,
      'UNICA-User': USER,
      'UNICA-Application': APPLICATION
    });

    const options = { headers: headers };
    /*  Consumir el Endpoint - API  */
    return this.http.get( `${this.API_URI}/listarContract`, options );

  }


}
