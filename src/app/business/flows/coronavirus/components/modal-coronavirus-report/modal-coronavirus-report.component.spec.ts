import { HttpEventType } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMainUser } from '../../../../../../app/business/models/IModel-module';
import Swal from 'sweetalert2';
import { mockSwal } from '../../../office/terceros/components/mypass/mypass.component.spec';
import { CoronavirusAdminService } from '../../services/coronavirus-admin.service';
import { ModalCoronavirusReportComponent } from './modal-coronavirus-report.component';

describe('ModalCoronavirusReportComponent', () => {
  let component: ModalCoronavirusReportComponent;
  let fixture: ComponentFixture<ModalCoronavirusReportComponent>;
  let service: CoronavirusAdminService;
  const dialogMock = {
		close: () => { },
    };
  let user:IMainUser;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCoronavirusReportComponent ] , 
      imports:[HttpClientTestingModule],
      providers:[
        {
          provide:Swal,
          useClass:mockSwal
        },
        CoronavirusAdminService,
        {
          provide:MatDialogRef,
          useValue:dialogMock
        },
        {
          provide:MAT_DIALOG_DATA,
          useValue:{}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalCoronavirusReportComponent);
    component = fixture.componentInstance;
    service=TestBed.inject(CoronavirusAdminService);
    user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
    localStorage.setItem("user",JSON.stringify(user))
  }));
  afterEach(async(()=>{
    localStorage.removeItem("user");
  }))
  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.user).toEqual(null);
    expect(component.showSurvey).toEqual(false);
    expect(component.arraySurvey.length).toEqual(0);
    expect(component.arrayReservation.length).toEqual(0);
    expect(component.arrayPermissions.length).toEqual(0);
    expect(component.arrayIdRole.length).toEqual(0);

    expect(component.blockUI).not.toBeUndefined();
    expect(component.conditionReportAssist).toEqual(false);


  });

  it('when execute script report method',fakeAsync(()=>{
    spyOn(component.dialogRef,'close');
    component.onNoClickReport();
    expect(component.dialogRef.close).toHaveBeenCalled();

    spyOn(component,'surveyReport');
    component.surveyReport();
    service.surveyReportAsync("3027","5").subscribe((rpt1:HttpEventType)=>{
      component.responseSurveyReport(rpt1);
    })

    spyOn(component,'reservationReport');
    component.reservationReport();
    service.reservationReportAsync("3027","6").subscribe((rpt1:HttpEventType)=>{
      component.responseReservationReport(rpt1);
    })

    spyOn(component,'generalReport');
    component.generalReport(["12","13"],"3027");
    service.generalReportAsync(["12","13"],"3027").subscribe((rpt1:HttpEventType)=>{
      component.responseGeneralReport(rpt1);
    })
    
    spyOn(component,'bpReport');
    component.bpReport("3027");
    service.reportBp("3027").subscribe((rpt1:Blob)=>{
      component.responseReport(rpt1,"REPORTE DE BP.xlsx");
    })

    spyOn(component,'requestDetailsReport');
    component.requestDetailsReport(["12","13"],"2955");
    service.requestDetailReport(["12","13"],"2955").subscribe((rpt1:HttpEventType)=>{
      component.responseRequestDetailsReport(rpt1);
    })

    spyOn(component,'assistReport');
    component.assistReport(["12","13"],"2955");
    service.assistReportEmployee(["12","13"],"2955").subscribe((rpt1:Blob)=>{
      component.responseReport(rpt1,"REPORTE DE ASISTENCIAS.xlsx");
    })

    spyOn(component,'cronicaReport');
    component.cronicaReport(["12","13"],"2955");
    service.cronicaReport(["12","13"],"2955").subscribe((rpt1 : Blob)=>{
      component.responseReport(rpt1,"REPORTE DE ENFERMEDADES CRONICAS POR EMPLEADOS.xlsx");
    })

    spyOn(component,'fileReport');
    component.fileReport(["12","13"]);
    service.fileReportEmployee(["12","32"]).subscribe( (rpt1 : Blob)=>{
      component.responseReport(rpt1,"REPORTE DE ARCHIVOS DE EMPLEADOS.zip");
    })
    spyOn(Swal,'fire');
    component.user=user;
    tick(1000);
    component.reportFormReactive.index.setValue("1C");
    tick(1000);
    component.Execute_report();
    flush();

    component.reportFormReactive.index.setValue("2C");
    tick(1000);
    component.Execute_report();
    flush();

    component.reportFormReactive.index.setValue("3C");
    tick(1000);
    component.Execute_report();
    flush();

    component.reportFormReactive.index.setValue("4C");
    tick(1000);
    component.Execute_report();
    flush();

    component.reportFormReactive.index.setValue("5C");
    tick(1000);
    component.Execute_report();
    flush();

    component.reportFormReactive.index.setValue("6C");
    component.reportFormReactive.surveyId.setValue(0);
    tick(1000);
    component.Execute_report();
    expect(Swal.fire).toHaveBeenCalled();
    flush();

    component.reportFormReactive.index.setValue("7C");
    component.reportFormReactive.reservaId.setValue(0);
    tick(1000);
    component.Execute_report();
    expect(Swal.fire).toHaveBeenCalled();
    flush();

    component.reportFormReactive.index.setValue("1A");
    tick(1000);
    component.Execute_report();
    flush();
  }))
});
