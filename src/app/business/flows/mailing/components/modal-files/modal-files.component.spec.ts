import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IMainUser } from 'src/app/business/models/IModel-module';
import { MockDialog } from '../../../office/terceros/components/supplier-qr/supplier-qr/supplier-qr.component.spec';
import { MockDialogMailinghome } from '../mailing-home/mailing-home.component.spec';

import { ModalFilesComponent } from './modal-files.component';

describe('ModalFilesComponent', () => {
  let component: ModalFilesComponent;
  let fixture: ComponentFixture<ModalFilesComponent>;
  let user:IMainUser;
  let dialog:MatDialog;
  const dialogMock = {
		close: () => { },
    };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFilesComponent ],
      imports: [HttpClientTestingModule],
      providers:[{
        provide:MatDialogRef,
        useValue:dialogMock
      } ,
        {
          provide:MatDialog,
          useClass:MockDialogMailinghome
        }]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalFilesComponent);
    component = fixture.componentInstance;
    user = { "id": "2955", "href": "/user/2955", "token": "abb4d410-b92d-4157-ad52-0b307be20e48", "pass": "sdasdasda", "relatedParty": { "id": "3027", "href": "/employee/3027", "name": "JOAO JOSUE / HERNANDEZ / GODOY", "email": "joao.hernandezgo@telefonica.com", "description": "Employee", "legalId": [{ "country": "49", "legalEntity": "0055", "nationalIDType": "DNI", "nationalID": "73078273" }] }, "role": [{ "id": "11", "href": "/role/7046", "description": "ELE2_USER" }, { "id": "17", "href": "/role/14482", "description": "CORONA_USER" }, { "id": "18", "href": "/role/20551", "description": "CORONA_READ_QR" }, { "id": "16", "href": "/role/21178", "description": "CORONA_ADMIN" }, { "id": "40", "href": "/role/21192", "description": "CORONA_ADMIN_VNZ" }, { "id": "26", "href": "/role/24370", "description": "TER_TDPMNG" }, { "id": "52", "href": "/role/24381", "description": "TER_ADMIN" }, { "id": "65", "href": "/role/28596", "description": "USER_CAM" }, { "id": "60", "href": "/role/28597", "description": "USER_TDP" }, { "id": "62", "href": "/role/42933", "description": "USER_PERU" }, { "id": "65", "href": "/role/42934", "description": "USER_CAM" }, { "id": "60", "href": "/role/42935", "description": "USER_TDP" }, { "id": "65", "href": "/role/59766", "description": "USER_CAM" }, { "id": "62", "href": "/role/59767", "description": "USER_PERU" }, { "id": "60", "href": "/role/59768", "description": "USER_TDP" }, { "id": "65", "href": "/role/76599", "description": "USER_CAM" }, { "id": "62", "href": "/role/76600", "description": "USER_PERU" }, { "id": "60", "href": "/role/76601", "description": "USER_TDP" }, { "id": "62", "href": "/role/91330", "description": "USER_PERU" }, { "id": "60", "href": "/role/91331", "description": "USER_TDP" }, { "id": "68", "href": "/role/99604", "description": "SURVEY_ADMIN" }, { "id": "68", "href": "/role/99605", "description": "SURVEY_ADMIN" }, { "id": "66", "href": "/role/99606", "description": "BEN_ADMIN" }] }
    localStorage.setItem("user", JSON.stringify(user))
    dialog=TestBed.inject(MatDialog);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.inputAttachFile).toBeUndefined();
    expect(component.atachedFiles.length).toEqual(0);
    expect(component.idAutoincrement).toEqual(0);
    expect(component.loading).toEqual(true);
    expect(component.user).toEqual(null);
    expect(component.base64File).toEqual(null);
    
  });
  it('when execute scripts method modal files',fakeAsync(()=>{
    spyOn(dialog,'open');
    spyOn(component.dialogRef,'close');
    // ngOnInit
    component.ngOnInit();
    // closeModal
    component.closeModal();
    expect(component.dialogRef.close).toHaveBeenCalled();
    
    let responseInit={ 
      "status":true,
      "lista":[ {
        azurename: "attach_3579.png",
        id: 3579,
        id_session: 37352,
        id_status: 2,
        name: "sonar.png"
      }]
    }
    component.responseInitDataFiles(responseInit);
    expect(component.atachedFiles.length).toBeGreaterThanOrEqual(1);

    responseInit = {
      "status":false,
      "lista":[]
    }
    component.responseInitDataFiles(responseInit);

    // attachFileChange
    // attachFileChange
    const value = {
      target: {
        files: [new Blob(['ssdfsdgdjghdslkjghdjg'], { type: 'pdf' })]
      }
    }
    spyOn(component, 'attachFileChange').and.callThrough();
    component.attachFileChange(value);
    expect(component.attachFileChange).toHaveBeenCalled();

    // addAttachToList
    const obj = {
            loading: true,
            name:"Example.pdf",
            filepath:"",
            azurepath:"",
            id: 3579
    }
    component.atachedFiles[0].name=obj.name;
    tick(1000);
    let spyAttach=spyOn(component,'addAttachToList').and.callThrough();
    flush();
    component.addAttachToList(obj,value.target.files[0],true,"2955");
    expect(spyAttach).toHaveBeenCalled();

    // responseAddAttachList
    let respAddAttach={ 
      "status":true
    }
    component.responseAddAttachList(0,respAddAttach);
    expect(component.atachedFiles[0].status).toEqual(2);

    respAddAttach = { 
      "status":false
    }
    spyOn(component,'initDataFiles');
    component.responseAddAttachList(0,respAddAttach);
    expect(component.atachedFiles[0].status).toEqual(3);
  
    // removeAttach
    spyOn(component,'removeAllAttach');
    component.removeAttach(1);

    // removeAllAttach
    component.removeAllAttach();

    
  }))
});
