import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { IMainUser } from 'src/app/business/models/IModel-module';
import { MovistarTotalComponent } from './movistar-total.component';
export class mockDialogMovTotal {
  open(){
    return {
      afterClosed : () => of({
        "result":true,
        "isConfirmed":true
      })
    }
  }
}
describe('MovistarTotalComponent', () => {
  let component: MovistarTotalComponent;
  let fixture: ComponentFixture<MovistarTotalComponent>;
  let user:IMainUser;
  let dialog:MatDialog;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovistarTotalComponent ],
      providers:[
        HttpClient,
        HttpHandler,
        FormBuilder,
        { 
          provide:MatDialog,
          useClass:mockDialogMovTotal
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovistarTotalComponent);
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
    expect(component.PlanForm).toBeDefined();
    expect(component.planMostrado.length).toEqual(0);
    expect(component.valoresForm.length).toEqual(0);
    expect(component.user).toBeUndefined();
    expect(component.userId).toBeUndefined();
    expect(component.mostrarInformacionPlanes).toEqual(true);
    expect(component.mostrarInformacionPlanesForm).toEqual(true);
    expect(component.plansMovistarTotal.length).toEqual(0);
    expect(component.plansHogar.length).toEqual(0);
    expect(component.plansMovil.length).toEqual(0);
    expect(component.plans.length).toEqual(0);

  });

  it('when execute script movistar total',fakeAsync(()=>{
    const getPlanes = [
      {
        bono: "por defecto",
        cant_mbps: "180",
        createdAt: null,
        createdBy: 0,
        emb_price: "200",
        gb_international: "Zona América y Europa",
        id: 1,
        linea_fija: "Llamadas ilimitadas a fijos Movistar",
        lineas_moviles: "13",
        max_descarga: "150",
        max_subida: "150",
        modem: "WiFi 2.4 y 5 GHz",
        plan_type: "Familiar 9",
        regular_price: "235",
        status: false,
        tv: "108 canales SD + 64 canales HD",
        updatedAt: "2021-02-17T08:38:30",
        updatedBy: 0,
        wsp_international: "Solo texto",
        id_emb_type:{
          createdAt: "2020-12-09T18:34:08",
          createdBy: 0,
          id: 1,
          name: "Movistar Total",
          status: true,
          updatedAt: "2020-12-10T09:46:18",
          updatedBy: 0
        }
      },
      {
        bono: "por defecto",
        cant_mbps: "180",
        createdAt: null,
        createdBy: 0,
        emb_price: "200",
        gb_international: "Zona América y Europa",
        id: 1,
        linea_fija: "Llamadas ilimitadas a fijos Movistar",
        lineas_moviles: "13",
        max_descarga: "150",
        max_subida: "150",
        modem: "WiFi 2.4 y 5 GHz",
        plan_type: "Familiar 9",
        regular_price: "235",
        status: false,
        tv: "108 canales SD + 64 canales HD",
        updatedAt: "2021-02-17T08:38:30",
        updatedBy: 0,
        wsp_international: "Solo texto",
        id_emb_type:{
          createdAt: "2020-12-09T18:34:08",
          createdBy: 0,
          id: 2,
          name: "Movistar Total",
          status: true,
          updatedAt: "2020-12-10T09:46:18",
          updatedBy: 0
        }
      },
      {
        bono: "por defecto",
        cant_mbps: "180",
        createdAt: null,
        createdBy: 0,
        emb_price: "200",
        gb_international: "Zona América y Europa",
        id: 1,
        linea_fija: "Llamadas ilimitadas a fijos Movistar",
        lineas_moviles: "13",
        max_descarga: "150",
        max_subida: "150",
        modem: "WiFi 2.4 y 5 GHz",
        plan_type: "Familiar 9",
        regular_price: "235",
        status: false,
        tv: "108 canales SD + 64 canales HD",
        updatedAt: "2021-02-17T08:38:30",
        updatedBy: 0,
        wsp_international: "Solo texto",
        id_emb_type:{
          createdAt: "2020-12-09T18:34:08",
          createdBy: 0,
          id: 3,
          name: "Movistar Total",
          status: true,
          updatedAt: "2020-12-10T09:46:18",
          updatedBy: 0
        }
      }
    ]

    component.ngOnInit();
    tick(1000);
    component.responseGetPlanes(getPlanes);
    flush();
    expect(component.plansHogar.length).toEqual(1);
    expect(component.plansMovil.length).toEqual(1);

    spyOn(dialog,'open').and.callThrough();
    component.showForm(1,2955);
    expect(dialog.open).toHaveBeenCalled();

    component.showEditarPlan(null,2955);
    expect(dialog.open).toHaveBeenCalled();
    const result = {
      "result":true
    }
    component.responseAfterClosedEmbEdit(result);
    component.mostrarDetalles();
    expect(component.mostrarInformacionPlanes).toEqual(false);

    
  }))
});
