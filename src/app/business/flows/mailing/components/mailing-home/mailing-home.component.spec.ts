import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { IMainUser, IViewModule } from 'src/app/business/models/IModel-module';
import Swal from 'sweetalert2';
import { mockSwal } from '../../../office/terceros/components/mypass/mypass.component.spec';
import { IMailTemplate } from '../../models/responseMailing';

import { MailingHomeComponent } from './mailing-home.component';
export class MockDialogMailinghome {
  open() {
    return {
      afterClosed: () => of({
        "result": "hola",
        "template":{
          body:'',
          cc:'',
          cco:'',
          id:0,
          subject:'',
          title:''
        }
      })
    }
  }
}
describe('MailingHomeComponent', () => {
  let component: MailingHomeComponent;
  let fixture: ComponentFixture<MailingHomeComponent>;
  let user: IMainUser;
  let moduleList: Array<IViewModule>;
  let dialog: MatDialog;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MailingHomeComponent],
      imports: [MatDialogModule, MatMenuModule, HttpClientTestingModule, RouterTestingModule],
      providers: [{
        provide: MatDialog,
        useClass: MockDialogMailinghome
      },
      { 
        provide:Swal,
        useClass:mockSwal
      }]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MailingHomeComponent);
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
  afterEach(async(() => {
    localStorage.clear();
  }))
  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.blockUI).not.toBeUndefined();
    expect(component.inputfileExcel).toBeUndefined();
    expect(component.inputAttachFile).toBeUndefined();
    expect(component.inputFileText).toContain("Ningún");
    expect(component.hojaDatos.length).toEqual(0);
    expect(component.hojaHeaders.length).toEqual(0);
    expect(component.flagFileCharged).toEqual(false);
    expect(component.flagCC).toEqual(false);
    expect(component.flagAttach).toEqual(false);
    expect(component.moduleList.length).toEqual(0);
    expect(component.user).toEqual(null);
    expect(component.template).not.toEqual(null);
    expect(component.templatefoot).toMatch("");
    expect(component.cusAttach).toMatch("");
    expect(component.atachedFiles.length).toEqual(0);
    expect(component.idAutoincrement).toEqual(0);
    expect(component.withCase).toEqual(false);
    expect(component.caseVariableCondition).toMatch("");
    expect(component.templatesArray.length).toBeGreaterThanOrEqual(0);
    expect(component.editorConfig).not.toBeUndefined();
  });

  it('when execute script components', fakeAsync(() => {
    component.ngOnInit();
    tick(1000);
    expect(component.user).not.toBeUndefined();
    expect(component.moduleList.length).toBeGreaterThanOrEqual(1);
    flush();

    spyOn(component, 'clickAttachFile');
    component.clickAttachFile()

    // attachFileChange
    const value = {
      target: {
        files: [new Blob(['ssdfsdgdjghdslkjghdjg'], { type: 'pdf' })]
      }
    }
    spyOn(component, 'attachFileChange').and.callThrough();
    component.attachFileChange(value);
    expect(component.atachedFiles.length).toBeGreaterThanOrEqual(1);
    expect(component.attachFileChange).toHaveBeenCalled();

    let respLoad = {
      "status": true,
      "id_attach": 1
    }

    component.responseOnLoad(respLoad, 1);
    expect(component.atachedFiles[0].loading).toEqual(false);

    respLoad = {
      "status": false,
      "id_attach": null
    }
    component.responseOnLoad(respLoad, 1);
    expect(component.atachedFiles.length).toEqual(0);

    // insert dialog
    spyOn(dialog, 'open').and.callThrough();
    component.insert();
    expect(component.mailingForm.body.value).toMatch("hola");


    const value2 = {
      target: {
        files: [new Blob(['ssdfsdgdjghdslkjghdjg'], { type: 'pdf' })]
      }
    }

    expect(component.clickAttachFile).toHaveBeenCalled();
    component.attachFileChange(value2);

    component.removeFile(1);
    expect(component.atachedFiles.length).toEqual(0);

    // addCase
    component.mailingForm.caseVariable.setValue("1")
    component.mailingForm.tFoot.setValue("FIRMA FOOTER");
    component.addCase();
    expect(component.combineTemplates()).toContain("FIRMA FOOTER");

    // activeCase
    component.activeCase();
    expect(component.withCase).toEqual(true);
    // disableCase
    component.disableCase();
    expect(component.withCase).toEqual(false);
    // showCC
    component.showCC();
    expect(component.flagCC).toEqual(true);
    // showCustomeAttach
    component.showCustomeAttach();
    expect(component.flagAttach).toEqual(true);

    spyOn(component,'onClickFileButon');
    component.onClickFileButon();
    expect(component.onClickFileButon).toHaveBeenCalled();

    const value3= {
      target: {
          files: [new Blob(['ssdfsdgdjghdslkjghdjg'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })]
      }
  }
    /*
    lastModified: 1610053134759
    lastModifiedDate: Thu Jan 07 2021 15:58:54 GMT-0500 (hora estándar de Perú) {}
    name: "ejemplo.xlsx"
    size: 9757
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    webkitRelativePath: ""
    */
    spyOn(component,'onFileChange').and.callThrough();
    component.onFileChange(value3);

    spyOn(Swal,'fire').and.callThrough();
    component.validateBook(null,null,null,false);
    expect(Swal.fire).toHaveBeenCalled();
    expect(component.inputFileText).toContain("archivo seleccionado");
    expect(component.hojaHeaders.length).toEqual(0);
    expect(component.hojaDatos.length).toEqual(0);
    expect(component.flagFileCharged).toEqual(false);

    // showAvailables
    component.showAvailables();
    expect(Swal.fire).toHaveBeenCalled();
    component.responseShowAvailables(0,"HOLA");
    expect(Swal.fire).toHaveBeenCalled();

    // sendMails
    let status:boolean=component.validateForEachAtached(false);
    expect(Swal.fire).toHaveBeenCalled();
    expect(status).toEqual(false);
    status=component.validateForEachAtached(true);
    expect(status).toEqual(true);
    // flagFileCharged false
    component.flagFileCharged=false;
    tick(1000);
    component.attachFileChange(value);
    component.sendMails();
    flush();
    expect(Swal.fire).toHaveBeenCalled();
    // flagFileCharged true and template.body / subject ' '
    spyOn(component.mailingServ,'sentMail');
    component.flagFileCharged=true;
    component.template.body="EJEMPLO";
    component.template.subject='';
    tick(1500);
    component.sendMails();
    flush();
    expect(Swal.fire).toHaveBeenCalled();

    // body != ""
    component.flagFileCharged=true;
    component.template.body="";
    component.template.subject='';
    tick(1500);
    component.sendMails();
    flush();
    expect(Swal.fire).toHaveBeenCalled();

    component.modalUserGuide();
    expect(dialog.open).toHaveBeenCalled();

    // previewMessage
    component.previewMessage();
    expect(dialog.open).toHaveBeenCalled();

    // clearContentMensaje
    component.clearContentMensaje();
    expect(Swal.fire).toHaveBeenCalled();
    expect(component.template.id).toEqual(0);
    component.clearFormValues();
    expect(component.mailingForm.body.value).toMatch("");
    flush();

    component.viewFileCharge();
    expect(dialog.open).toHaveBeenCalled();
    let template:IMailTemplate;
      template={
        body:"HOLA MUNDO",
        title:"TITULO",
        cc  : "joao.hernandezgo@telefonica.com",
        cco:"joao.hernandezgo@telefonica.com",
        subject:"as",
        id:0
      }
    component.chargeTemplate(template);
    expect(component.mailingForm.body.value).toContain("HOLA");

    // selectTemplate
    spyOn(component.mailingServ,'selectTemplate');
    const resp={
      "condition":true
    }
    component.responseSelectTemplate(resp);
    expect(Swal.fire).toHaveBeenCalled();
    flush();
    // useTemplate
      template={
        body:"HOLA MUNDO 2",
        title:"TITULO 2",
        cc  : "joao.hernandezgo@telefonica.com",
        cco:"joao.hernandezgo@telefonica.com",
        subject:"prueba",
        id:1
      }
    component.useTemplate(template);
    expect(component.template.id).toEqual(1);
    expect(component.template.body).toContain("MUNDO 2");
    expect(component.template.cc).toContain("joao.hernandez");
    // saveTemplate
    spyOn(component.mailingServ,'mergeTemplate');
    component.mailingForm.title.setValue("");
    tick(1000);
    component.saveTemplate();
    flush();
    expect(Swal.fire).toHaveBeenCalled();
    component.mailingForm.title.setValue(template.title);
    component.mailingForm.body.setValue(template.body);
    tick(1000);
    component.saveTemplate();
    flush();
    expect(Swal.fire).toHaveBeenCalled();
    
    // showFormula
    component.showFormula("case");
    expect(Swal.fire).toHaveBeenCalled();
    flush();
  }))
});
