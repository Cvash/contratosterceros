import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IMainUser, IViewModule } from '../../../../../../business/models/IModel-module';

import { SupplierHomeComponent } from './supplier-home.component';

describe('SupplierHomeComponent', () => {
  let component: SupplierHomeComponent;
  let fixture: ComponentFixture<SupplierHomeComponent>;
  let moduleList: Array<IViewModule>=[];
  let mockRouter = { 
    navigate : jasmine.createSpy("navigate")
  }
  let router:Router;
  let user:IMainUser;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierHomeComponent ],
      imports:[ 
        RouterTestingModule
      ],
      providers:[
        HttpClient,HttpHandler,
        {
          provide:Router,
          useValue:mockRouter
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierHomeComponent);
    component = fixture.componentInstance;
    router=TestBed.inject(Router);
    user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
    localStorage.setItem("user",JSON.stringify(user));
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
  });
  afterEach(()=>{ 
    localStorage.removeItem("modules");
    localStorage.removeItem("user");
  })
  it('should create', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
  });

  it('when execute activePass',fakeAsync(()=>{
    component.activePass();
    expect(router.navigate).toHaveBeenCalled();
  }))

  it('when execute generatePass',fakeAsync(()=>{
    component.generatePass();
    expect(router.navigate).toHaveBeenCalled();
  }))

  it('when execute activePass',fakeAsync(()=>{
    component.symptoms();
    expect(router.navigate).toHaveBeenCalled();
  }))
});
