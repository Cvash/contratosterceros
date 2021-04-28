import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { IMainUser, IViewModule } from '../../../../../../app/business/models/IModel-module';
import Swal from 'sweetalert2';
import { mockSwal } from '../../../office/terceros/components/modal-add-manager-supplier/modal-add-manager-supplier.component.spec';
import { RequestCronicasDto, RequestFamilyDto } from '../../models/request-corona-form';
import { CoronavirusHomeComponent } from './coronavirus-home.component';

export class mockDialogRelationship{
  open(){
    return {
      afterClosed:()=>of({
        response:[{
          id:12,
          status:true,
          name:"joao josue",
          last_name_1:"hernandez",
          last_name_2:"godoy",
          id_request:1,
          id_relationship:2,
          name_relationship:"joao josue hernandez godoy",
          other_relationship:"fads",
          id_family_condition_1:1,
          id_family_condition_2:1,
          id_family_condition_3:0,
          id_family_condition_4:0,
          comment:"asdasd",
          action:null
        }]
      })
    }
  }
}

describe('CoronavirusHomeComponent', () => {
  let component: CoronavirusHomeComponent;
  let fixture: ComponentFixture<CoronavirusHomeComponent>;
  const mockRouter= {
    navigate:jasmine.createSpy("navigate")
  }
  let router:Router;
  let user:IMainUser;
  const dialogRefRelationshipMock = {
    close: ()=>{} ,
    afterClosed: ()=>{}
  }
  let dialog:MatDialog;
  let moduleList: Array<IViewModule>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusHomeComponent ],
      imports:[RouterTestingModule,HttpClientTestingModule],
      providers:[
        DatePipe,
        { 
          provide:MatDialogRef,
          useValue:dialogRefRelationshipMock
        },
        {
          provide:MatDialog,
          useClass:mockDialogRelationship
        },
        {
          provide:Swal,
          useClass:mockSwal
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CoronavirusHomeComponent);
    component = fixture.componentInstance;
    router=TestBed.inject(Router);
    dialog=TestBed.inject(MatDialog);
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
    localStorage.removeItem("user");
    localStorage.removeItem("modules");
  }))
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('unit test 1',()=>{

    

  })
  it('when execute script method from component',fakeAsync(()=>{ 
    // init variable
    expect(component.user).toEqual(null);
    expect(component.conditionLegalEntity).toEqual(false);
    expect(component.levelAccess).toEqual(1);
    expect(component.legalEntity).toEqual(null);
    expect(component.filenameazure).toMatch("");
    expect(component.documentId).toEqual(0);

    expect(component.flagValidation).toEqual(0);
    expect(component.select.length).toEqual(0);

    expect(component.conditionShowTable).toEqual(false);
    expect(component.conditionUploadDocument).toEqual(false);
    expect(component.conditionEnfermedadesCardiovasculares).toEqual(false);
    expect(component.conditionEnfermedadesInmunosupresion).toEqual(false);
    expect(component.conditionEnfermedadesPulmonares).toEqual(false);
    expect(component.btnfileCondition).toBeUndefined();
    expect(component.blockUI).not.toBeUndefined();
    expect(component.txtPreRegister).toEqual(0);
    expect(component.arrayFamilyRelationship.length).toEqual(0);
    expect(component.arrayCoronaRelationshipValue.length).toEqual(0);
    expect(component.arrayAuxRequestCondition.length).toEqual(0);
    expect(component.arrayConditionActiveHtml.length).toEqual(0);
    expect(component.arrayCronica.length).toEqual(0);
    expect(component.backgroundColor).toMatch("");

    expect(component.filteredMotivo).not.toBeUndefined();
    expect(component.txtConditionStatus).toEqual(false);
    expect(component.conditionGeneral).toEqual(false);

    expect(component.employeeId).toBeUndefined();
    expect(component.arrayCoronaTransport.length).toEqual(0);
    expect(component.arrayCoronaReason.length).toEqual(0);
    expect(component.arrayCoronaStatus.length).toEqual(0);
    expect(component.arrayCoronaType.length).toEqual(0);
    expect(component.arrayCoronaCountry.length).toEqual(0);
    expect(component.arrayCoronaPrecondition.length).toEqual(0);
    expect(component.arrayCoronaRelationship.length).toEqual(0);
    expect(component.arrayCoronaEdit.length).toEqual(0);
    expect(component.arrayCoronaGroup.length).toEqual(0);
    expect(component.arrayCoronaNotGroup.length).toEqual(0);
    expect(component.arrayCoronaGeneral.length).toEqual(0);
    expect(component.arrayCoronaOther.length).toEqual(0);
    expect(component.coronaDocument).toEqual(null);

    expect(component.returnUrl).toMatch("");
    expect(component.codeSelect.length).toEqual(0);
    
    // data is not null
    spyOn(component,'getDataFormCoronavirus');
    spyOn(component,'getDataForEditAdmin');
    const response2= { 
      id:"3027",
      flag:1,
      levelAccess:3
    }
    component.data=response2;
    component.ngOnInit();   
    component.levelAccess=1; 
    fixture.detectChanges();
    tick(2000);
    const responseFormCoronavirus = { 
      status:true,
      array_r:[{
        id:1,
        name:"f"
      },
      {
        id:2,
        name:"d"
      }  ],
      array:[{
        id:1,name:"a"
      },{id:2,name:"b"}],
      array_t:[{
        id:1,
        name:"ok"
      },
      {
        id:2,
        name:"ok"
      }],
      array_c:[
        {
          id:1,
          name:"TY"
        }
      ],
      array_relationship:[{
        id:1,
        name:"sd",
        
      }],
      condition_legalEntity:[{
        id:1,
        accessLevel:1,
        flag:true
      }],
      array_tp:[{
        id:1,name:"as"
      }],
      employee_ssff:{
        cip:"55587889",
        name:"joao josue",
        last_name_1:"Hernandez",
        last_name_2:"Godoy",
        gender:"Masculino"
      },
      corona_document:{
        id_doc:1,
        id_cor_doc:2,
        id_emp:"3027",
        name:"dadasda_fafdsfd.pdf"
      },
      corona_chronic:[
        {
          group:"Generico",
          group_detail:[{
            status: true,
            id: 1,
            description:"Toz",
            name: "Toz",
            coronagroup: 3,
            updated_at: null,
            created_at: null
          }]
        },
        {
          group:"No Generico",
          group_detail:[{
            status: true,
            id: 2,
            description:"Coronavirus",
            name: "Coronavirus",
            coronagroup: 4,
            updated_at: null,
            created_at: null
          }]
        }
      ]

    }

    let responseGetDataForEdit=[{
      id_request:1,
      comment:"HOLA",
      date_reason:"2020-03-03",
      date_type:"2020-03-03",
      phone:"959598789",
      address:"Av venezuela 12342",
      mail:"josue180610@hotmail.comment",
      id_reason:1,
      status_det:1,
      id_type:1,
      country:1,
      precondition_1:0,
      precondition_2:0,
      precondition_3:0,
      precondition_4:0,
      precondition_5:0,
      precondition_6:0,
      precondition_7:0,
      precondition_8:0,
      precondition_9:0,
      precondition_10:0,
      precondition_11:0,
      precondition_12:0,
      other_factor:"No",
      array_cronica:[{
        id_corona_condition_detail:14,
        status:true
      },
      {
        id_corona_condition_detail:15,
        status:true
      },
      {
        id_corona_condition_detail:16,
        status:true
      }],
      height:"175",
      weight:"90",
      imc:"28.8",
      transport:5,
      array_family:[{
        id:1,
        status:true,
        name:"joao josue",
        last_name_1:"hernandez",
        last_name_2:"godoy",
        id_request:1,
        id_relationship:2,
        name_relationship:"Hijo",
        other_relationship:"",
        id_family_condition_1:1,
        id_family_condition_2:1,
        id_family_condition_3:0,
        id_family_condition_4:0,
        comment:"",
        action:null
      }]
    }]
    component.getDataFormCoronavirus("3027");
    component.responseGetDataFormCoronavirus(responseFormCoronavirus,"3027");
    component.getDataForEditAdmin("3027");
    component.responseGetDataForEdit(responseGetDataForEdit);
    expect(component.coronaForm.requestId.value).toEqual(1);
    expect(component.coronaForm.comment.value).toMatch("HOLA");
    flush();
    
    // second case
    responseGetDataForEdit=[{
      id_request:1,
      comment:null,
      date_reason:null,
      date_type:null,
      phone:null,
      address:null,
      mail:null,
      id_reason:1,
      status_det:1,
      id_type:1,
      country:1,
      precondition_1:1,
      precondition_2:1,
      precondition_3:1,
      precondition_4:1,
      precondition_5:1,
      precondition_6:1,
      precondition_7:1,
      precondition_8:1,
      precondition_9:1,
      precondition_10:1,
      precondition_11:1,
      precondition_12:1,
      other_factor:null,
      array_cronica:[{
        id_corona_condition_detail:14,
        status:true
      },
      {
        id_corona_condition_detail:15,
        status:true
      },
      {
        id_corona_condition_detail:16,
        status:true
      }],
      height:"",
      weight:"",
      imc:"",
      transport:null,
      array_family:[{
        id:1,
        status:true,
        name:"joao josue",
        last_name_1:"hernandez",
        last_name_2:"godoy",
        id_request:1,
        id_relationship:2,
        name_relationship:"Hijo",
        other_relationship:"",
        id_family_condition_1:1,
        id_family_condition_2:1,
        id_family_condition_3:0,
        id_family_condition_4:0,
        comment:"",
        action:null
      }]
    }]
    component.getDataFormCoronavirus("3027");
    component.responseGetDataFormCoronavirus(responseFormCoronavirus,"3027");
    component.getDataForEditAdmin("3027");
    component.responseGetDataForEdit(responseGetDataForEdit);
    expect(component.coronaForm.requestId.value).toEqual(1);
    expect(component.coronaForm.comment.value).toMatch("");
    flush();

    // remove items
    component.removeById(1);
    tick(1000);
    expect(component.coronaForm.chk10.value).toEqual(1);
    expect(component.conditionShowTable).toEqual(false);
    expect(component.arrayCoronaRelationship.length).toEqual(1)
    
    component.validateSizeRemoveId(-1);
    expect(component.conditionShowTable).toEqual(false);
    expect(component.coronaForm.chk10.value).toEqual(0);
    flush();
    spyOn(Swal,'fire');
    // savePOstCoronaRequest
    component.savePostCoronaRequest(1);
    // negative case
    component.coronaForm.chk10.setValue(1)
    component.coronaForm.transportId.setValue(0);
    component.arrayCoronaRelationshipValue=[];
    component.coronaForm.height.setValue(40);
    component.coronaForm.weight.setValue(2000);
    component.coronaForm.imc.setValue(0)
    component.savePostCoronaRequest(0)
    tick(1000);
    expect(Swal.fire).toHaveBeenCalled();
    flush();
    // positive case
    component.coronaForm.transportId.setValue(5);
    component.coronaForm.chk10.setValue(0);
    component.arrayCoronaRelationshipValue=[];
    component.coronaForm.height.setValue(170);
    component.coronaForm.weight.setValue(70);
    component.coronaForm.imc.setValue(24.22);
    component.savePostCoronaRequest(24.22);
    tick(1000);
    expect(Swal.fire).toHaveBeenCalled();
    flush();

    let responseSave={
      rpt:1,
      message:"success"
    }
    component.responseSavePostRequest(responseSave);
    tick(1000);
    expect(component.arrayAuxRequestCondition.length).toEqual(0);
    expect(Swal.fire).toHaveBeenCalled();
    flush();

    responseSave={
      rpt:0,
      message:"error"
    }
    component.responseSavePostRequest(responseSave);
    expect(Swal.fire).toHaveBeenCalled();
    flush();
    // remove access
    spyOn(component,'removeAccess');
    
    let value={ 
      condition:true,
      message:"success"
    }
    component.removeAccess()
    component.responseRemoveAcces(value);
    expect(Swal.fire).toHaveBeenCalled();

    value={
      condition:false,
      message:"error"
    }
    component.responseRemoveAcces(value);
    expect(Swal.fire).toHaveBeenCalled();
  }))
  it('when execute second case showOrHideUpload',fakeAsync(()=>{
    const exampleArray:Array<any> = [];
    component.showOrHideUpload(exampleArray);
    tick(1000);
    expect(component.conditionUploadDocument).toEqual(false);
    flush();
  
  }))
  it('when execute uploadFileHome',fakeAsync(()=>{
    const value= {
      target: {
          files: [new Blob(['ssdfsdgdjghdslkjghdjg'], { type: 'pdf' })]
      }
  }
  spyOn(component,'uploadFileHome').and.callThrough();
  spyOn(component,'saveCoronaDocument');
  component.user=user;
  tick(1000)
  component.uploadFileHome(value);
  expect(component.uploadFileHome).toHaveBeenCalled();
  flush();

  // repsonseCoronaDocument
  spyOn(Swal,'fire');
  let responseCoronaDoc={
    condition:true,
    message:"success"
  }
  component.responseCoronaDocument(responseCoronaDoc);
  expect(Swal.fire).toHaveBeenCalled();
  flush();
  responseCoronaDoc={ 
    condition:false,
    message:"error" 
   }
  component.responseCoronaDocument(responseCoronaDoc);
  expect(Swal.fire).toHaveBeenCalled();
  flush();

  /* spyOn(component,'getFileAttach').and.callThrough();
  component.filenameazure="20200331_140014_1977.pdf";
  tick(1000);
  component.getFileAttach();
  expect(component.getFileAttach).toHaveBeenCalled(); */
}))

