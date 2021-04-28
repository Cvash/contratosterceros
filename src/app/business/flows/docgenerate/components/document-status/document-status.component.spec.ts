import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IMainUser, IViewModule } from 'src/app/business/models/IModel-module';
import Swal from 'sweetalert2';
import { mockSwal } from '../../../office/terceros/components/mypass/mypass.component.spec';

import { DocumentStatusComponent } from './document-status.component';

describe('DocumentStatusComponent', () => {
  let component: DocumentStatusComponent;
  let fixture: ComponentFixture<DocumentStatusComponent>;
  let user:IMainUser;
  let moduleList: Array<IViewModule>=[];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentStatusComponent ],
      imports:[HttpClientTestingModule, RouterTestingModule],
      providers:[{
        provide:Swal,
        useClass:mockSwal
      }]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DocumentStatusComponent);
    component = fixture.componentInstance;
    user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
    localStorage.setItem("user",JSON.stringify(user))
    moduleList=[
      {
      action: "coronavirus$fa fa-user-md",
      description: "CORONAVIRUS",
      id: "7",
      platform:"Web Admin",
      manageableAsset:[
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
    localStorage.setItem("modules",JSON.stringify(moduleList));
  }));
  afterEach(async(()=>{
    localStorage.clear();
  }))
  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.flagLoadingData).toEqual(true);
    expect(component.lstDocumentStatus.length).toEqual(0);
    expect(component.displayedColumns.length).toEqual(7);
    expect(component.dataSource).toBeDefined();

  });

  it('when execute script all methods',fakeAsync(()=>{
    spyOn(component,'chargedListStatus');
    component.chargedListStatus();
    let rpt={
      "data":[{
        id:1,
        id_status:3,
        total:3,
        success:3,
        fails:0
      }]
    }
    // responseChargedList
    component.responseChargedList(rpt);
    expect(component.flagLoadingData).toEqual(false);
    expect(component.lstDocumentStatus.length).toEqual(1);
    // downloadfiles
    spyOn(Swal,'fire');
    spyOn(component,'downloadfiles').and.callThrough();
    component.downloadfiles("attach_405.pdf");
    expect(Swal.fire).toHaveBeenCalled();

    // jsDateDocument
    expect(component.jsDateDocument(false)).toMatch("-");
    expect(component.jsDateDocument("2021-01-19")).toContain("01-2021");

    // getStatusDoc
    expect(component.getStatusDoc(1)).toContain("En proceso");
    expect(component.getStatusDoc(2)).toContain("Fallido");
    expect(component.getStatusDoc(3)).toContain("Finalizado");
    expect(component.getStatusDoc(0)).toContain("No definido");

    // applyFilterStatus
    let spy=spyOn(component,'applyFilterStatus').and.callThrough();
    const event:any={
      target:{
        value:"hola"
      }
    };
    component.applyFilterStatus(event);
    expect(spy).toHaveBeenCalled();


  }))

});
