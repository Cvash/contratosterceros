import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { mockSwal } from 'src/app/business/flows/office/terceros/components/mypass/mypass.component.spec';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MockDialog } from 'src/app/business/flows/office/terceros/components/supplier-qr/supplier-qr/supplier-qr.component.spec';
import { IMainUser } from 'src/app/business/models/IModel-module';
import { MovilComponent } from './movil.component';

describe('MovilComponent', () => {
  let component: MovilComponent;
  let fixture: ComponentFixture<MovilComponent>;
  let user:IMainUser;
  let dialog:MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovilComponent ],
      imports : [MatDialogModule],
      providers:[
        HttpClient,
        HttpHandler,
        FormBuilder,
        {
          provide:MatDialog,
          useClass:MockDialog
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovilComponent);
    component = fixture.componentInstance;
    dialog=TestBed.inject(MatDialog);
    });
  afterEach(() => {
    localStorage.clear();
  });
  beforeEach(()=>{ 
    user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
    localStorage.setItem("user",JSON.stringify(user))
  });
  afterEach(()=>{ 
    localStorage.clear();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should create', () => {
    //  expect(component.plansMovistarTotal.length).toEqual(0);
    //  expect(component.plansHogar.length).toEqual(0);
    //  expect(component.plansMovil.length).toEqual(0);
     expect(component.plans.length).toEqual(0);
     expect(component.user).toBeUndefined();
     expect(component.mostrarInformacionPlanes).toEqual(true);
   });


   it('when execute script of movil', fakeAsync(()=>{
     component.ngOnInit();
     tick(1000);
     spyOn(component, 'traerPlanes');
     flush();

     const getPlans=[
      {
        id: 3,
        status: false,
        createdBy: 0,
        updatedBy: 0,
        createdAt: "2021-01-18T14:26:54",
        updatedAt: "2020-12-13T15:16:59",
        emb_price: "395",
        regular_price: "495",
        cant_mbps: "500",
        plan_type: "Pro",
        bono: "0",
        max_descarga: "500",
        max_subida: "250",
        modem: "WiFi 2.4 y 5 GHz",
        lineas_moviles: "13",
        tv: "108 canales SD + 64 canales HD",
        linea_fija: "Llamadas ilimitadas a fijos Movistar",
        gb_international: "Zona América y Europa",
        wsp_international: "Solo texto",
        id_emb_type: {
            id: 1,
            status: true,
            createdBy: 0,
            updatedBy: 0,
            createdAt: "2020-12-09T18:34:08",
            updatedAt: "2020-12-10T09:46:18",
            name: "Movistar Total"
        }
    }
      
     ]
     component.responseGetPlans(getPlans);
     flush();
     expect(component.plans.length).toEqual(1);
    //  expect(component.plansMovil.length).toEqual(0);
    //  expect(component.plansMovistarTotal.length).toEqual(0);
    //  expect(component.plansHogar.length).toEqual(0);




   }));
});
