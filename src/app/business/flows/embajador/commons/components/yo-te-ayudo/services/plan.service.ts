import { Injectable } from '@angular/core';
import {
	PID,
	SERVICEID,
	CLIENDID,
	USER,
	APPLICATION
} from 'src/app/business/flows/config/header.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Plan } from '../../../models/Plan';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PlanService {
	// API_URI = 'https://embajadorqa.azurewebsites.net/embajador/v1';
	API_URI = 'http://localhost:8095/embajador/v1';
	constructor(private http: HttpClient) {}

	getPlans(): Observable<any> {
		const headers = new HttpHeaders({
			'UNICA-PID': PID,
			'UNICA-ServiceId': SERVICEID,
			'X-IBM-Client-Id': CLIENDID,
			'UNICA-User': USER,
			'UNICA-Application': APPLICATION
		});
		const options = { headers: headers };
		return this.http.get(`${this.API_URI}/listarPlanes`, options);
	}

	getPlan(id: number): Observable<any> {
		const headers = new HttpHeaders({
			'UNICA-PID': PID,
			'UNICA-ServiceId': SERVICEID,
			'X-IBM-Client-Id': CLIENDID,
			'UNICA-User': USER,
			'UNICA-Application': APPLICATION
		});
		const options = { headers: headers };
		return this.http.get(`${this.API_URI}/listarPlanes/${id}`, options);
	}

	savePlan(plan: Plan) {
		const headers = new HttpHeaders({
			'UNICA-PID': PID,
			'UNICA-ServiceId': SERVICEID,
			'X-IBM-Client-Id': CLIENDID,
			'UNICA-User': USER,
			'UNICA-Application': APPLICATION
		});
		const options = { headers: headers };
		return this.http.put(`${this.API_URI}/registrarPlan`, plan, options);
	}

	updatePlan(plan: Plan) {
		const headers = new HttpHeaders({
			'UNICA-PID': PID,
			'UNICA-ServiceId': SERVICEID,
			'X-IBM-Client-Id': CLIENDID,
			'UNICA-User': USER,
			'UNICA-Application': APPLICATION
		});
		const options = { headers: headers };
		return this.http.put(`${this.API_URI}/modificarPlan`, plan, options);
	}

	// updateIncident(incident: Incident): Observable<Incident> {
	// 	const headers = new HttpHeaders({
	// 		'UNICA-PID': PID,
	// 		'UNICA-ServiceId': SERVICEID,
	// 		'X-IBM-Client-Id': CLIENDID,
	// 		'UNICA-User': USER,
	// 		'UNICA-Application': APPLICATION
	// 	});
	// 	const options = { headers: headers };
	// 	return this.http.put(`${this.API_URI}/modificarIncidente`, incident, options);
	// }
}
