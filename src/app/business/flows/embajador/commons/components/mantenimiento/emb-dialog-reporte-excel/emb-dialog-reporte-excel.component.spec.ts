import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatTableExporterModule } from 'mat-table-exporter';
import { of } from 'rxjs';
import { IMainUser } from 'src/app/business/models/IModel-module';
import Swal from 'sweetalert2';

import { EmbDialogReporteExcelComponent } from './emb-dialog-reporte-excel.component';
export class mockSwalReportExcel{
  fire(){
    return {
      then: () =>of({
        "isConfirmed":true,
        "dismiss":false
      })
    }
  }
}
describe('EmbDialogReporteExcelComponent', () => {
  let component: EmbDialogReporteExcelComponent;
  let fixture: ComponentFixture<EmbDialogReporteExcelComponent>;
  let user:IMainUser;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbDialogReporteExcelComponent ],
      imports:[MatTableExporterModule],
      providers:[
        HttpClient,
        HttpHandler,
        {
          provide:Swal,
          useClass:mockSwalReportExcel
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbDialogReporteExcelComponent);
    component = fixture.componentInstance;
  });
  beforeEach(() => {
		user = { "id": "2955", "href": "/user/2955", "token": "abb4d410-b92d-4157-ad52-0b307be20e48", "pass": "sdasdasda", "relatedParty": { "id": "3027", "href": "/employee/3027", "name": "JOAO JOSUE / HERNANDEZ / GODOY", "email": "joao.hernandezgo@telefonica.com", "description": "Employee", "legalId": [{ "country": "49", "legalEntity": "0055", "nationalIDType": "DNI", "nationalID": "73078273" }] }, "role": [{ "id": "11", "href": "/role/7046", "description": "ELE2_USER" }, { "id": "17", "href": "/role/14482", "description": "CORONA_USER" }, { "id": "18", "href": "/role/20551", "description": "CORONA_READ_QR" }, { "id": "16", "href": "/role/21178", "description": "CORONA_ADMIN" }, { "id": "40", "href": "/role/21192", "description": "CORONA_ADMIN_VNZ" }, { "id": "26", "href": "/role/24370", "description": "TER_TDPMNG" }, { "id": "52", "href": "/role/24381", "description": "TER_ADMIN" }, { "id": "65", "href": "/role/28596", "description": "USER_CAM" }, { "id": "60", "href": "/role/28597", "description": "USER_TDP" }, { "id": "62", "href": "/role/42933", "description": "USER_PERU" }, { "id": "65", "href": "/role/42934", "description": "USER_CAM" }, { "id": "60", "href": "/role/42935", "description": "USER_TDP" }, { "id": "65", "href": "/role/59766", "description": "USER_CAM" }, { "id": "62", "href": "/role/59767", "description": "USER_PERU" }, { "id": "60", "href": "/role/59768", "description": "USER_TDP" }, { "id": "65", "href": "/role/76599", "description": "USER_CAM" }, { "id": "62", "href": "/role/76600", "description": "USER_PERU" }, { "id": "60", "href": "/role/76601", "description": "USER_TDP" }, { "id": "62", "href": "/role/91330", "description": "USER_PERU" }, { "id": "60", "href": "/role/91331", "description": "USER_TDP" }, { "id": "68", "href": "/role/99604", "description": "SURVEY_ADMIN" }, { "id": "68", "href": "/role/99605", "description": "SURVEY_ADMIN" }, { "id": "66", "href": "/role/99606", "description": "BEN_ADMIN" }] }
		localStorage.setItem("user", JSON.stringify(user))
	})
	afterEach(() => {
		localStorage.clear();
	})
  it('should create', () => {
    expect(component).toBeTruthy();
    component.ngOnDestroy();
  });

  it('when execute report excel',fakeAsync(()=>{
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
				situacion_quiebre: "Primera",
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
      },
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
				situacion_quiebre: "Segunda",
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
      },
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
    component.ocultarTabla();
    flush();
    expect(component.tablaReporte).toEqual(true);
    component.ngOnInit();
    component.responseGetQuiebresReport(getTraerQuiebre);
    
    // applyFilter
    // applyFilter
    let spy=spyOn(component,'applyFilter').and.callThrough();
    let spy2=spyOn(component,'applyFilter2').and.callThrough();
    let spy3=spyOn(component,'applyFilter3').and.callThrough();
    const event:any={
      target:{
        value:"hola"
      }
    };
    component.applyFilter(event);
    tick(1000);
    expect(spy).toHaveBeenCalled();
    component.applyFilter2(event);
    tick(1000);
    expect(spy2).toHaveBeenCalled();
    component.applyFilter3(event);
    tick(1000);
    expect(spy3).toHaveBeenCalled();


    const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success m-1',
				cancelButton: 'btn btn-danger m-1'
			},
			buttonsStyling: false
    });
    spyOn(Swal,'fire').and.callThrough();
    component.alertSwalBorrarIncident(swalWithBootstrapButtons,"A","A","success");
    component.borrarIncident_Details(1);
    component.responseThenSwalAlert(true,swalWithBootstrapButtons,1,false);
    expect(Swal.fire).toHaveBeenCalled();
    flush();
    component.responseReportIncidentDelete(swalWithBootstrapButtons);
    expect(Swal.fire).toHaveBeenCalled();
    flush();
  }))
});
