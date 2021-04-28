import { Injectable } from '@angular/core';
import {
	PID,
	SERVICEID,
	CLIENDID,
	USER,
	APPLICATION
} from 'src/app/business/flows/config/header.constant';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AfiliadosService {
  // API_URI= "https://embajadorqa.azurewebsites.net/embajador/v1"
  API_URI = 'http://localhost:8095/embajador/v1';

  constructor(private http: HttpClient) {}

  getAfiliados() {
    const headers = new HttpHeaders({
			'UNICA-PID': PID,
			'UNICA-ServiceId': SERVICEID,
			'X-IBM-Client-Id': CLIENDID,
			'UNICA-User': USER,
			'UNICA-Application': APPLICATION
		});
		const options = { headers: headers };
		return this.http.get(`${this.API_URI}/listarUsuarioEmbajador/`, options);
  }

  getAfiliado(id: number) {
    const headers = new HttpHeaders({
			'UNICA-PID': PID,
			'UNICA-ServiceId': SERVICEID,
			'X-IBM-Client-Id': CLIENDID,
			'UNICA-User': USER,
			'UNICA-Application': APPLICATION
		});
		const options = { headers: headers };
		return this.http.get(`${this.API_URI}/listarUsuarioEmbajador/${id}`, options);
  }

  saveAfiliado(afiliado: any) {
		const headers = new HttpHeaders({
			'UNICA-PID': PID,
			'UNICA-ServiceId': SERVICEID,
			'X-IBM-Client-Id': CLIENDID,
			'UNICA-User': USER,
			'UNICA-Application': APPLICATION
		});
		const options = { headers: headers };
		return this.http.post(`${this.API_URI}/registrarUsuarioEmbajador`, afiliado, options);
	}

	updateAfiliado(afiliado: any): Observable<any> {
		const headers = new HttpHeaders({
			'UNICA-PID': PID,
			'UNICA-ServiceId': SERVICEID,
			'X-IBM-Client-Id': CLIENDID,
			'UNICA-User': USER,
			'UNICA-Application': APPLICATION
		});
		const options = { headers: headers };
		return this.http.put(`${this.API_URI}/modificarUsuarioEmbajador`, afiliado, options);
	}



}
