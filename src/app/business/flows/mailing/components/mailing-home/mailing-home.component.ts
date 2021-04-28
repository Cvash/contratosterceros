import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { IMailTemplate } from '../../models/responseMailing';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MailingService } from '../../services/mailing.service';
import { IMainUser, IViewModule } from '../../../../../../app/business/models/IModel-module';
import { MatDialog } from '@angular/material/dialog';
import { ModalLinkImageComponent } from '../modal-link-image/modal-link-image.component';
import Swal from 'sweetalert2';
import { ModalTemplatesComponent } from '../modal-templates/modal-templates.component';
import { ModalFilesComponent } from '../modal-files/modal-files.component';
import { ModalPreviewComponent } from '../modal-preview/modal-preview.component';
import { MailingGuideComponent } from '../mailing-guide/mailing-guide.component';
import * as XLSX from 'xlsx';
import { MailingHomeReactiveService } from './mailing-home-reactive.service';
import { AuthServiceService } from 'src/app/commons/services/auth-service.service';

@Component({
  selector: 'app-mailing-home',
  templateUrl: './mailing-home.component.html',
  styleUrls: ['./mailing-home.component.scss']
})
export class MailingHomeComponent implements OnInit, AfterViewInit {
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('fileinput', { static: false }) inputfileExcel;
  @ViewChild('atachfileInput', { static: false }) inputAttachFile;
  // Excel file vars
  inputFileText = "Ningún archivo seleccionado.";
  hojaDatos: [any?] = [];
  hojaHeaders: any[] = [];
  flagFileCharged = false;
  flagCC = false;
  flagAttach = false;
  moduleList: Array<IViewModule> = []
  // user data
  user: IMainUser = null;
  // Mail template vars
  template: IMailTemplate = {
    body: '',
    cc: '',
    cco: '',
    id: 0,
    subject: '',
    title: ''
  }
  templatefoot: string = "";
  cusAttach: string = "";
  atachedFiles: Array<any> = [];
  // CUSTOM ATTACHMENT 
  idAutoincrement: number = 0;

  // MAILING TEMPLATES case
  withCase: boolean = false;
  caseVariableCondition: string = "";
  templatesArray: { body: string, default: boolean, input: string }[] = [
    {
      body: '',
      default: true,
      input: ""
    }
  ]

