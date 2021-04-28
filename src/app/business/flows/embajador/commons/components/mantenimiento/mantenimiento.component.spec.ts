import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { MatTableExporterModule } from 'mat-table-exporter';
import { of } from 'rxjs';
import { IMainUser } from 'src/app/business/models/IModel-module';
import Swal from 'sweetalert2';

import { MantenimientoComponent } from './mantenimiento.component';
export class mockDialogMantenimiento { 
	open(){ 
		return {
			afterClosed: () => of({
				
			})
		}
	}
}
export class mockSwalMantenimiento { 
	fire () {
	  return {
		then : ()=> of({
		  "isConfirmed":true
		})
	  }   
	}
  }
describe('MantenimientoComponent', () => {
	let component: MantenimientoComponent;
	let fixture: ComponentFixture<MantenimientoComponent>;
	let user: IMainUser;
	let dialog:MatDialog;
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MantenimientoComponent],
			imports: [MatTableExporterModule],
			providers: [
				HttpClient,
				HttpHandler,
				{
					provide: MatDialog,
					useClass: mockDialogMantenimiento
				},
				{
					provide:Swal,
					useClass:mockDialogMantenimiento
				}
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MantenimientoComponent);
		component = fixture.componentInstance;
		dialog= TestBed.inject(MatDialog);
	});
	beforeEach(() => {
		user = { "id": "2955", "href": "/user/2955", "token": "abb4d410-b92d-4157-ad52-0b307be20e48", "pass": "sdasdasda", "relatedParty": { "id": "3027", "href": "/employee/3027", "name": "JOAO JOSUE / HERNANDEZ / GODOY", "email": "joao.hernandezgo@telefonica.com", "description": "Employee", "legalId": [{ "country": "49", "legalEntity": "0055", "nationalIDType": "DNI", "nationalID": "73078273" }] }, "role": [{ "id": "11", "href": "/role/7046", "description": "ELE2_USER" }, { "id": "17", "href": "/role/14482", "description": "CORONA_USER" }, { "id": "18", "href": "/role/20551", "description": "CORONA_READ_QR" }, { "id": "16", "href": "/role/21178", "description": "CORONA_ADMIN" }, { "id": "40", "href": "/role/21192", "description": "CORONA_ADMIN_VNZ" }, { "id": "26", "href": "/role/24370", "description": "TER_TDPMNG" }, { "id": "52", "href": "/role/24381", "description": "TER_ADMIN" }, { "id": "65", "href": "/role/28596", "description": "USER_CAM" }, { "id": "60", "href": "/role/28597", "description": "USER_TDP" }, { "id": "62", "href": "/role/42933", "description": "USER_PERU" }, { "id": "65", "href": "/role/42934", "description": "USER_CAM" }, { "id": "60", "href": "/role/42935", "description": "USER_TDP" }, { "id": "65", "href": "/role/59766", "description": "USER_CAM" }, { "id": "62", "href": "/role/59767", "description": "USER_PERU" }, { "id": "60", "href": "/role/59768", "description": "USER_TDP" }, { "id": "65", "href": "/role/76599", "description": "USER_CAM" }, { "id": "62", "href": "/role/76600", "description": "USER_PERU" }, { "id": "60", "href": "/role/76601", "description": "USER_TDP" }, { "id": "62", "href": "/role/91330", "description": "USER_PERU" }, { "id": "60", "href": "/role/91331", "description": "USER_TDP" }, { "id": "68", "href": "/role/99604", "description": "SURVEY_ADMIN" }, { "id": "68", "href": "/role/99605", "description": "SURVEY_ADMIN" }, { "id": "66", "href": "/role/99606", "description": "BEN_ADMIN" }] }
		localStorage.setItem("user", JSON.stringify(user))
	})
	afterEach(() => {
		localStorage.clear();
	})
	it('should create', () => {
		expect(component.blockUI).toBeDefined();
		expect(component.Columns_Incident_Details.length).toEqual(13);
		expect(component.Columns_Incident_Details2.length).toEqual(13);
		expect(component.Columns_Incident_Details3.length).toEqual(19);
		expect(component.INCIDENT_DATA.length).toEqual(0);
		expect(component.INCIDENT_DETAILS_DATA.length).toEqual(0);
		expect(component.INCIDENT_DETAILS_DATA1.length).toEqual(0);
		expect(component.INCIDENT_DETAILS_DATA2.length).toEqual(0);
		expect(component.INCIDENT_DETAILS_DATA3.length).toEqual(0);
		expect(component.INCIDENT_DETAILS_DATA4.length).toEqual(0);
		expect(component.INCIDENT_DETAILS_FECHAS.length).toEqual(0);
		expect(component.INCIDENT_DETAILS_FECHAS2.length).toEqual(0);
		expect(component.INCIDENT_DETAILS_FECHAS3.length).toEqual(0);
		expect(component.INCIDENT_DETAILS_DATA_ORDER.length).toEqual(0);
		expect(component.INCIDENT_DETAILS_DATA_MOTIVO.length).toEqual(0);
		expect(component.INCIDENT_DETAILS_DATA_SUBMOTIVO.length).toEqual(0);
		expect(component.dataSourceAllExcel).toBeDefined();
		expect(component.dataSourceIncidentDetails).toBeDefined();
		expect(component.dataSourceIncidentDetails2).toBeDefined();
		expect(component.dataSourceIncidentDetails3).toBeDefined();
		expect(component.dataSourceIncidentDetails4).toBeDefined();
		expect(component.lista_quiebres.length).toEqual(0);
		expect(component.datos_fin_atencion.length).toEqual(0);
		expect(component.fecha_creacion).toBeUndefined();
		expect(component.txt_start_date).toMatch("");
		expect(component.txt_end_date).toMatch("");
		expect(component.fechasFormQuiebres).not.toBeUndefined();
		expect(component.fechasFormEnProceso).not.toBeUndefined();
		expect(component.fechasFormRegistro).not.toBeUndefined();
		expect(component.userNombres).toBeUndefined();
		expect(component.userApellidos).toBeUndefined();
		expect(component.sort).toBeDefined();
		expect(component.paginator).toBeDefined();
		expect(component.user).toBeUndefined();
		expect(component.userId).toBeUndefined();
		expect(component.idSetInterval).toBeUndefined();
		expect(component.incidents.length).toEqual(0);
		expect(component.parts).toBeUndefined();
		expect(component.fechaConvertida).toBeUndefined();
		expect(component.fechaInicio).toBeUndefined();
		expect(component.fechaFin).toBeUndefined();
		expect(component.fechaInicioConvertida).toBeUndefined();
		expect(component.fechaFinConvertida).toBeUndefined();
		expect(component.fechaQuiebre.length).toEqual(0);
		expect(component.fechaQuiebreConvertida).toEqual([]);
		component.createFormQuiebre();
		component.createFormEnProceso();
		component.createFormRegistro();
		component.ngOnDestroy();
	});

	it('when execute script mantenimiento', fakeAsync(() => {
		component.ngOnInit();
		tick(1000);
		const requestDate = {
			date1:"2021-02-17T19:25:05.829Z",
			date2:"2021-02-17T19:25:05.829Z",
			date3:"2021-02-17T19:25:05.829Z",
			date4:"2021-02-17T19:25:05.829Z",
			date5:"2021-02-17T19:25:05.829Z",
			date6:"2021-02-17T19:25:05.829Z",
		}
		const getTraerQuiebre = [
			{   
				cause: "",
				codigo_doit: "",
				codigo_remedy: "",
				comentario_final: "",
				comentario_inicio_atencion: "asdsadasdas",
				comentario_no_contacto: "asdasdsadasdsa",
				comentario_no_corresponde: "",
				comentario_no_fftt: "",
				comment: "",
				createdAt: null,
				createdBy: 4113,
				id: 5,
				importe_ajuste: "",
				observacion_ajuste: "",
				se_atendio_remedy: "No",
				se_hizo_ajuste: "No",
				se_realizo_doit: "No",
				situacion_quiebre: "Tercera",
				status: false,
				updatedAt: "2021-02-17T11:15:43",
				updatedBy: 4113,
				id_dhr_incident_submotivo: {
					id_dhr_incident_motivo: {
						id: 5,
						name: "Internet - No navega"
					},
					id: 36,
					name: "Cobertura Wifi"
				},
				id_dhr_red_incident: {
					cell_emb: "Prueba11",
					cell_titular: "966167314",
					cex_titular: "",
					createdAt: "",
					createdBy: 0,
					description: "asdasdasdasdasdas",
					dni_titular: "Prueba11",
					id: 15,
					mail_emb: "manuel.principe@telefonica.com",
					mail_titular: "manuel.principe@hotmail.com",
					name_titular: "Prueba1",
					name_titular_cex: "",
					phone_incident: "966167314",
					razon_social: "",
					ruc: "",
					status: false,
					tipo_documento: "DNI",
					updatedAt: "2021-02-17T11:14:09",
					updatedBy: 0,
					id_red_subcategory: {
						createdAt: "2021-02-15T10:31:24",
						createdBy: 4113,
						id: 9,
						name: "Cambio de plan",
						status: true,
						updatedAt: "2021-02-15T10:39:07",
						updatedBy: 4113,
						id_red_category: {
							createdAt: "2021-02-15T10:31:13",
							createdBy: 4113,
							id: 7,
							id_red_type: {
								createdAt: "2021-02-15T10:30:59",
								createdBy: 4113,
								id: 3,
								name: "Movistar Total",
								status: true,
								updatedAt: "2021-02-15T10:49:39",
								updatedBy: 4113,
							},
							name: "Pedidos",
							status: true,
							updatedAt: "2021-02-15T10:38:06",
							updatedBy: 4113
						}
					}
				},
				id_dhr_red_status: {
					code: "50",
					createdAt: "2021-02-15T10:31:34",
					createdBy: 4113,
					id: 5,
					name: "No contacto",
					status: true,
					updatedAt: "2021-02-15T10:40:15",
					updatedBy: 4113
				}
			}
		]
		component.responseTraerQuiebres(getTraerQuiebre);
		expect(component.INCIDENT_DETAILS_DATA.length).toEqual(1);
		
		
		component.showDataQuiebres(requestDate);
		expect(component.INCIDENT_DETAILS_FECHAS.length).toBeGreaterThanOrEqual(0);
		component.showDataEnProceso(requestDate);
		expect(component.INCIDENT_DETAILS_FECHAS2.length).toBeGreaterThanOrEqual(0);
		component.showDataRegistro(requestDate);
		expect(component.INCIDENT_DETAILS_FECHAS3.length).toBeGreaterThanOrEqual(0);
		
		spyOn(dialog,'open').and.callThrough();

		component.showVerDatosEmbajador(getTraerQuiebre,user);
		expect(dialog.open).toHaveBeenCalled();

		component.showVerComentario(getTraerQuiebre,user.id);
		expect(dialog.open).toHaveBeenCalled();

		component.showVerRutasQuiebres(getTraerQuiebre,user);
		expect(dialog.open).toHaveBeenCalled();

		component.showMotivoSubmotivo(getTraerQuiebre,user);
		expect(dialog.open).toHaveBeenCalled();
        let stepper: MatStepper;
		component.showInicioAtencion(getTraerQuiebre,user.id,stepper)
		expect(dialog.open).toHaveBeenCalled();
		
		component.showNoContacto(getTraerQuiebre,user.id,stepper);
		expect(dialog.open).toHaveBeenCalled();
		
		component.showNoContacto(getTraerQuiebre,user.id,stepper);
		expect(dialog.open).toHaveBeenCalled();

		component.showNoFFTT(getTraerQuiebre,user.id,stepper);
		expect(dialog.open).toHaveBeenCalled();

		component.showFinAtencion(getTraerQuiebre,user,stepper);
		expect(dialog.open).toHaveBeenCalled();

		component.showDatosFinAtencion(getTraerQuiebre,user.id);
		expect(dialog.open).toHaveBeenCalled();

		component.showReporteExcel();
		expect(dialog.open).toHaveBeenCalled();

		spyOn(Swal,'fire').and.callThrough();
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success m-1',
				cancelButton: 'btn btn-danger m-1'
			},
			buttonsStyling: false
		});
		component.borrarIncident_Details(1);
		expect(Swal.fire).toHaveBeenCalled();
		flush();
		component.responseDeleteIncident(swalWithBootstrapButtons);
        expect(Swal.fire).toHaveBeenCalled();
		flush();
		component.swalAlertMantenimiento(swalWithBootstrapButtons,"HOLA","HOLA","success");
		expect(Swal.fire).toHaveBeenCalled();
		flush();
		component.elseBorrarIncidente(true,true,swalWithBootstrapButtons);
		expect(Swal.fire).toHaveBeenCalled();
		flush();

	}))
});