it('when execute random script',fakeAsync(()=>{
  let text="Generico";
  expect(component.textValidate(text)).toMatch("");
  text="HOLA";
  expect(component.textValidate(text)).toMatch("HOLA");

  spyOn(router,'navigateByUrl');
  component.returnCoronaForm();
  expect(router.navigateByUrl)
}))

it('when execute registerCoronaRequest',fakeAsync(()=>{
  component.user=user;
  tick(100);
  const arrayAuxRequestCondition: Array<RequestCronicasDto> =[
    {
      id_employee: 3027,
      id_cor_con_det: 14,
      other_cor_det: "hola",
      created_by: "2020-02-02",
      updated_by: "2020-02-02"
    },
    {
      id_employee: 3027,
      id_cor_con_det: 15,
      other_cor_det: "hola",
      created_by: "2020-02-02",
      updated_by: "2020-02-02"
    },
    {
      id_employee: 3027,
      id_cor_con_det: 16,
      other_cor_det: "hola",
      created_by: "2020-02-02",
      updated_by: "2020-02-02"
    }
  ]
  flush();
  const arrayCoronaRelationshipValue: Array<RequestFamilyDto> = []
    spyOn(Swal,'fire');
    component.data=null;
    component.coronaForm.requestId.setValue(0);
    component.coronaForm.telef.setValue("");
    component.coronaForm.address.setValue("");
    component.conditionEnfermedadesCardiovasculares=true;
    component.conditionEnfermedadesInmunosupresion=true;
    component.conditionEnfermedadesPulmonares=true;
    component.coronaForm.pulmonaresCronicasSick.setValue("");
    component.coronaForm.cardiovascularesSick.setValue("");
    component.coronaForm.inmunosupresionSick.setValue("");
    component.coronaForm.chk11.setValue(true);
    component.coronaForm.otherFactor.setValue("");
    tick(100);
    component.registerCoronaRequest(arrayAuxRequestCondition,
    arrayCoronaRelationshipValue,null);
    flush();

    
}))

