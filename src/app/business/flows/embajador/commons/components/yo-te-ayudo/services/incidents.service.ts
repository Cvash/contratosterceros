import { Injectable } from '@angular/core';
import {
	PID,
	SERVICEID,
	CLIENDID,
	USER,
	APPLICATION
} from 'src/app/business/flows/config/header.constant';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Incident } from '../../../models/incident';
import { Observable } from 'rxjs';
import { Incident_Detail } from '../../../models/incident_details';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Injectable({
	providedIn: 'root'
})
export class IncidentsService {
	// API_URI= "https://embajadorqa.azurewebsites.net/embajador/v1"
	 API_URI = 'http://localhost:8095/embajador/v1';
	@BlockUI() blockUI: NgBlockUI;

	constructor(private http: HttpClient) {}

	getIncident(id: number) {
		const headers = new HttpHeaders({
			'UNICA-PID': PID,
			'UNICA-ServiceId': SERVICEID,
			'X-IBM-Client-Id': CLIENDID,
			'UNICA-User': USER,
			'UNICA-Application': APPLICATION
		});
		const options = { headers: headers };
		return this.http.get(`${this.API_URI}/incidente/${id}`, options);
	}

	getIncidents() {
		const headers = new HttpHeaders({
			'UNICA-PID': PID,
			'UNICA-ServiceId': SERVICEID,
			'X-IBM-Client-Id': CLIENDID,
			'UNICA-User': USER,
			'UNICA-Application': APPLICATION
		});
		const options = { headers: headers };
		return this.http.get(`${this.API_URI}/incidente`, options);
	}

	saveIncident(incident: any) {
		const headers = new HttpHeaders({
			'UNICA-PID': PID,
			'UNICA-ServiceId': SERVICEID,
			'X-IBM-Client-Id': CLIENDID,
			'UNICA-User': USER,
			'UNICA-Application': APPLICATION
		});
		const options = { headers: headers };
		return this.http.post(`${this.API_URI}/registrarIncidente`, incident, options);
	}

	updateIncident(incident: any): Observable<any> {
		const headers = new HttpHeaders({
			'UNICA-PID': PID,
			'UNICA-ServiceId': SERVICEID,
			'X-IBM-Client-Id': CLIENDID,
			'UNICA-User': USER,
			'UNICA-Application': APPLICATION
		});
		const options = { headers: headers };
		return this.http.put(`${this.API_URI}/modificarIncidente`, incident, options);
	}

	saveIncident_Details(incident_detail: any) {
		const headers = new HttpHeaders({
			'UNICA-PID': PID,
			'UNICA-ServiceId': SERVICEID,
			'X-IBM-Client-Id': CLIENDID,
			'UNICA-User': USER,
			'UNICA-Application': APPLICATION
		});
		const options = { headers: headers };
		return this.http.post(`${this.API_URI}/registrarDetalle`, incident_detail, options);
	}

	updateIncident_Details(incident_detail: any) {
		const headers = new HttpHeaders({
			'UNICA-PID': PID,
			'UNICA-ServiceId': SERVICEID,
			'X-IBM-Client-Id': CLIENDID,
			'UNICA-User': USER,
			'UNICA-Application': APPLICATION
		});
		const options = { headers: headers };
		return this.http.put(`${this.API_URI}/modificarDetalle`, incident_detail, options);
	}

	getIncidents_Details(idUser:any) {
		const headers = new HttpHeaders({
			'UNICA-PID': PID,
			'UNICA-ServiceId': SERVICEID,
			'X-IBM-Client-Id': CLIENDID,
			'UNICA-User': USER,
			'UNICA-Application': APPLICATION
		});
		const options = { headers: headers };
		// this.blockUI.start('Cargando quiebres');
		return this.http.get(`${this.API_URI}/detalle?id=`+idUser, options);
	}
	getIncident_Detail(id: number) {
		const headers = new HttpHeaders({
			'UNICA-PID': PID,
			'UNICA-ServiceId': SERVICEID,
			'X-IBM-Client-Id': CLIENDID,
			'UNICA-User': USER,
			'UNICA-Application': APPLICATION
		});
		const options = { headers: headers };
		return this.http.get(`${this.API_URI}/detalle/${id}`, options);
	}

	deleteIncident_Details(id: number) {
    const headers = new HttpHeaders({
			'UNICA-PID': PID,
			'UNICA-ServiceId': SERVICEID,
			'X-IBM-Client-Id': CLIENDID,
			'UNICA-User': USER,
			'UNICA-Application': APPLICATION
    });
		const options = { headers: headers };
    return this.http.delete(`${this.API_URI}/eliminarDetalle/${id}`, options);
	}
	

	getIncident_Motivos() {
		const headers = new HttpHeaders({
			'UNICA-PID': PID,
			'UNICA-ServiceId': SERVICEID,
			'X-IBM-Client-Id': CLIENDID,
			'UNICA-User': USER,
			'UNICA-Application': APPLICATION
		});
		const options = { headers: headers };
		return this.http.get(`${this.API_URI}/listarMotivos/`, options);
	}

	getIncident_Submotivos() {
		const headers = new HttpHeaders({
			'UNICA-PID': PID,
			'UNICA-ServiceId': SERVICEID,
			'X-IBM-Client-Id': CLIENDID,
			'UNICA-User': USER,
			'UNICA-Application': APPLICATION
		});
		const options = { headers: headers };
		// this.blockUI.start('Cargando submotivos');
		return this.http.get(`${this.API_URI}/listarSubmotivos`, options);
	}

	getCodeGenerate(json: any): Observable<any> {
		const headers = new HttpHeaders({
			'UNICA-PID': PID,
			'UNICA-ServiceId': SERVICEID,
			'X-IBM-Client-Id': CLIENDID,
			'UNICA-User': USER,
			'UNICA-Application': APPLICATION
		});
		const options = { headers: headers };
		// this.blockUI.start('Enviando código de acceso');
		// return this.http.post('/hrmanagement/v1/token', json, options).pipe(catchError(this.handleError));
		return this.http.post(`${this.API_URI}/mandarCorreo`, json , options);

		
	}

	// const json = {
	// 	sendToEmail: true,
	// 	typeValidate: 'email',
	// 	user: this.loginFormReactive.email.value
	// };



	

	;
}
