import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { mockSwal } from 'src/app/business/flows/office/terceros/components/mypass/mypass.component.spec';
import Swal from 'sweetalert2';
import { IMainUser } from '../../../../../../business/models/IModel-module';
import { YoTeAyudoComponent } from './yo-te-ayudo.component';

export class mockDialogYoTeAyudo{
  open(){
    return {
      afterClosed:()=>of({
        condition:1,
        employee:{
          id:2
        },
        result:true,
        mail:"josue180610@hotmail.com"
        
      })
    }
  }
}
export class mockSwalYoTeAyudo { 
  fire () {
    return {
      then : ()=> of({
        "isConfirmed":true
      })
    }   
  }
}
describe('YoTeAyudoComponent', () => {
  let component: YoTeAyudoComponent;
  let fixture: ComponentFixture<YoTeAyudoComponent>;
  let user:IMainUser;
  let dialog:MatDialog;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoTeAyudoComponent ],
      imports:[MatDialogModule],
      providers:[
        HttpClient,
        HttpHandler,
        FormBuilder,
        {
          provide:MatDialog,
          useClass:mockDialogYoTeAyudo
        },
        {
          provide:Swal,
          useClass:mockSwal
        }
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoTeAyudoComponent);
    component = fixture.componentInstance;
    dialog=TestBed.inject(MatDialog);
  });
  beforeEach(()=>{ 
    user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
    localStorage.setItem("user",JSON.stringify(user))
  })
  afterEach(()=>{ 
    localStorage.clear();
  })
  it('should create', () => {
    // spyOn(Swal, 'fire').and.callThrough();
    // component.dialog
    // expect(Swal.fire).toHaveBeenCalled();
    // spyOn(dialog, 'open').and.callThrough();
    // component.id_subcategory;
    // expect(dialog.open).toHaveBeenCalled();

    expect(component.blockUI).not.toBeUndefined();
    expect(component.Columns_Incident_Details.length).toEqual(6);
    expect(component.paginator).toBeUndefined();
    expect(component.INCIDENT_DATA.length).toEqual(0);
    expect(component.dataSourceIncidentDetails).not.toBeUndefined();
    expect(component.yoteayudoForm).not.toBeUndefined();
    expect(component.incidents.length).toEqual(0);
    expect(component.incident_details.length).toBeUndefined();
    expect(component.mostrarFormulario).toEqual(false);
    expect(component.tipodocumento).toContain("sindocumento");
    expect(component.user).toBeUndefined();
    expect(component.userId).toBeUndefined();
    expect(component.incident_details.comment).toMatch('');
    expect(component.incident_details.cause).toMatch('')
    expect(component.incidente_creado.length).toEqual(0)
    expect(component.tipo_documento).toBeUndefined();
    expect(component.id_subcategory).toBeUndefined();
    expect(component.incident_form.length).toEqual(0);
    expect(component.red_category2.length).toEqual(0);
    expect(component.red_subcategory2.length).toEqual(0);
    expect(component.selectedRed_Type.id).toEqual(0);
    expect(component.red_type).toEqual([]);
    expect(component.red_category).toEqual([]);
    expect(component.red_subcategory).toEqual([]);
  });
  it('when execute script of component yo te ayudo',fakeAsync(()=>{
    component.ngOnInit();
    tick(1000);
    spyOn(component,'initDataSelect');
    flush();
    // DTO
    const getTypes=[
      {
        createdAt: "2021-02-15T10:30:59",
        createdBy: 4113,
        id: 1,
        name: "Fija",
        status: true,
        updatedAt: "2021-02-15T10:49:38",
        updatedBy: 4113
      },
      {
        createdAt: "2021-02-15T10:30:59",
        createdBy: 4113,
        id: 2,
        name: "Movil",
        status: true,
        updatedAt: "2021-02-15T10:49:38",
        updatedBy: 4113
      }
    ]
    const getSubCategory=[
      {
        createdAt: "2021-02-15T10:31:21",
        createdBy: 4113,
        id: 1,
        id_red_category:{
          createdAt: "2021-02-15T10:31:11",
          createdBy: 4113,
          id: 1,
          id_red_type:{
            createdAt: "2021-02-15T10:30:59",
            createdBy: 4113,
            id: 1,
            name: "Fija",
            status: true,
            updatedAt: "2021-02-15T10:49:38",
            updatedBy: 4113
          }
        },
        name: "Migración",
        status: true,
        updatedAt: "2021-02-15T10:39:04",
        updatedBy: 4113
      }
    ]
    const getCategory=[
      {
        createdAt: "2021-02-15T10:31:11",
        createdBy: 4113,
        id: 1,
        id_red_type:{
          createdAt: "2021-02-15T10:30:59",
          createdBy: 4113,
          id: 1,
          name: "Fija",
          status: true,
          updatedAt: "2021-02-15T10:49:38",
          updatedBy: 4113
        },
        name: "Pedidos",
        status: true,
        updatedAt: "2021-02-15T10:38:04",
        updatedBy: 4113
      }
    ]
    const getIncidents=[
      {
        cell_emb: "995566892",
        cell_titular: "966167314",
        cex_titular: "",
        createdAt: "2021-02-15T10:52:29",
        createdBy: 0,
        description: "asdasdasd",
        dni_titular: "70510591",
        id: 1,
        id_red_subcategory:{
          createdAt: "2021-02-15T10:31:24",
          createdBy: 4113,
          id: 9,
          id_red_category:{
            createdAt: "2021-02-15T10:31:13",
            createdBy: 4113,
            id: 7,
          id_red_type:{
            createdAt: "2021-02-15T10:30:59",
            createdBy: 4113,
            id: 3,
            name: "Movistar Total",
            status: true,
            updatedAt: "2021-02-15T10:49:39",
            updatedBy: 4113
          },
          name: "Pedidos",
          status: true,
          updatedAt: "2021-02-15T10:38:06",
          updatedBy: 4113
        }
        },
        mail_emb: "principetolentinoa@hotmail.com",
        mail_titular: "principetolentinoa@hotmail.com",
        name_titular: "Alexander Principe Tolentino",
        name_titular_cex: "",
        phone_incident: "966167314",
        razon_social: "",
        ruc: "",
        status: false,
        tipo_documento: "DNI",
        updatedAt: "2021-02-15T10:52:29",
        updatedBy: 0

      }
    ]
    const getQuiebres = [
      {
        cause: "",
        codigo_doit: "",
        codigo_remedy: "",
        comentario_final: "",
        comentario_inicio_atencion: "asdsad",
        comentario_no_contacto: "",
        comentario_no_corresponde: "",
        comentario_no_fftt: "",
        comment: "",
        createdAt: null,
        createdBy: 2955,
        id: 2,
        id_dhr_incident_submotivo:{
          id:28,
          id_dhr_incident_motivo:{
            id: 4,
            name: "Internet - Intermitencia / Lentitud"
          }
        },
        id_dhr_red_incident:{
          cell_emb: "936555023",
          cell_titular: "936555023",
          cex_titular: "",
          createdAt: "2021-02-15T18:26:09",
          createdBy: 0,
          description: "asd",
          dni_titular: "73078273",
          id: 5,
          mail_emb: "joao.hernandezgo@telefonica.com",
          mail_titular: "joao.hernandezgo@telefonica.com",
          name_titular: "joao josue hernandez godoy",
          name_titular_cex: "",
          phone_incident: "936555023",
          razon_social: "",
          ruc: "",
          status: false,
          tipo_documento: "DNI",
          updatedAt: "2021-02-15T18:26:09",
          updatedBy: 0,
          id_red_subcategory:{
            createdAt: "2021-02-15T10:31:22",
            createdBy: 4113,
            id: 5,
            name: "Descuento no aplicado",
            status: true,
            updatedAt: "2021-02-15T10:39:06",
            updatedBy: 4113,
            id_red_category:{
              createdAt: "2021-02-15T10:31:12",
              createdBy: 4113,
              id: 3,
              name: "Reclamos",
              status: true,
              updatedAt: "2021-02-15T10:38:05",
              updatedBy: 4113,
              id_red_type:{
                createdAt: "2021-02-15T10:30:59",
                createdBy: 4113,
                id: 1,
                name: "Fija",
                status: true,
                updatedAt: "2021-02-15T10:49:38",
                updatedBy: 4113
              }
            }
          }
        },
        id_dhr_red_status:{
          code: "20",
          createdAt: "2021-02-15T10:31:33",
          createdBy: 4113,
          id: 2,
          name: "Proceso de gestión y atención",
          status: true,
          updatedAt: "2021-02-15T10:40:14",
          updatedBy: 4113
        },
        importe_ajuste: "",
        observacion_ajuste: "",
        se_atendio_remedy: "No",
        se_hizo_ajuste: "No",
        se_realizo_doit: "No",
        situacion_quiebre: "Segunda",
        status: false,
        updatedAt: "2021-02-15T18:58:45",
        updatedBy: 2955
      }
    ]
    component.responseGetIncident(getIncidents);
    component.responseGetTypes(getTypes);
    component.responseGetCategory(getCategory);
    component.responseGetSubCategory(getSubCategory);
    component.responseTraerQuiebres(getQuiebres);
    flush();
    expect(component.incidents.length).toEqual(1);
    expect(component.red_type.length).toEqual(2);
    expect(component.red_category.length).toEqual(1);
    expect(component.red_subcategory.length).toEqual(1);
    expect(component.INCIDENT_DATA.length).toEqual(1);

    component.onSelectRed(1);
    component.onSelectCategory(1);
    component.onSelectTipoDocumento(1);
    component.showForm();
    component.resetearForm();
    expect(component.onSelectSubCategory(1)).toEqual(1);
    expect(component.tipodocumento).toEqual(1);
    expect(component.mostrarFormulario).toEqual(true);

    spyOn(dialog,'open').and.callThrough();
    component.showVerEstado(null,2955);
    expect(dialog.open).toHaveBeenCalled();

    const valueIncident={
      cell_emb: "985666874",
      cell_titular: "989878987",
      cex_titular: "",
      description: "hola mundo.",
      dni_titular: "73078273",
      id_dhr_user: "2955",
      id_red_subcategory: "5",
      mail_emb: "joao.hernandezgo@telefonica.com",
      mail_titular: "joao.hernandezgo@telefonica.com",
      name_titular: "joao josue hernandez godoy",
      name_titular_cex: "",
      phone_incident: "999999878",
      razon_social: "",
      ruc: "",
      tipo_documento: "DNI"
    }
    const reponseSaveIncidentApi={
      cell_emb: "936555023",
      cell_titular: "936555023",
      cex_titular: "",
      createdAt: "2021-02-15T18:26:09",
      createdBy: 0,
      description: "asd",
      dni_titular: "73078273",
      id: 5,
      mail_emb: "joao.hernandezgo@telefonica.com",
      mail_titular: "joao.hernandezgo@telefonica.com",
      name_titular: "joao josue hernandez godoy",
      name_titular_cex: "",
      phone_incident: "936555023",
      razon_social: "",
      ruc: "",
      status: false,
      tipo_documento: "DNI",
      updatedAt: "2021-02-15T18:26:09",
      updatedBy: 0,
      id_red_subcategory:{
        createdAt: "2021-02-15T10:31:22",
        createdBy: 4113,
        id: 5,
        name: "Descuento no aplicado",
        status: true,
        updatedAt: "2021-02-15T10:39:06",
        updatedBy: 4113,
        id_red_category:{
          createdAt: "2021-02-15T10:31:12",
          createdBy: 4113,
          id: 3,
          name: "Reclamos",
          status: true,
          updatedAt: "2021-02-15T10:38:05",
          updatedBy: 4113,
          id_red_type:{
            createdAt: "2021-02-15T10:30:59",
            createdBy: 4113,
            id: 1,
            name: "Fija",
            status: true,
            updatedAt: "2021-02-15T10:49:38",
            updatedBy: 4113
          }
        }
      }
    }
    spyOn(Swal,'fire').and.callThrough();
    component.saveIncident(valueIncident);
    const valueIncidentDetails = {
      cause: "",
      codigo_doit: "",
      codigo_remedy: "",
      comentario_final: "",
      comentario_inicio_atencion: "",
      comentario_no_contacto: "",
      comentario_no_corresponde: "",
      comentario_no_fftt: "",
      comment: "",
      createdBy: "2955",
      id_dhr_incident_submotivo: 141,
      id_dhr_red_incident: 11,
      id_dhr_red_status: 1,
      importe_ajuste: "",
      observacion_ajuste: "",
      se_atendio_remedy: "No",
      se_hizo_ajuste: "No",
      se_realizo_doit: "No",
      situacion_quiebre: "Primera",
      status: "",
      updatedBy: "2955"
    }
    component.responseSaveIncident(reponseSaveIncidentApi);
    expect(component.incidente_creado.cell_emb).toMatch(reponseSaveIncidentApi.cell_emb);
    
    const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success m-1',
				cancelButton: 'btn btn-danger m-1'
			},
			buttonsStyling: false
    });
    
    component.responseSaveIncidentDetails(swalWithBootstrapButtons,"A","A","success");
    expect(Swal.fire).toHaveBeenCalled();
    flush();
    expect(Swal.fire).toHaveBeenCalled();
    flush();
    component.errorIncident();
    expect(Swal.fire).toHaveBeenCalled();
    flush();
    component.elseDissmissSwal(true,true,swalWithBootstrapButtons);
    expect(Swal.fire).toHaveBeenCalled();
    flush();
  }))
});





