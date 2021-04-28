import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { executionAsyncId } from 'async_hooks';

import { EmbDialogInicioAtencionComponent } from './emb-dialog-inicio-atencion.component';

describe('EmbDialogInicioAtencionComponent', () => {
  let component: EmbDialogInicioAtencionComponent;
  let fixture: ComponentFixture<EmbDialogInicioAtencionComponent>;
  const mockDialogRefInicioAten = {
    close : () =>{},
    afterClosed: () =>{}
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmbDialogInicioAtencionComponent],
      providers: [
        HttpClient,
        HttpHandler,
        FormBuilder,
        {
          provide: MatDialogRef,
          useValue: mockDialogRefInicioAten
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbDialogInicioAtencionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component.blockUI).toBeDefined();
    expect(component.Incident_details.length).toEqual(0);
    expect(component.quiebreForm).toBeDefined();
    expect(component.lista_motivos).toBeUndefined();
    expect(component.lista_submotivos2).toBeUndefined();
    expect(component.id_submotivo).toBeUndefined();
    expect(component.lista_quiebres_id_dhr_incident_submotivo).toBeUndefined();
    expect(component.lista_quiebres_id_dhr_red_incident).toBeUndefined();
    expect(component.lista_quiebres_quiebre_id_dhr_red_status).toBeUndefined();
    expect(component.lista_quiebres_submotivo).toBeUndefined();
  });

  // it('when execute script inicio atencion', fakeAsync(() => {
  //   component.ngOnInit();
  //   const motivos = [
  //     {
  //       id: 1,
  //       name: "Incremento de precio"
  //     },
  //     {
  //       id: 2,
  //       name: "Facturación"
  //     }
  //   ]
  //   const subMotivos = [
  //     {
  //       id: 1,
  //       id_dhr_incident_motivo: {
  //         id: 1,
  //         name: "Incremento de precio"
  //       },
  //       name: "Explicación de beneficios - Mas velocidad / MiPlay"
  //     },
  //     {
  //       id: 2,
  //       id_dhr_incident_motivo: {
  //         id: 1,
  //         name: "Incremento de precio"
  //       },
  //       name: "Aplica tratamiento comercial o reclamo"
  //     }
  //   ]

  //   const requestInicioAten = {
  //     cause: "",
  //     codigo_doit: "",
  //     codigo_remedy: "",
  //     comentario_final: "",
  //     comentario_inicio_atencion: "...",
  //     comentario_no_contacto: "",
  //     comentario_no_corresponde: "",
  //     comentario_no_fftt: "",
  //     comment: "",
  //     createdAt: "Wed Feb 17 2021 00:00:00 GMT-0500 (hora estándar de Perú)",
  //     createdBy: 2955,
  //     id: 6,
  //     importe_ajuste: "",
  //     observacion_ajuste: "",
  //     se_atendio_remedy: "No",
  //     se_hizo_ajuste: "No",
  //     se_realizo_doit: "No",
  //     situacion_quiebre: "Primera",
  //     status: false,
  //     updatedAt: "2021-02-17T16:31:15",
  //     updatedBy: 2955,
  //     id_dhr_red_status: {
  //       code: "10",
  //       createdAt: "2021-02-15T10:31:33",
  //       createdBy: 4113,
  //       id: 1,
  //       name: "No atendido",
  //       status: true,
  //       updatedAt: "2021-02-15T10:40:13",
  //       updatedBy: 4113
  //     },
  //     id_dhr_red_incident: {
  //       cell_emb: "936555023",
  //       cell_titular: "936555023",
  //       cex_titular: "",
  //       createdAt: "2021-02-17T16:31:01",
  //       createdBy: 0,
  //       description: ".....",
  //       dni_titular: "73078273",
  //       id: 16,
  //       mail_emb: "joao.hernandezgo@telefonica.com",
  //       mail_titular: "joao.hernandezgo@telefonica.com",
  //       name_titular: "joao josue hernandez godoy",
  //       name_titular_cex: "",
  //       phone_incident: "936555023",
  //       razon_social: "",
  //       ruc: "",
  //       status: false,
  //       tipo_documento: "DNI",
  //       updatedAt: "2021-02-17T16:31:01",
  //       updatedBy: 0,
  //       id_red_subcategory: {
  //         createdAt: "2021-02-15T10:31:22",
  //         createdBy: 4113,
  //         id: 5,
  //         name: "Descuento no aplicado",
  //         status: true,
  //         updatedAt: "2021-02-15T10:39:06",
  //         updatedBy: 4113,
  //         id_red_category: {
  //           createdAt: "2021-02-15T10:31:22",
  //           createdBy: 4113,
  //           id: 5,
  //           name: "Reclamos",
  //           status: true,
  //           updatedAt: "2021-02-15T10:38:05",
  //           updatedBy: 4113,
  //           id_red_type: {
  //             createdAt: "2021-02-15T10:30:59",
  //             createdBy: 4113,
  //             id: 1,
  //             name: "Fija",
  //             status: true,
  //             updatedAt: "2021-02-15T10:49:38",
  //             updatedBy: 4113,
  //           }
  //         }
  //       }
  //     },
  //     id_dhr_incident_submotivo:{
  //       id_dhr_incident_motivo:{
  //         id: 19,
  //         name: "Sin asignar",
  //       },
  //       id:141,
  //       name: "Sin asignar"

  //     }
  //   }
  //   const getTraerQuiebre = 
	// 		{   
	// 			cause: "",
	// 			codigo_doit: "",
	// 			codigo_remedy: "",
	// 			comentario_final: "",
	// 			comentario_inicio_atencion: "asdsadasdas",
	// 			comentario_no_contacto: "asdasdsadasdsa",
	// 			comentario_no_corresponde: "",
	// 			comentario_no_fftt: "",
	// 			comment: "",
	// 			createdAt: null,
	// 			createdBy: 4113,
	// 			id: 5,
	// 			importe_ajuste: "",
	// 			observacion_ajuste: "",
	// 			se_atendio_remedy: "No",
	// 			se_hizo_ajuste: "No",
	// 			se_realizo_doit: "No",
	// 			situacion_quiebre: "Tercera",
	// 			status: false,
	// 			updatedAt: "2021-02-17T11:15:43",
	// 			updatedBy: 4113,
	// 			id_dhr_incident_submotivo: {
	// 				id_dhr_incident_motivo: {
	// 					id: 5,
	// 					name: "Internet - No navega"
	// 				},
	// 				id: 36,
	// 				name: "Cobertura Wifi"
	// 			},
	// 			id_dhr_red_incident: {
	// 				cell_emb: "Prueba11",
	// 				cell_titular: "966167314",
	// 				cex_titular: "",
	// 				createdAt: "",
	// 				createdBy: 0,
	// 				description: "asdasdasdasdasdas",
	// 				dni_titular: "Prueba11",
	// 				id: 15,
	// 				mail_emb: "manuel.principe@telefonica.com",
	// 				mail_titular: "manuel.principe@hotmail.com",
	// 				name_titular: "Prueba1",
	// 				name_titular_cex: "",
	// 				phone_incident: "966167314",
	// 				razon_social: "",
	// 				ruc: "",
	// 				status: false,
	// 				tipo_documento: "DNI",
	// 				updatedAt: "2021-02-17T11:14:09",
	// 				updatedBy: 0,
	// 				id_red_subcategory: {
	// 					createdAt: "2021-02-15T10:31:24",
	// 					createdBy: 4113,
	// 					id: 9,
	// 					name: "Cambio de plan",
	// 					status: true,
	// 					updatedAt: "2021-02-15T10:39:07",
	// 					updatedBy: 4113,
	// 					id_red_category: {
	// 						createdAt: "2021-02-15T10:31:13",
	// 						createdBy: 4113,
	// 						id: 7,
	// 						id_red_type: {
	// 							createdAt: "2021-02-15T10:30:59",
	// 							createdBy: 4113,
	// 							id: 3,
	// 							name: "Movistar Total",
	// 							status: true,
	// 							updatedAt: "2021-02-15T10:49:39",
	// 							updatedBy: 4113,
	// 						},
	// 						name: "Pedidos",
	// 						status: true,
	// 						updatedAt: "2021-02-15T10:38:06",
	// 						updatedBy: 4113
	// 					}
	// 				}
	// 			},
	// 			id_dhr_red_status: {
	// 				code: "50",
	// 				createdAt: "2021-02-15T10:31:34",
	// 				createdBy: 4113,
	// 				id: 5,
	// 				name: "No contacto",
	// 				status: true,
	// 				updatedAt: "2021-02-15T10:40:15",
	// 				updatedBy: 4113
	// 			}
	// 		}
		
  //   component.data={ 
  //     "lista_quiebres":getTraerQuiebre
  //   };
  //   flush();
  //   component.initData();
  //   component.responseGetIncidentMotivos(motivos);
  //   component.responsegetIncidentSubMotivos(subMotivos);
  //   expect(component.lista_motivos.length).toBeGreaterThanOrEqual(1);
  //   expect(component.lista_submotivos.length).toBeGreaterThanOrEqual(1);
  //   component.onSelectMotivo(1);
  //   expect(component.lista_submotivos2).not.toBeNull();
  //   component.onSelectSubMotivo(1);
  //   expect(component.id_submotivo).toEqual(1);
  //   spyOn(component.dialogRef,'close').and.callThrough();
  //   component.afterCloseInicioAten(true);
  //   expect(component.dialogRef.close).toHaveBeenCalled();

  //   component.updateComentarioQuiebre(requestInicioAten);

  // }))
});
