import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { EmbDialogNoContactoComponent } from './emb-dialog-no-contacto.component';

describe('EmbDialogNoContactoComponent', () => {
  let component: EmbDialogNoContactoComponent;
  let fixture: ComponentFixture<EmbDialogNoContactoComponent>;
  const mockDialogRefNoContacto = {
    close: () => { },
    afterClosed: () => { }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmbDialogNoContactoComponent],
      providers: [
        HttpClient,
        HttpHandler,
        FormBuilder,
        {
          provide: MatDialogRef,
          useValue: mockDialogRefNoContacto
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
    fixture = TestBed.createComponent(EmbDialogNoContactoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.lista_motivos).toBeUndefined();
    expect(component.lista_submotivos2).toBeUndefined();
    expect(component.id_submotivo).toBeUndefined();
    expect(component.lista_quiebres_id_dhr_incident_submotivo).toBeUndefined();
    expect(component.lista_quiebres_id_dhr_red_incident).toBeUndefined();
    expect(component.lista_quiebres_quiebre_id_dhr_red_status).toBeUndefined();
    expect(component.lista_quiebres_submotivo).toBeUndefined();
  });

  it('when execute script no contacto', fakeAsync(() => {
    const motivos = [
      {
        id: 1,
        name: "Incremento de precio"
      },
      {
        id: 2,
        name: "Facturación"
      }
    ]

    const subMotivos = [
       {
         id: 1,
         id_dhr_incident_motivo: {
           id: 1,
           name: "Incremento de precio"
         },
         name: "Explicación de beneficios - Mas velocidad / MiPlay"
       },
       {
         id: 2,
         id_dhr_incident_motivo: {
           id: 1,
           name: "Incremento de precio"
         },
         name: "Aplica tratamiento comercial o reclamo"
       }
     ]

     const requestNoContacto = {
           cause: "",
           codigo_doit: "",
           codigo_remedy: "",
           comentario_final: "",
           comentario_inicio_atencion: "...",
           comentario_no_contacto: "",
           comentario_no_corresponde: "",
           comentario_no_fftt: "",
           comment: "",
           createdAt: "Wed Feb 17 2021 00:00:00 GMT-0500 (hora estándar de Perú)",
           createdBy: 2955,
           id: 6,
           importe_ajuste: "",
           observacion_ajuste: "",
           se_atendio_remedy: "No",
           se_hizo_ajuste: "No",
           se_realizo_doit: "No",
           situacion_quiebre: "Primera",
           status: false,
           updatedAt: "2021-02-17T16:31:15",
           updatedBy: 2955,
           id_dhr_red_status: {
             code: "10",
             createdAt: "2021-02-15T10:31:33",
             createdBy: 4113,
             id: 1,
             name: "No atendido",
             status: true,
             updatedAt: "2021-02-15T10:40:13",
             updatedBy: 4113
           },
           id_dhr_red_incident: {
             cell_emb: "936555023",
             cell_titular: "936555023",
             cex_titular: "",
             createdAt: "2021-02-17T16:31:01",
             createdBy: 0,
             description: ".....",
             dni_titular: "73078273",
             id: 16,
             mail_emb: "joao.hernandezgo@telefonica.com",
             mail_titular: "joao.hernandezgo@telefonica.com",
             name_titular: "joao josue hernandez godoy",
             name_titular_cex: "",
             phone_incident: "936555023",
             razon_social: "",
             ruc: "",
             status: false,
             tipo_documento: "DNI",
             updatedAt: "2021-02-17T16:31:01",
             updatedBy: 0,
             id_red_subcategory: {
               createdAt: "2021-02-15T10:31:22",
               createdBy: 4113,
               id: 5,
               name: "Descuento no aplicado",
               status: true,
               updatedAt: "2021-02-15T10:39:06",
               updatedBy: 4113,
               id_red_category: {
                 createdAt: "2021-02-15T10:31:22",
                 createdBy: 4113,
                 id: 5,
                 name: "Reclamos",
                 status: true,
                 updatedAt: "2021-02-15T10:38:05",
                 updatedBy: 4113,
                 id_red_type: {
                   createdAt: "2021-02-15T10:30:59",
                   createdBy: 4113,
                   id: 1,
                   name: "Fija",
                   status: true,
                   updatedAt: "2021-02-15T10:49:38",
                   updatedBy: 4113,
                 }
               }
             }
           },
           id_dhr_incident_submotivo:{
             id_dhr_incident_motivo:{
               id: 19,
               name: "Sin asignar",
             },
             id:141,
             name: "Sin asignar"

           }
         }

    component.initData();
    component.responseGetIncidentMotivos(motivos);
    expect(component.lista_motivos.length).toBeGreaterThanOrEqual(1);


  }));



});
