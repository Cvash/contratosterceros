import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDocumentTempComponent } from '../modal-document-temp/modal-document-temp.component';
import * as XLSX from 'xlsx';
import { IMainUser, IViewModule } from '../../../../../../app/business/models/IModel-module';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatDialog } from '@angular/material/dialog';
import { DocumentService } from '../../services/document.service';
import { DocumentGuideComponent } from '../document-guide/document-guide.component';
import { DocumentHomeReactiveService } from './document-home-reactive.service';
import { IListDocument } from '../../models/responseDocument';
import { AuthServiceService } from '../../../../../../app/commons/services/auth-service.service';

@Component({
  selector: 'app-document-home',
  templateUrl: './document-home.component.html',
  styleUrls: ['../../../mailing/components/mailing-home/mailing-home.component.scss']
})
export class DocumentHomeComponent implements OnInit, AfterViewInit {
  moduleList: Array<IViewModule> = [];
  sheetName = 'Hoja1';
  user: IMainUser = null;
  @BlockUI() blockUI: NgBlockUI;
  // Editor configuration
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '6in',
    minHeight: '6in',
    width: '7in',
    defaultFontSize: "3",
    placeholder: '',
    sanitize: false,
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    fonts: [{ class: 'arial', name: 'Arial' }],
    toolbarHiddenButtons: [
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

  withCase: boolean = false;
  caseVariableCondition: string = "";
  documentArray: Array<IListDocument> = [
    {
      body: '',
      default: true,
      input: ""
    }
  ]
  // Excel file vars
  @ViewChild('fileinput', { static: false }) inputfileExcel;
  inputFileText = "Ningún archivo seleccionado.";
  hojaDatos: [any?] = [];
  hojaHeaders: any[] = [];
  flagFileCharged = false;
  templateId: number = 0;

  constructor(
    private ref: ChangeDetectorRef,
    private dialog: MatDialog,
    private homeService: DocumentService,
    public homeForm: DocumentHomeReactiveService,
    public auth: AuthServiceService
  ) {
  }

  // test success
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.moduleList = JSON.parse(localStorage.getItem("modules"));
    this.cleanForm();
    this.auth.validateMenu("DOCUMENTOS DINÁMICOS", "/document/generator", this.user, this.moduleList);
  }
  ngAfterViewInit(): void {
    this.auth.executeValidateSession(this.user);
  }
  // test success
  cleanForm() {
    this.homeForm.caseVariable.setValue("");
    this.homeForm.documentBody.setValue("");
    this.homeForm.documentFooter.setValue("");
    this.homeForm.title.setValue("");
  }
  // GUIDE test success
  modalUserGuide() {
    this.dialog.open(DocumentGuideComponent, {
      width: '95%',
      minHeight: '400px',
    });
  }
  // EXCEL HANLDER test success
  onClickFileButon() {
    this.inputfileExcel.nativeElement.click();
  }
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
  clearInputXLSX(n) {
    this.inputFileText = "Ningún archivo seleccionado.";
    this.hojaHeaders = [];
    this.hojaDatos = [];
    if (n == 1) {
      this.inputfileExcel.nativeElement.value = '';
    }

    this.flagFileCharged = false;
  }
  // test success
  chargeExcelInputDataHome(filename: string, jsonData, headers) {
    /* console.log("JSON DATA"); */
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
      if (workBook.SheetNames.includes(this.sheetName)) {
        const sheet = workBook.Sheets[this.sheetName];
        headers = this.getHeaderRow(sheet)
        jsonData = XLSX.utils.sheet_to_json(sheet);
        // Validar el libro
        this.validateWorkBook(0, headers.includes("Filename"), file.name, jsonData, headers);
      } else {
        this.clearInputXLSX(0)
        this.homeService.showAlertDocument('error', null, "Error en el libro", 'No se encontró la hoja <b>' + this.sheetName + '</b>.');
      }
    }
    reader.readAsBinaryString(file);
  }
  // Validar el libro
  validateWorkBook(n: number, condition: boolean, filename: string, jsonData: any, headers: any) {
    if (condition) {
      /* console.log("INCLUDE FILENAME") */
      this.chargeExcelInputDataHome(filename, jsonData, headers);
      this.ref.detectChanges();
    } else {
      this.clearInputXLSX(n)
      this.homeService.showAlertDocument('error', null, 'Falta columna Filename', 'Esta columna es obligatoria y será el nombre que lleve el archivo generado correspondiente a cada fila.');
    }
  }

  // ¡FORMULAS!
  // test success
  getFormula(cadena: string) {
    const expresion = /@case\*\[.+?\]\*+/g
    // VARIABLES
    let coincidencia: RegExpExecArray;
    // BUSCAR COINCIDENCIAS DE @FUN()
    coincidencia = expresion.exec(cadena);
    if (coincidencia !== null && coincidencia.length > 0) {
      return coincidencia[0];
    } else {
      return null;
    }
  }
  // test success
  activeCase() {
    this.withCase = true;
    this.editorConfig.minHeight = "200px";
    this.editorConfig.height = "200px";
  }
  // test success
  disableCase() {
    this.withCase = false;
    this.editorConfig.minHeight = "800px";
    this.editorConfig.height = "800px";
  }

  getFormulaFunction(cadena: string) {
    let coincidencia: RegExpExecArray;
    const separador = cadena.split("*[");
    const argsStr: string = separador[1].slice(0, separador[1].length - 2);
    const regexArgs = /\[.+?\]+/g;
    let args: string[] = [];
    do {
      coincidencia = regexArgs.exec(argsStr);
      if (coincidencia) {
        args.push(coincidencia[0].replace("[", "").replace("]", ""))
      }
    } while (coincidencia);

    // AGREGAR CASES
    // -------default
    this.homeForm.caseVariable.setValue(args[0]);
    this.documentArray[0].body = args[1];
    for (let i = 2; i < args.length; i++) {
      const a_case = args[i].split(":");
      this.documentArray.push({
        body: a_case[1],
        default: false,
        input: a_case[0]
      })
    }
  }
  // TEMPLATE HANDLERS
  selectTemplate() {
    this.blockUI.start("Cargando...")
    this.homeService.selectTemplateDocument().toPromise().then(resp => {
      this.responseSelectTemplate(resp);
    })
  }
  responseSelectTemplate(resp: any) {
    this.blockUI.stop();
    const dialog = this.dialog.open(ModalDocumentTempComponent, {
      width: '700px',
      minHeight: '400px',
      data: resp
    });
    // Subscription
    dialog.afterClosed().subscribe((response) => {
      const dialogTemplate = response["template"];
      if (response["condition"] === true && dialogTemplate) {
        const templateBody: string = dialogTemplate.body;
        const formula = this.getFormula(templateBody);
        if (formula) {
          this.activeCase();
          const header = templateBody.split(formula)[0];
          const footer = templateBody.split(formula)[1];
          this.getFormulaFunction(formula);
          this.homeForm.documentBody.setValue(header);
          this.homeForm.documentFooter.setValue(footer);
        } else {
          this.homeForm.documentBody.setValue(templateBody);
        }

        this.homeForm.templateId.setValue(dialogTemplate.id);
        this.templateId = this.homeForm.templateId.value;
        this.homeForm.title.setValue(dialogTemplate.title);

        this.ref.detectChanges();
        this.homeService.showAlertDocument("success", null, null, 'La plantilla <b>' +
          this.homeForm.title.value +
          '</b> fue <b>cargada</b> con éxito');
      }
    });
  }
  // test success
  addCase() {
    this.caseVariableCondition = this.homeForm.caseVariable.value;
    this.documentArray.push({
      body: '',
      default: false,
      input: ""
    })
  }
  // test success
  dropCase(idx: number) {
    this.documentArray.splice(idx, 1);
  }
  // CASES test success
  combineTemplatesStatus() {
    let formula = "";
    // add case
    if (this.withCase) {
      formula = '@case*[[' + this.homeForm.caseVariable.value + '],<br>';
      formula = formula + '[' + (this.documentArray[0].body != '' ? this.documentArray[0].body : ' ') + ']';
      for (let i = 1; i < this.documentArray.length; i++) {
        const ncase = this.documentArray[i].input;
        const selection = this.documentArray[i].body;
        formula = formula + ',<br>[' + ncase + ': ' + selection + ']';
      }
      formula = formula + '<br>]]*';
    }
    return this.homeForm.documentBody.value + "<br>" + formula + "<br>" + (this.homeForm.documentFooter.value ? this.homeForm.documentFooter.value : "");
  }
  // test success
  saveTemplate = () => {
    if (this.homeForm.title.value === '') {
      this.homeService.showAlertDocument("warning", 'Por favor, ingresa un título para esta plantilla', null, null);
    }
    else {
      let body="";
      if(this.withCase){
        body=this.combineTemplatesStatus();
      }else{ 
        body=this.homeForm.documentBody.value;
      }
      if (body && body !== '') {
        const request = {
          id: this.homeForm.templateId.value,
          body,
          title: this.homeForm.title.value,
          id_creator: this.user.id,
        }
        if (this.homeForm.templateId.value === 0) {
          this.blockUI.start("Creando plantilla...");
          this.homeService.saveTemplateDocument(request)
            .toPromise().then(resp => {
              this.responseMergeTemplate(resp,"'La plantilla fue <b>creada</b> con éxito'");
            })
        } else {
          this.blockUI.start("Modificando plantilla...");
          this.homeService.updateTemplateDocument(request)
            .toPromise().then(resp => {
              this.responseMergeTemplate(resp,'La plantilla fue <b>modificada</b> con éxito');
            })
        }
      } else {
        this.homeService.showAlertDocument("error", "No ha escrito un mensaje", null, null);
      }
    }
  }
  // test success
  responseMergeTemplate(resp:any,message:string){
    this.blockUI.stop();
    if (resp['status'] == 1) {
      this.homeService.showAlertDocument('success', null, null,message);
    } else {
      this.homeService.showAlertDocument('warning', null, null, 'Error: ' + resp['message']);
    }

  }
  // FUNCION DE GENERACIÓN DE DOCUMENTOS
  generate() {
    if (this.flagFileCharged) {
      if (this.homeForm.title.value !== "") {
        this.homeService.showAlertDocument('info', null, "Los documentos se están generando...", null);
        this.homeService.generateTemplate(this.combineTemplatesStatus(),this.homeForm.title.value, this.user.id,null, this.hojaDatos, this.hojaHeaders)
          .toPromise();
        
      } else {
        this.homeService.showAlertDocument('warning',
          "Este título le ayudará a indentificar los documentos generados con facilidad en la pantalla de descarga.",
          "Elija un título para esta generación de documentos",
          null)
      }
    } else {
      this.homeService.showAlertDocument('warning', "No ha cargado nigún excel", null, null);
    }
    this.cleanForm();
  }
  generatePreview() {
    if (this.flagFileCharged) {
      this.blockUI.start("Generando...")
      this.homeService.generatePreview(this.combineTemplatesStatus(), this.hojaDatos, this.hojaHeaders)
        .toPromise().then(file => {
          this.responseGeneratePreview(file);
        }); 
    } else {
      this.homeService.showAlertDocument('warning', "No ha cargado nigún excel", null, null)
    }

  }
  responseGeneratePreview(file:any){
    let blob = new Blob([file], { type: "application/pdf" });
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.target = "_blank";
          link.download = "Preview.pdf";
          this.blockUI.stop();
          link.click();
  }
  // test success
  changeTitle = () => {
    this.homeForm.templateId.setValue(0);
    this.templateId = this.homeForm.templateId.value;
  }
  // POP UP PABRAS RESERVADAS
  // test success
  showAvailables() {
    let lista = "";
    this.hojaHeaders.forEach(p => {
      lista = lista + "<li>@" + p + "</li>"
    })
   this.validateShowAvailables(lista.length,lista);
  }
  validateShowAvailables(size:number,lista:any){ 
    if (size > 0) {
      this.homeService.showAlertDocument(null,
        'Palabras disponibles', '<ul style="height:120px; overflow:auto; text-align: left">' + lista + "</ul>", null);
    } else {
      this.homeService.showAlertDocument('error', 'No se ha cargado un excel', "", null);
    }
  }
}
