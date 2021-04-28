import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { executionAsyncId } from 'async_hooks';
import { IMainUser, IViewModule } from 'src/app/business/models/IModel-module';
import { ISentDetail, ISents } from '../../models/responseMailing';
import { MockDialogMailinghome } from '../mailing-home/mailing-home.component.spec';

import { MailingStatusComponent } from './mailing-status.component';

describe('MailingStatusComponent', () => {
  let component: MailingStatusComponent;
  let fixture: ComponentFixture<MailingStatusComponent>;
  let dialog:MatDialog;
  let user: IMainUser;
  let moduleList: Array<IViewModule>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailingStatusComponent ],
      imports:[MatDialogModule, HttpClientTestingModule, RouterTestingModule],
      providers:[{
        provide:MatDialog,
        useClass:MockDialogMailinghome
      }]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MailingStatusComponent);
    component = fixture.componentInstance;
    user = { "id": "2955", "href": "/user/2955", "token": "abb4d410-b92d-4157-ad52-0b307be20e48", "pass": "sdasdasda", "relatedParty": { "id": "3027", "href": "/employee/3027", "name": "JOAO JOSUE / HERNANDEZ / GODOY", "email": "joao.hernandezgo@telefonica.com", "description": "Employee", "legalId": [{ "country": "49", "legalEntity": "0055", "nationalIDType": "DNI", "nationalID": "73078273" }] }, "role": [{ "id": "11", "href": "/role/7046", "description": "ELE2_USER" }, { "id": "17", "href": "/role/14482", "description": "CORONA_USER" }, { "id": "18", "href": "/role/20551", "description": "CORONA_READ_QR" }, { "id": "16", "href": "/role/21178", "description": "CORONA_ADMIN" }, { "id": "40", "href": "/role/21192", "description": "CORONA_ADMIN_VNZ" }, { "id": "26", "href": "/role/24370", "description": "TER_TDPMNG" }, { "id": "52", "href": "/role/24381", "description": "TER_ADMIN" }, { "id": "65", "href": "/role/28596", "description": "USER_CAM" }, { "id": "60", "href": "/role/28597", "description": "USER_TDP" }, { "id": "62", "href": "/role/42933", "description": "USER_PERU" }, { "id": "65", "href": "/role/42934", "description": "USER_CAM" }, { "id": "60", "href": "/role/42935", "description": "USER_TDP" }, { "id": "65", "href": "/role/59766", "description": "USER_CAM" }, { "id": "62", "href": "/role/59767", "description": "USER_PERU" }, { "id": "60", "href": "/role/59768", "description": "USER_TDP" }, { "id": "65", "href": "/role/76599", "description": "USER_CAM" }, { "id": "62", "href": "/role/76600", "description": "USER_PERU" }, { "id": "60", "href": "/role/76601", "description": "USER_TDP" }, { "id": "62", "href": "/role/91330", "description": "USER_PERU" }, { "id": "60", "href": "/role/91331", "description": "USER_TDP" }, { "id": "68", "href": "/role/99604", "description": "SURVEY_ADMIN" }, { "id": "68", "href": "/role/99605", "description": "SURVEY_ADMIN" }, { "id": "66", "href": "/role/99606", "description": "BEN_ADMIN" }] }
    localStorage.setItem("user", JSON.stringify(user))
    moduleList = [
      {
        action: "coronavirus$fa fa-user-md",
        description: "CORONAVIRUS",
        id: "7",
        platform: "Web Admin",
        manageableAsset: [
          {
            action: "R",
            endDate: null,
            entityType: "CORONA_HOME",
            href: "/coronavirus/home",
            id: "28",
            reference: null,
            startDate: "2020-10-21T18:11:35"
          },
          {
            action: "R",
            endDate: null,
            entityType: "CORONA_QR",
            href: "/coronavirus/admin",
            id: "33",
            reference: null,
            startDate: "2020-10-21T18:11:35"
          }
        ]
      }]
    localStorage.setItem("modules", JSON.stringify(moduleList));
    dialog = TestBed.inject(MatDialog);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.blockUI).toBeDefined();
    expect(component.flagLoadingData).toEqual(true);
    expect(component.DATA.length).toEqual(0);
    expect(component.displayedColumns.length).toEqual(7);
    expect(component.dataSource).not.toBeUndefined();
    expect(component.expandedElement).toBeUndefined();
    expect(component.flagShow).toEqual(true);
    expect(component.detalle.length).toEqual(0);
    expect(component.moduleList.length).toEqual(0);
    expect(component.user).toEqual(null);
    expect(component.paginator).toBeUndefined();


  });

  it('when execute script methods mailing status', fakeAsync(()=>{
    spyOn(dialog,'open');
    spyOn(component.auth,'executeValidateSession');
    component.ngOnInit();
    expect(component.moduleList.length).toBeGreaterThanOrEqual(1);
    expect(component.user).not.toEqual(null);

    component.ngAfterViewInit();
    // responseLoadDataMails
    const resp={
      "condition":true,
      "sents":[{
        created_at: "2021-01-12T13:17:48",
        fails: 0,
        id: 918,
        id_status: 3,
        id_template: 0,
        sent_by: "HR.DATA@TELEFONICA.COM",
        status: true,
        success: 3,
        total: 3
      },
      {
        created_at: "2020-09-01T17:06:13",
        fails: 0,
        id: 789,
        id_status: 3,
        id_template: 0,
        sent_by: "alexandra.delafuente@telefonica.com",
        status: true,
        success: 2,
        total: 2
      }
    ]
    }

    component.responseLoadDataMails(resp);
    expect(component.flagLoadingData).toEqual(false);
    expect(component.DATA.length).toEqual(2);
    
    // showMailDetails
    let sentMail:ISentDetail;
    sentMail={
    id: 1,
    id_sent: 1, 
    correo:"joao.hernandezgo@telefonica.com",
    cc:"josue180610@hotmail.com",
    cco: "i201715100@cibertec.edu.pe",
    subject: "prueba ejemplo",
    body: "<p><b>HOLA MUNDO</b></p>",
    id_status: "2"
    };

    component.showMailDetails(sentMail);
    expect(dialog.open).toHaveBeenCalled();

    // expandElement
    let element:ISents;
    element = { 
    id:1,
    id_template:1,
    id_status:2,
    total:2,
    success:1,
    fails:5
    }
    component.expandElement(element);
    expect(component.expandedElement.id).toEqual(1);
    expect(component.expandedElement.id_status).toEqual(2);
    expect(component.flagShow).toEqual(false);

    component.validateExpandedElement(null,element);
    expect(component.detalle.length).toEqual(0);

    const respExpand= { 
      "details":[
        {
          body:"HOLA",
          cc: "",
          cco: "",
          correo: "ever.mitta@telefonica.com",
          created_at: "2021-01-13T11:36:26",
          created_by: 1,
          id: 37414,
          id_sent: 920,
          id_status: 3,
          subject: "Hola"
        }
      ]
    }
    component.responseExpandElement(respExpand);
    expect(component.detalle.length).toEqual(1);
    expect(component.flagShow).toEqual(true);

    expect(component.getStatusDetaill(1)).toContain("Pendiente");
    expect(component.getStatusDetaill(2)).toContain("Fallido");
    expect(component.getStatusDetaill(3)).toContain("Enviado");
    expect(component.getStatusDetaill(4)).toContain("Adjunto");
    expect(component.getStatusDetaill(5)).toContain("definido");

    expect(component.getStatusSent(1)).toContain("En proceso");
    expect(component.getStatusSent(2)).toContain("Enviado con");
    expect(component.getStatusSent(3)).toContain("Enviado correctamente");
    expect(component.getStatusSent(4)).toContain("No definido");

    // checkCurrentStatus
    spyOn(component,'checkCurrentStatus');
    component.checkCurrentStatus(1);

    // jsDate
    let result:string=component.jsDate("2021-01-01");
    expect(result).not.toEqual(null);
    result=component.jsDate(false);
    expect(result).toMatch("-");

    // applyFilter
    let spy=spyOn(component,'applyFilter').and.callThrough();
    const event:any={
      target:{
        value:"hola"
      }
    };
    component.applyFilter(event);
    expect(spy).toHaveBeenCalled();

  }))
});