  // Editor configuration
  editorConfig: AngularEditorConfig = {
    width: "20vem",
    editable: true,
    spellcheck: true,
    sanitize: false,
    height: '15rem',
    minHeight: '5rem',
    placeholder: '',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['insertVideo', 'superscript', 'subscript', 'clearFormatting', 'insertHorizontalRule',]
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "banerAzul",
        class: "banerazul",
        tag: "h1",
      },
    ]
  };

  constructor(
    public mailingServ: MailingService,
    public mailingForm: MailingHomeReactiveService,
    private ref: ChangeDetectorRef,
    private dialog: MatDialog,
    public auth: AuthServiceService
  ) { }


  captureTemplate(): IMailTemplate {
    this.template = {
      body: this.mailingForm.body.value,
      cc: this.mailingForm.cc.value,
      cco: this.mailingForm.cco.value,
      id: this.mailingForm.id.value,
      subject: this.mailingForm.subject.value,
      title: this.mailingForm.title.value
    }
    return this.template
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.moduleList = JSON.parse(localStorage.getItem("modules"));
    this.auth.validateMenu("MENSAJERIA", "/messaging/mailing", this.user, this.moduleList);
  }
  ngAfterViewInit(): void {
    this.auth.executeValidateSession(this.user);
  }
  // test success
  attachFileChange = (e) => {
    /* console.log("ATTACH FILE CHANGE") */
    for (let i = 0; i < e.target.files.length; i++) {
     /*  console.log("ATTACH ITERATION") */
      const newid = this.idAutoincrement + 1;
      this.idAutoincrement++;
      const file = e.target.files[i];
      const obj = {
        loading: true,
        name: file['name'],
        id: newid,
        id_attach: null
      }
      this.atachedFiles.push(obj);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        /* console.log("ON LOAD") */
        const base64file = reader.result;
        this.mailingServ.uploadFileBinary(base64file, file['type'], file['name'], this.user.id)
          .toPromise()
          .then(
            (response) => {
              this.responseOnLoad(response, newid);
            }
          )
      }
    }
  }
  // test success
  responseOnLoad(response: any, newid: number) {
    const idx = this.atachedFiles.findIndex(p => p.id == newid);
    /* console.log("ATACHED FILES") */
    this.atachedFiles[idx].loading = false;
    if (response['status']) {
     /*  console.log("STATUS TRUE") */
      this.atachedFiles[idx].id_attach = response['id_attach'];
    } else {
      /* console.log("STATUS FALSE") */
      this.atachedFiles.splice(idx, 1);
    }
    this.ref.detectChanges();
  }
  // success
  insert = () => {
    const dialog = this.dialog.open(ModalLinkImageComponent, {
      width: '700px',
      minHeight: '400px'
    });
    // Subscription
    dialog.afterClosed().subscribe((response) => {
      try {
        const result = response["result"];
      if (result !== "")
        this.mailingForm.body.setValue(this.mailingForm.body.value + result);
      this.ref.detectChanges();
      } catch (error) {
        console.log(error)
      }
    });
  }
  // test success
  removeFile = (id) => {
    /* console.log("REMOVE FILE") */
    const idx = this.atachedFiles.findIndex(p => p.id == id);
    this.atachedFiles.splice(idx, 1);
    this.ref.detectChanges();
  }
  // test success
  clickAttachFile = () => {
    this.inputAttachFile.nativeElement.click();
  }
  // CASES 
  // success
  combineTemplates() {
    let formula = "";
    // add case
    if (this.withCase) {
      formula = '@case*[[' + this.mailingForm.caseVariable.value + '],<br>';
      formula = formula + '[' + (this.templatesArray[0].body != '' ? this.templatesArray[0].body : ' ') + ']';
      for (let i = 1; i < this.templatesArray.length; i++) {
        const ncase = this.templatesArray[i].input;
        const selection = this.templatesArray[i].body;
        formula = formula + ',<br>[' + ncase + ': ' + selection + ']';
      }
      formula = formula + '<br>]]*';
    }
    return this.mailingForm.body.value + "<br>" + formula + "<br>" + this.mailingForm.tFoot.value;
  }
  // success
  addCase() {
    this.caseVariableCondition = this.mailingForm.caseVariable.value;
    this.templatesArray.push({
      body: '',
      default: false,
      input: ""
    })
  }
  dropCase(idx: number) {
    this.templatesArray.splice(idx, 1);
  }
  activeCase() {
    this.withCase = true;
  }
  disableCase() {
    this.withCase = false;
  }
  // UI HANDLERS
  showCC() {
    this.flagCC = !this.flagCC;
  }
  // test success
  showCustomeAttach() {
    this.flagAttach = true;
  }
  // test success
  onClickFileButon() {
    this.inputfileExcel.nativeElement.click();
  }
  // test success
  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    let headers: any[] = [];
    const reader = new FileReader();
    const file = ev.target.files[0];
    // Leer el libro excel cargado
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      // Validar el libro
      const SHEET_NAME = workBook.SheetNames[0];
      if (workBook.SheetNames.includes(SHEET_NAME)) {
        const sheet = workBook.Sheets[SHEET_NAME];
        headers = this.getHeaderRow(sheet)
        jsonData = XLSX.utils.sheet_to_json(sheet);
            // Validar el libro
/*             this.validateBook(file,jsonData,Headers,headers.includes("Correo"));
 */            
        if (headers.includes("Correo")) {
          this.chargeExcelInputData(file.name, jsonData, headers);
          this.ref.detectChanges();
        } else {
          this.clearInputXLSX()
          this.swalThreeParamsHtml('error', 'Error en la hoja', 'No se encontro la columna <b>Correo</b>');
        }
      } else {
        this.clearInputXLSX()
        this.swalThreeParamsHtml('error', 'Error en el libro', 'No se encontró la hoja <b>' + SHEET_NAME + '</b>.');
      }
    }
    reader.readAsBinaryString(file);
  }
  // test success
  validateBook(file: any, jsonData: any, headers: any, condition: any) {
    if (condition) {
      this.chargeExcelInputData(file.name, jsonData, headers);
      this.ref.detectChanges();
    } else {
      this.clearInputXLSX()
      this.swalThreeParamsHtml('error', 'Error en la hoja', 'No se encontro la columna <b>Correo</b>');
    }
  }
  // POP UP PABRAS RESERVADAS test success
  showAvailables() {
    let lista = "";
    this.hojaHeaders.forEach(p => {
      lista = lista + "<li>@" + p + "</li>"
    })
    this.responseShowAvailables(lista.length, lista);

  }
  // test success
  responseShowAvailables(size: number, lista: string) {
    if (size > 0) {
      Swal.fire({
        title: 'Palabras disponibles',
        html: '<ul style="height:120px; overflow:auto; text-align: left">' + lista + "</ul>",
      })
    } else {
      this.mailingServ.showSwalAlertCustoms('error', 'No se ha cargado un excel');
    }
  }
  // ENVIAR MENSAJE
  // test success
  validateForEachAtached(condition: boolean) {
    if (!condition) {
      this.mailingServ.showSwalAlertCustoms('error', "Los archivos no han terminado de cargar");
      return false;
    }
    return true;
  }
  // test success
  sendMails() {
    this.atachedFiles.forEach(element => {
      this.validateForEachAtached(!element.loading)
    });
    const request = {
      headers: this.hojaHeaders,
      datos: this.hojaDatos,
      template: { ...this.captureTemplate(), body: this.combineTemplates() },
      attachment: this.atachedFiles,
      cus_attach: this.mailingForm.cusAttach.value
    }
    // Validar petición
    if (!this.flagFileCharged) {
      /* console.log("FLAGFILE") */
      this.mailingServ.showSwalAlertCustoms('error', 'No ha cargado ningun Excel.');
    } else if (this.template.body !== '') {
     /*  console.log("BODY NOT EMPTY") */
      if (this.template.subject === '') {
        /* console.log("SUBJECT MAIL") */
        Swal.fire({
          text: '¿Enviar sin asunto?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#00a9e0',
          cancelButtonColor: '#D3D4D3',
          confirmButtonText: 'Enviar de todos modos',
          cancelButtonText: 'No enviar'
        }).then((result) => {
          if (result.value) {
            this.mailingServ.sentMail(request);
          }
        })
      } else {
        this.mailingServ.sentMail(request);
      }
    } else {
      this.mailingServ.showSwalAlertCustoms('error', 'No ha escrito un mensaje');
    }
  }
  // Modal GUIA DE USUARIO
  // test success
  modalUserGuide() {
    this.dialog.open(MailingGuideComponent, {
      width: '95%',
      minHeight: '400px',
    });
  }
  // PREVIEW DE MENSAJES
  // test success
  previewMessage() {
    let newTemplate = { ...this.template, body: this.combineTemplates() }
    this.dialog.open(ModalPreviewComponent, {
      width: '90%',
      minHeight: '80vh',
      data: {
        type: 'prev',
        headers: this.hojaHeaders,
        rows: this.hojaDatos,
        template: newTemplate,
      }
    });
  }
  // test success
  clearContentMensaje() {
    Swal.fire({
      title: '¿Borrar cambios?',
      text: "Se perderán todos los avances que no estén guardados.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00a9e0',
      cancelButtonColor: '#D3D4D3',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.template = {
          body: '',
          cc: '',
          cco: '',
          id: 0,
          subject: '',
          title: ''
        }
        this.clearFormValues();
        this.flagCC = false;
        this.atachedFiles = []
      }
    })
  }
  // test success
  clearFormValues() {
    this.mailingForm.body.setValue("");
    this.mailingForm.cc.setValue("")
    this.mailingForm.cco.setValue("")
    this.mailingForm.subject.setValue("")
    this.mailingForm.title.setValue("")
  }
  // MODAL ARCHIVOS
  // test success
  viewFileCharge() {
    this.dialog.open(ModalFilesComponent, {
      disableClose: true,
      width: '700px',
      minHeight: '400px',
      data: {}

    })
    /* dialogRef.afterClosed().subscribe((response)=>{
        console.log("RESPONSE");
        console.log(response);
        if(response["condition"]){ 
          this.atachedFiles=response["attach"];
          this.ref.detectChanges();
        }
    }) */
  }
  // SECCIONS
  /* modalSeccions(){    
    this.blockUI.start("Cargando...")
    this.mailingServ.modalSectionsService().toPromise().then(resp => {
      this.blockUI.stop()
      const dialog = this.dialog.open(ModalSectionsComponent,{
        width: '700px',
        minHeight: '400px',
        data: {body:this.template.body,headers:this.hojaHeaders, sections:resp}
      });
      dialog.afterClosed().subscribe( () =>  {
        const result = dialog.componentInstance.result!==""?dialog.componentInstance.result:this.template.body;
        this.template = {...this.template, body: result};
        this.ref.detectChanges();
      });      
    });
  } */
  // test success
  chargeTemplate(template: IMailTemplate) {
    try {
      this.mailingForm.body.setValue(template.body);
      this.mailingForm.title.setValue(template.title);
      this.mailingForm.cc.setValue(template.cc);
      this.mailingForm.cco.setValue(template.cco);
      this.mailingForm.subject.setValue(template.subject);
      this.mailingForm.id.setValue(template.id);
    } catch (error) {
      console.log(error)
    }
  }
  // TEMPLATE HANDLERS
  selectTemplate() {
    this.blockUI.start("Cargando...")
    this.mailingServ.selectTemplate().toPromise().then(resp => {
      this.responseSelectTemplate(resp);
    })
  }
  // test success
  responseSelectTemplate(resp: any) {
    this.blockUI.stop()
    const dialog = this.dialog.open(ModalTemplatesComponent, {
      width: '700px',
      minHeight: '400px',
      data: resp
    });
    // Subscription
    dialog.afterClosed().subscribe((result) => {
      try {
        const dialogTemplate = result["template"];
        this.chargeTemplate(dialogTemplate);
        if (dialogTemplate) {
          console.log("DIALOG TEMPLATE");
          this.template = result["template"];
          this.ref.detectChanges();
          Swal.fire({
            icon: 'success',
            html: 'La plantilla <b>' + this.template.title + '</b> fue <b>cargada</b> con éxito'
          })
        }
      } catch (error) {

      }
    });
  }
  // test success
  useTemplate(event: IMailTemplate) {
    this.template = event
  }
  // test success
  saveTemplate = () => {
    if (this.mailingForm.title.value === '') {
      this.mailingServ.showSwalAlertCustoms('warning', 'Por favor, ingresa un título para esta plantilla');
    }
    else if (this.mailingForm.body.value !== '') {
      this.mailingServ.mergeTemplate(this.captureTemplate());
    } else {
      this.mailingServ.showSwalAlertCustoms('error', 'No ha escrito un mensaje');
    }
  }

  // EXCEL HANLDER

  getHeaderRow(sheet) {
    var headers = [];
    var range = XLSX.utils.decode_range(sheet['!ref']);
    var C, R = range.s.r;
    /* walk every column in the range */
    for (C = range.s.c; C <= range.e.c; ++C) {
      var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
      /* find the cell in the first row */
      var hdr = "UNKNOWN " + C; // <-- replace with your desired default 
      if (cell && cell.t)
        hdr = XLSX.utils.format_cell(cell);
      headers.push(hdr);
    }
    return headers;
  }
  // test success
  clearInputXLSX() {
    this.inputFileText = "Ningún archivo seleccionado.";
    this.hojaHeaders = [];
    this.hojaDatos = [];
    this.inputfileExcel.nativeElement.value = '';
    this.flagFileCharged = false;
  }
  // test success
  chargeExcelInputData(filename: string, jsonData, headers) {
    this.inputFileText = filename;
    this.hojaDatos = jsonData;
    this.hojaHeaders = headers;
    this.flagFileCharged = true;
    // Mensaje de OK
    let lista = "";
    this.hojaHeaders.forEach(p => {
      lista = lista + "<li>@" + p + "</li>"
    })
  }
  // test success
  showFormula(f: string) {
    let body: string;
    switch (f) {
      case "case":
        body = '<div style="text-align: left;padding-left: 90px;">'
          + "@case*[[@Condicion],<br>"
          + "[Resultado por defecto],<br>"
          + "[Caso 1: Resultado 1],<br>"
          + "[Caso 2: Resultado 2]<br>"
          + "]]*</div>"
        break;

      default:
        body = "";
        break;
    }
    this.swalShowFormula(body);
  }
  // test success
  swalShowFormula(body: string) {
    Swal.fire({
      title: "Estructura de la fórmula",
      html: body
    })
  }
  // test success
  swalThreeParamsHtml(i: any, tit: string, ht: string) {
    Swal.fire({
      icon: i,
      title: tit,
      html: ht
    })
  }
}
