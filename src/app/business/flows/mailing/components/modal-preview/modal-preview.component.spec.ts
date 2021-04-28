import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMailTemplate } from '../../models/responseMailing';
import { EscapeHtmlPipe } from './keepHTML.pipe';

import { ModalPreviewComponent } from './modal-preview.component';

describe('ModalPreviewComponent', () => {
  let component: ModalPreviewComponent;
  let fixture: ComponentFixture<ModalPreviewComponent>;
  const dialogRefPreviewMock = {
		close: () => { },
    };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPreviewComponent, EscapeHtmlPipe ],
      imports:[HttpClientTestingModule],
      providers:[{
        provide:MatDialogRef,
        useValue:dialogRefPreviewMock
      },
          {
            provide:MAT_DIALOG_DATA,
            useValue:{}
          }]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalPreviewComponent);
    component = fixture.componentInstance;
    
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.template).toBeUndefined();
    expect(component.correo).toMatch("");
    expect(component.loading).toEqual(false);
    expect(component.attach.length).toEqual(0);
    expect(component.total).toEqual(0);
    expect(component.index).toEqual(0);
  });

  it('when execute script method modal preview',fakeAsync(()=>{ 
    let template:IMailTemplate={ 
      id:1,
      title:"Prueba",
      cc:"josue180610@hotmail.com",
      cco:"josue180610@hotmail.com",
      subject:"Prueba subject",
      body:"<p>HOLA MUNDO</p>"
    }
    let data={
      "type":"prev",
      "rows":[{
        id:1,
        name:"Ejemplo",
        Correo:"josue180610@hotmail.com"
      },
      {
        id:1,
        name:"Ejemplo",
        Correo:"joao.hernandezgo@telefonica.com"
      }],
      "template":template,
      "to":"joao.hernandezgo@telefonica.com",
      "attach":[{
        id:1,
        name:"file.pdf"
      }],
      "headers":[
        "correo","nombre","apellidos"
      ]
    };
    component.data=data;
    tick(1000);
    component.initConstructorData(data);
    flush();
    // second case
    data={
      "type":"final",
      "rows":[{
        id:1,
        name:"Ejemplo",
        Correo:"josue180610@hotmail.com"
      },
      {
        id:1,
        name:"Ejemplo",
        Correo:"joao.hernandezgo@telefonica.com"
      }],
      "template":template,
      "to":"joao.hernandezgo@telefonica.com",
      "attach":[{
        id:1,
        name:"file.pdf"
      }],
      "headers":[
        "correo","nombre","apellidos"
      ]
    };
    component.data=data;
    tick(1000);
    component.initConstructorData(data);
    flush();
    expect(component.correo).toContain("joao.hernandezgo");
  
    // nextPreview
    component.nextPreview();
    expect(component.index).toBeGreaterThanOrEqual(1);

    // second case
    component.index=3;
    tick(1000);
    component.nextPreview();
    flush();
    expect(component.index).toEqual(0);

    // closeModalPreview
    spyOn(component.dialogRef,'close');
    component.closeModalPreview();
    expect(component.dialogRef.close).toHaveBeenCalled();

    //ngOnInit
    component.ngOnInit();
    expect(component.loading).toEqual(true);
    // validatedetailsAndType
    expect(component.validateDetailsAndType(0,"prev")).toEqual(false);

    // responseInitOninit
    const resp={ 
      "attachment":[{
        azurename: "attach_3578.JPG",
      id: 3578,
      id_session: 0,
      id_status: 2,
      name: "tabler.JPG"
      }]
    }
    component.responseInitOnInit(resp);
    expect(component.loading).toEqual(false);
    expect(component.attach[0].azurename).toContain("attach_35");
  
    // getFileAttach
    const spy=spyOn(component,'getFileAttach');
    component.getFileAttach("attach_3578.JPG","tabler.JPG");
    expect(spy).toHaveBeenCalled();

    const html='<a href=""><img src="https://storageqallarix.blob.core.windows.net/rhdigital/messaging/files/20200817_212651_1.jpg" /></a><br><br>';
    const stringResult=component.functionsReview(html);
    expect(stringResult).toMatch("");

    // functionCase
    const objIf={
      "args":[
        "prueba:sum"
      ,"prueba2:avg",
      "prueba3:buscarV"
      ]
    }
    component.funcionCase(objIf);
  }))
});
