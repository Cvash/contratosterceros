import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EmbDialogFinAtencionComponent } from './emb-dialog-fin-atencion.component';

describe('EmbDialogFinAtencionComponent', () => {
  let component: EmbDialogFinAtencionComponent;
  let fixture: ComponentFixture<EmbDialogFinAtencionComponent>;
  const mockdialogRefFinAtencion = {
    close: () => { },
    afterClosed: () => { }
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmbDialogFinAtencionComponent],
      providers: [
        FormBuilder,
        HttpClient,
        HttpHandler,
        {
          provide: MatDialogRef,
          useValue: mockdialogRefFinAtencion
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
    fixture = TestBed.createComponent(EmbDialogFinAtencionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component.blockUI).toBeDefined();
    expect(component.ajuste).toBeUndefined();
    expect(component.remedy).toBeUndefined();
    expect(component.doit).toBeUndefined();
    expect(component.lista_quiebres_submotivo).toBeUndefined();
    expect(component.quiebreRegistradoForm).not.toBeUndefined();
    expect(component.condicional_ajuste).toBeUndefined();
    expect(component.condicional_remedy).toBeUndefined();
    expect(component.condicional_doit).toBeUndefined();

    expect(component.lista_quiebres_id_dhr_red_incident).toBeUndefined();
    expect(component.lista_quiebres_quiebre_id_dhr_red_status).toBeUndefined();

    component.ngOnInit();

    expect(component.onSelectAjuste(1)).toEqual(1);
    expect(component.onSelectRemedy(2)).toEqual(2);
    expect(component.onSelectDoit(3)).toEqual(3);

  });

  // it('when execute script fin atencion', fakeAsync(() => {
  //   spyOn(component.dialogRef, 'close');
  //   component.afterCloseDialogFin(true);
  //   expect(component.dialogRef.close).toHaveBeenCalled();
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
  //   const requestShowFinAtencion = {
  //     cause: "",
  //     codigo_doit: "",
  //     codigo_remedy: "",
  //     comentario_final: "",
  //     comentario_inicio_atencion: "asdasdasdasd",
  //     comentario_no_contacto: "",
  //     comentario_no_corresponde: "",
  //     comentario_no_fftt: "",
  //     comment: "",
  //     createdAt: null,
  //     createdBy: 2955,
  //     id: 4,
  //     importe_ajuste: "",
  //     observacion_ajuste: "",
  //     se_atendio_remedy: "No",
  //     se_hizo_ajuste: "No",
  //     se_realizo_doit: "No",
  //     situacion_quiebre: "Segunda",
  //     status: false,
  //     updatedAt: "2021-02-17T11:03:41",
  //     updatedBy: 2955,
  //     id_dhr_red_status: {
  //       code: "20",
  //       createdAt: "2021-02-15T10:31:33",
  //       createdBy: 4113,
  //       id: 2,
  //       name: "Proceso de gestión y atención",
  //       status: true,
  //       updatedAt: "2021-02-15T10:40:14",
  //       updatedBy: 4113
  //     },
  //     id_dhr_red_incident: {
  //       cell_emb: "996595999",
  //       cell_titular: "989857458",
  //       cex_titular: "",
  //       createdAt: "Tue Feb 16 2021 00:00:00 GMT-0500 (hora estándar de Perú)",
  //       createdBy: 0,
  //       description: "----",
  //       dni_titular: "73078273",
  //       id: 12,
  //       mail_emb: "joao.hernandezgo@telefonica.com",
  //       mail_titular: "joao.hernandezgo@telefonica.com",
  //       name_titular: "joao josue hernandez godoy",
  //       name_titular_cex: "",
  //       phone_incident: "888899898",
  //       razon_social: "",
  //       ruc: "",
  //       status: false,
  //       tipo_documento: "DNI",
  //       updatedAt: "2021-02-16T21:41:59",
  //       updatedBy: 0,
  //       id_red_subcategory: {
  //         createdAt: "2021-02-15T10:31:23",
  //         createdBy: 4113,
  //         id: 7,
  //         name: "Descuento no aplicado",
  //         status: true,
  //         updatedAt: "2021-02-15T10:39:06",
  //         updatedBy: 4113,
  //         id_red_category: {
  //           createdAt: "2021-02-15T10:31:12",
  //           createdBy: 4113,
  //           id: 5,
  //           name: "Reclamos",
  //           status: true,
  //           updatedAt: "2021-02-15T10:38:05",
  //           updatedBy: 4113,
  //           id_red_type: {
  //             createdAt: "2021-02-15T10:30:59",
  //             createdBy: 4113,
  //             id: 2,
  //             name: "Movil",
  //             status: true,
  //             updatedAt: "2021-02-15T10:49:38",
  //             updatedBy: 4113
  //           }
  //         }
  //       }
  //     },
  //     id_dhr_incident_submotivo: {
  //       id: 1,
  //       name: "Explicación de beneficios - Mas velocidad / MiPlay",
  //       id_dhr_incident_motivo: {
  //         id: 1,
  //         name: "Incremento de precio"
  //       }
  //     }
  //   }
  //   component.updateFinAtencion(requestShowFinAtencion);
  //   expect(component.dialogRef.close).toHaveBeenCalled();
  // }))
});