it('when execute other script method',fakeAsync(()=>{
  spyOn(component.dialogRef,'close');
  component.onCloseCoronaForm()
  expect(component.dialogRef.close).toHaveBeenCalled();

  const cip="85222665";
  let type="up";
  component.clickMove(cip,type);
  expect(component.coronaForm.cip.value).toContain("222");

  type="down";
  component.clickMove(cip,type);
  expect(component.coronaForm.cip.value).toEqual(null);

  const requestFamily={ 
    id:12,
    status:true,
    name:"joao josue",
    last_name_1:"hernandez",
    last_name_2:"godoy",
    id_request:1,
    id_relationship:2,
    name_relationship:"joao josue hernandez godoy",
    other_relationship:"fads",
    id_family_condition_1:1,
    id_family_condition_2:1,
    id_family_condition_3:0,
    id_family_condition_4:0,
    comment:"asdasd",
    action:null
  }
  const arrayCoronaRelationshipValue : Array<RequestFamilyDto> = [];
  arrayCoronaRelationshipValue.push(requestFamily);
  component.arrayCoronaRelationshipValue=arrayCoronaRelationshipValue;
  tick(1000);
  component.addFamilyRelationship();
  expect(component.conditionShowTable).toEqual(true);
  flush();
  component.arrayCoronaRelationshipValue=[];
  tick(1000);
  component.addFamilyRelationship();
  expect(component.conditionShowTable).toEqual(false);

  // case 14
  component.disabledEnabledCondition(14,false);
  expect(component.conditionEnfermedadesInmunosupresion).toEqual(false);
  expect(component.coronaForm.inmunosupresionSick.value).toMatch("");

  // case 15
  component.disabledEnabledCondition(15,false);
  expect(component.conditionEnfermedadesCardiovasculares).toEqual(false);
  expect(component.coronaForm.cardiovascularesSick.value).toMatch("");

  // case 16
  component.disabledEnabledCondition(16,false);
  expect(component.conditionEnfermedadesPulmonares).toEqual(false);
  expect(component.coronaForm.pulmonaresCronicasSick.value).toMatch("");

  component.user=user;
  tick(1000);

  let event={
    isUserInput:true,
    source:{
      value:1,selected:true
    }
  }
  flush();
  component.getValues(event);

  event={
    isUserInput:true,
    source:{
      value:1,selected:false
    }
  }
  component.getValues(event);

  // showModalRelationship
  // case param 1
  spyOn(dialog,'open').and.callThrough();
  component.coronaForm.chk10.setValue(1);
  tick(1000);
  component.showModalRelationship(1);
  flush();
  expect(dialog.open).toHaveBeenCalled();
  // case param 2
  component.coronaForm.chk10.setValue(0);
  tick(1000);
  component.showModalRelationship(2);
  flush();
  expect(dialog.open).toHaveBeenCalled();

  // calculateImc
  component.coronaForm.weight.setValue(0);
  component.coronaForm.height.setValue(170);
  tick(1000);
  component.caculateImc();
  flush();
  expect(component.coronaForm.imc.value).toEqual(0);

  component.coronaForm.weight.setValue(80);
  component.coronaForm.height.setValue(170);
  tick(1000);
  component.caculateImc();
  flush();
  expect(component.coronaForm.imc.value).toBeGreaterThanOrEqual(10);
}))

});
