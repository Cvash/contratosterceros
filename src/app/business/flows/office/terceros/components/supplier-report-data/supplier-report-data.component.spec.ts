import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IMainUser, IViewModule } from '../../../../../../../app/business/models/IModel-module';
import Swal from 'sweetalert2';
import { ReportData } from '../../models/ResponseSupplier';
import { mockSwal } from '../modal-add-manager-supplier/modal-add-manager-supplier.component.spec';

import { SupplierReportDataComponent } from './supplier-report-data.component';

describe('SupplierReportDataComponent', () => {
  let component: SupplierReportDataComponent;
  let fixture: ComponentFixture<SupplierReportDataComponent>;
  let user:IMainUser;
  let responseSupplier:Array<ReportData>;
  let moduleList: Array<IViewModule>=[];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierReportDataComponent ],
      imports:[HttpClientTestingModule,RouterTestingModule],
      providers:[
        DatePipe,
        {
          provide:Swal,
          useValue:mockSwal
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierReportDataComponent);
    component = fixture.componentInstance;
    
  });
  beforeEach(()=>{ 
    user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
    localStorage.setItem("user",JSON.stringify(user))
    responseSupplier=[
      {
        dni:"44458898",
        name:"dadas",
        lastName1:"sdadasda",
        lastName2:"asda",
        serviceName:"GG",
        dateGenerate:"2020-10-10",
        userStatus:1,
        docMedic:"dadsad.pdf",
        qrStatus:"Access",
        qrHour:"15:46",
        personStatus:"Habilitado",
        reportHour:"08:05:03",
        personDoor:"SI",
        checking:"SI",
        hourIn:"15:47",
        tempIn:"37",
        hourOut:"22:30",
        tempOut:"35",
        countOut:1,
        countIn:1
      }
    ]
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
  })
  afterEach(()=>{ 
    localStorage.removeItem("user");
    localStorage.removeItem("modules");
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('when init variable',()=>{
    expect(component.companyId).toEqual(0);
    expect(component.nameCompany).toMatch("");
    expect(component.nameService).toMatch("");
    expect(component.filter).toMatch("");
    expect(component.arrayCompanyOptions.length).toEqual(0);
    expect(component.arrayCompanyServiceOptions.length).toEqual(0);
    expect(component.findCompanyServiceOptions.length).toEqual(0);
    expect(component.blockUI).not.toBeUndefined();
    expect(component.companyRuc).toMatch("5558745896520025");
    expect(component.displayedColumns.length).toBeGreaterThan(2);
    expect(component.dataSource).not.toBeUndefined();
    expect(component.arrayIdService.length).toEqual(0);
    expect(component.conditionAll).toEqual(0);
    expect(component.userId).toEqual(null);
    expect(component.user).toEqual(null);
    expect(component.startDate).toMatch("");
    expect(component.endDate).toMatch("");
  })

  it('when execute ngOnInit',fakeAsync(()=>{
    component.ngOnInit();
    spyOn(component,'loadDataOptions');
    expect(component.companyId).toEqual(null);
    const response = {
      condition:true,
      company:[ 
        {
          id:1,
          name:"XPRES",
          description:"XPRES"
        },
        {
          id:2,
          name:"XPRES2",
          description:"XPRES2"
        }
      ],
      services:[{
        id:1,
        name:"VENTA DE POLOS",
        description:"",
        id_company:1
      },
      {
       id:2,
       name:"VENTA DE PAPELES",
       description:"",
       id_company:2 
      }],
      permission:1
    }
    component.loadDataOptions("2955");
    component.responseLoadDataOptions(response);
    tick(1000);
    expect(component.arrayCompanyOptions.length).toEqual(2);
    expect(component.arrayCompanyServiceOptions.length).toEqual(2);
    expect(component.conditionAll).toEqual(1)
    flush();
    

    // part 2
    component.reportForm.serviceId.setValue(1);
    component.reportForm.companyId.setValue(1);
    tick(1000);
    component.responseLoadDataOptions(response);
    tick(1000);
    expect(component.findCompanyServiceOptions.length).toBeGreaterThan(0);
    flush();
 
    // getServiceName
    component.getServiceCompany();
    tick(1000);
    expect(component.arrayIdService.length).toEqual(1);
    flush();
  }))

  it('when execute validateDataReport',fakeAsync(()=>{
    spyOn(Swal,'fire');
    component.ngOnInit();
    tick(1000);
    let status=true;
    // user case
    status=component.validateDataReport(null,null,null,null,null,null);
    flush();
    expect(status).toEqual(false);
    // conditionAll case compantId 0
    status=component.validateDataReport(user,0,0,null,null,null);
    tick(1000);
    flush();
    expect(Swal.fire).toHaveBeenCalled();
    expect(status).toEqual(false);
    // conditionAll case serviceId 0
    status=component.validateDataReport(user,0,1,0,null,null);
    tick(1000);
    flush();
    expect(Swal.fire).toHaveBeenCalled();
    expect(status).toEqual(false);
    // conditionAll case 1
    status=component.validateDataReport(user,1,1,0,null,null);
    tick(1000);
    flush();
    expect(Swal.fire).toHaveBeenCalled();
    expect(status).toEqual(false);
    // startDate equals '' or endDate equals ''
    status=component.validateDataReport(user,1,2,2,"2020-02-02","");
    tick(1000);
    flush();
    expect(Swal.fire).toHaveBeenCalled();
    expect(status).toEqual(false);
    // startDate mayor a endDate
    status=component.validateDataReport(user,1,2,2,"2020-02-02","2020-01-01");
    tick(1000);
    flush();
    expect(Swal.fire).toHaveBeenCalled();
    expect(status).toEqual(false);

    // success case
    status=component.validateDataReport(user,1,2,2,"2020-02-02","2020-03-01");
    tick(1000);
    flush();
    expect(Swal.fire).toHaveBeenCalled();
    expect(status).toEqual(true);
  }))
  it('when execute ngAfterViewInit',fakeAsync(()=>{
    spyOn(component.auth,'executeValidateSession');
    component.ngAfterViewInit();
  }))
  it('when execure responseLoadDataOptions erros',fakeAsync(()=>{
    spyOn(Swal,'fire');
    const response={
      condition:false,
      errors:"bad request"
    }
    component.responseLoadDataOptions(response);
    expect(Swal.fire).toHaveBeenCalled();
    
  }))

  it('when execute addDataSource',()=>{
    const response={
      reportData:responseSupplier
    }
    component.addDataSource(response);
    expect(component.arrayReportGeneral.length).toEqual(1);
  })
  it('when execute addDataSource size 0',fakeAsync(()=>{
    spyOn(Swal,'fire')
    const response={
      reportData:[]
    }
    component.addDataSource(response);
    
    expect(component.arrayReportGeneral.length).toEqual(0);
    expect(Swal.fire).toHaveBeenCalled();
  }))
  it("when execute ngOnInit",()=>{ 
    spyOn(component,'loadDataOptions');
    component.ngOnInit();
  })

  it('when execute applyFilter',fakeAsync(()=>{ 
    let spy=spyOn(component,'applyFilter').and.callThrough();
    const event:any={
      target:{
        value:"hola"
      }
    };
    component.applyFilter(event);
    tick(3000);
    expect(spy).toHaveBeenCalled();
  }))

});
