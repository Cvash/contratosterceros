import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ReplaySubject, Subject } from 'rxjs';
import { IMainUser, IViewModule } from '../../../../../../app/business/models/IModel-module';
import { AuthServiceService } from '../../../../../../app/commons/services/auth-service.service';
import { CATEGORYDOC, TYPEDOC } from '../../../config/var.constants';
import { HtmlActive, RequestCoronaDocument, RequestCoronaHomeDto, RequestCronicasDto, RequestFamilyDto } from '../../models/request-corona-form';
import { ICoronaSick, ICoronavirusFormEdit, IGroupData, IOnlyDate, IStartedData } from '../../models/response-corona-form';
import { CoronavirusFormService } from '../../services/coronavirus-form.service';
import { ModalRelationshipComponent } from '../modal-relationship/modal-relationship.component';
import { CoronavirusHomeReactiveService } from './coronavirus-home-reactive.service';

@Component({
  selector: 'app-coronavirus-home',
  templateUrl: './coronavirus-home.component.html',
  styleUrls: ['./coronavirus-home.component.scss']
})
export class CoronavirusHomeComponent implements OnInit, AfterViewInit {
  user: IMainUser = null;
  // condition enfermedades cronicas por pais
  conditionLegalEntity: boolean = false;
  levelAccess: number = 1;
  legalEntity = null;
  // permite mostrar los documentos almacenados en la base de datos y la nube, para obtener el contenedor
  // y nombre de archivo.
  filenameazure: string = '';
  documentId: number = 0;
  // _____________________
  flagValidation: number = 0;
  select: Array<any> = [];
  // condiciones para mostar u ocultar tag html
  conditionShowTable: boolean = false;
  conditionUploadDocument: boolean = false;
  conditionEnfermedadesCardiovasculares: boolean = false;
  conditionEnfermedadesPulmonares: boolean = false;
  conditionEnfermedadesInmunosupresion : boolean = false;
  @ViewChild(CoronavirusHomeComponent, { static: false }) btnfileCondition;
  @BlockUI() blockUI: NgBlockUI;
  txtPreRegister: number = 0;
  arrayFamilyRelationship: Array<any> = []// arreglo para poblar el mat-select del pop up sobre parentesco.
  arrayCoronaRelationshipValue: Array<RequestFamilyDto> = [] // arreglo para pasar los datos desde el pop up hacia el back.
  arrayAuxRequestCondition: Array<RequestCronicasDto> = [] // arreglo auxiliar para almacenar objeto de enfermedades cronicas.
  arrayConditionActiveHtml: Array<HtmlActive> = [] // permite obtener los flag para habilitar o deshabilitar los tag html segun entidad legal
  arrayCronica: Array<ICoronaSick> = [];
  backgroundColor: string = "";

  filteredMotivo: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  protected _onDestroy = new Subject<void>();
  txtConditionStatus: boolean = false;
  conditionGeneral: boolean = false;
  // variable ngModel
  employeeId: any;
  // array get all reason
  arrayCoronaTransport: Array<any> = [];
  arrayCoronaReason: Array<IStartedData> = []
  arrayCoronaStatus: Array<IStartedData> = []
  arrayCoronaType: Array<IStartedData> = []
  arrayCoronaCountry: Array<IStartedData> = []
  arrayCoronaPrecondition: Array<IStartedData> = []
  arrayCoronaRelationship: Array<IStartedData> = []
  arrayCoronaEdit: Array<ICoronavirusFormEdit> = []
  arrayCoronaGroup: Array<IGroupData> = []
  arrayCoronaNotGroup: Array<IOnlyDate> = [];
  arrayCoronaGeneral: Array<IGroupData> = [];
  arrayCoronaOther: Array<IGroupData> = [];
  coronaDocument: RequestCoronaDocument = null;
  moduleList: Array<IViewModule>=[];
  returnUrl = "";
  codeSelect = [];
  constructor(
    @Optional() public dialogRef: MatDialogRef<CoronavirusHomeComponent>,
    private dialog: MatDialog, 
    private datePipe: DatePipe,
    private router: Router,
    public coronaForm: CoronavirusHomeReactiveService,
    private route: ActivatedRoute, @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: ChangeDetectorRef, 
    public coronaFormService: CoronavirusFormService,
    public auth:AuthServiceService
  ) {
    
  }
  
  
  initData(levelAccess:number,conditionEntity:boolean) {
    this.backgroundColor = '#FFFFFF';
    this.coronaForm.employeeName.disable();
    if (levelAccess === 1 && conditionEntity===true) {
      this.coronaForm.cardiovascularesSick.disable();
      this.coronaForm.inmunosupresionSick.disable();
      this.coronaForm.pulmonaresCronicasSick.disable();
    }
    if (levelAccess !==1){
      this.coronaForm.cardiovascularesSick.enable();
      this.coronaForm.inmunosupresionSick.enable();
      this.coronaForm.pulmonaresCronicasSick.enable();
    }
  }
  onCloseCoronaForm() {
    this.dialogRef.close();
  }
  // test success
  clickMove(cip: string, type: string) {
    if ((cip !== null || cip !== "") && type === "up") {
      this.coronaForm.cip.setValue(cip);
    } else {
      this.coronaForm.cip.setValue(null);
      this.coronaForm.healthPerson.setValue(null);
    }
  }
  // permite mostrar el boton para agregar familiares
  // test success
  addFamilyRelationship() {
    if (this.arrayCoronaRelationshipValue.length > 0) {
      this.conditionShowTable = true;
    } else {
      this.conditionShowTable = false;
    }
  }
  /*enabled or disabled  other input chronic*/
  disabledEnabledCondition(value: any, condition: boolean) {
    // inmunosupresion
    if (value === 14) {
      this.conditionEnfermedadesInmunosupresion = condition;
      if (condition == false) {
        this.coronaForm.inmunosupresionSick.setValue("");
      }
    }
    // Enfermedades cardiovasculares
    if (value === 15) {
      this.conditionEnfermedadesCardiovasculares = condition;
      if (condition == false) {
        this.coronaForm.cardiovascularesSick.setValue("");
      }
    }
    // Enfermedades pulmonares crónicas
    if (value === 16) {
      this.conditionEnfermedadesPulmonares = condition;
      if (condition == false) {
        this.coronaForm.pulmonaresCronicasSick.setValue("");
      }
    }
  }
  /* show or hide upload document*/
  // test success
  showOrHideUpload(selectValue) {
    if (selectValue.length > 0) {
      this.conditionUploadDocument = true;
    } else {
      this.conditionUploadDocument = false;
    }
    this.ref.detectChanges();
  }
  /* get value by click mat select chronic*/
  getValues(event: {
    isUserInput: any;
    source: { value: any; selected: any };
  }) {
  
      if (event.isUserInput) {
        if (event.source.selected === true) {
          // save
          let objeto: RequestCronicasDto;
          objeto = {
            id_employee: this.employeeId, id_cor_con_det: event.source.value,
            other_cor_det: this.coronaForm.inmunosupresionSick.value, created_by: this.user.id, updated_by: this.user.id
          }
          this.arrayAuxRequestCondition.push(objeto)
          this.showOrHideUpload(this.arrayAuxRequestCondition);
          this.disabledEnabledCondition(event.source.value, true);
        } else {
          let index = this.arrayAuxRequestCondition.indexOf(this.arrayAuxRequestCondition.find(id_x => id_x.id_cor_con_det === event.source.value));
          this.arrayAuxRequestCondition.splice(index, 1);
          this.showOrHideUpload(this.arrayAuxRequestCondition);
          this.disabledEnabledCondition(event.source.value, false);

        }
      }
    
  }

  // Permite obtener los valores para llenar los mat-select y poder seleccionar un valor.
  // success
  getDataFormCoronavirus(employeeId: string) {
    /* console.log("GETDATAFORMCORONAVIRUS") */
    this.blockUI.start("Movistar...");
    this.coronaFormService.getDataFormCoronavirus(employeeId).toPromise().then(data => {
        this.responseGetDataFormCoronavirus(data,employeeId);
    })
  }
  // success
  responseGetDataFormCoronavirus(data:any, employeeId:string){
    /* console.log("RESPONSE GETDATAFORMCORONAVIRUS") */
    if (data["status"] == true) {
      /* console.log("STATUS TRUE"); */
      this.arrayCoronaReason = data["array_r"]
      this.arrayCoronaStatus = data["array"]
      this.arrayCoronaType = data["array_t"]
      this.arrayCoronaCountry = data["array_c"]
      this.arrayCoronaRelationship = data["array_relationship"]
      this.arrayConditionActiveHtml = data["condition_legalEntity"]
      this.arrayCoronaTransport = data["array_tp"]
      this.coronaForm.cip.setValue(data["employee_ssff"]["cip"]);
      this.coronaForm.employeeName.setValue(data["employee_ssff"]["name"] + " " +
        data["employee_ssff"]["last_name_1"] + " " + data["employee_ssff"]["last_name_2"]);
      this.coronaForm.employeeGender.setValue(data["employee_ssff"]["gender"]);
      // Obtengo los datos de documento registrado por el empleado.
      this.coronaDocument = data["corona_document"];
      if(this.coronaDocument !== null){
        this.documentId=this.coronaDocument.id_doc;
        this.coronaForm.filename.setValue(this.coronaDocument.name);
      }else{
        this.documentId=null;
        this.coronaForm.filename.setValue("");
      }

      // Obtengo el flag para los tag html segun el nivel de acceso
      // si el flag es igual a 1, entonces el disabled esta activado, caso contrario, se pueden editar los tag html
      
      this.arrayConditionActiveHtml.forEach(element => {
        /* console.log("HTML " + element) */
        if (Number(element.accessLevel) == 1) {
          this.conditionLegalEntity = element.flag == 1 ? true : false;
        }
      });
      // enfermedades cronicas
      this.arrayCoronaGeneral = data["corona_chronic"];
      if (this.arrayCoronaGeneral.length > 0) {
        this.arrayCoronaGeneral.forEach(element => {
          if (element.group == "Generico") {
            this.arrayCoronaNotGroup.push(element["group_detail"]);
          } else {
            this.arrayCoronaGroup.push(element);
          }
        });
      }

      setTimeout(() => {
        this.getDataForEditAdmin(employeeId);
        this.blockUI.stop();
      }, 1000);
    } else {
      this.coronaFormService.showAlertCoronaForm('error', data["message"]);
    }
  }
  // Permite obtener los datos del registro de estado para mostrar al usuario y pueda modificarlos.
  // test success
  getDataForEditAdmin(employeeId: string) {
    this.coronaFormService.getDataFormEdit(employeeId).toPromise().then(
      data => {
      this.responseGetDataForEdit(data);
    })
  }
  // test success
  responseGetDataForEdit(data){ 
    /* console.log("GETDATAFOR") */
    this.coronaForm.requestId.setValue(data["0"]["id_request"]);
    if(data["0"]["comment"] === null){
      this.coronaForm.comment.setValue("");
    }else{
      this.coronaForm.comment.setValue(data["0"]["comment"]);
    }
    if(data["0"]["date_reason"] === null){
      this.coronaForm.reasonDate.setValue("");
    }else{
      this.coronaForm.reasonDate.setValue(this.datePipe.transform(data["0"]["date_reason"], 'yyyy-MM-dd'));
    }
    if(data["0"]["date_type"] === null){
      this.coronaForm.typeDate.setValue("");
    }else{
      this.coronaForm.typeDate.setValue(this.datePipe.transform(data["0"]["date_type"], 'yyyy-MM-dd'));
    }
    if(data["0"]["phone"] == null){
      this.coronaForm.telef.setValue("");
    }else{
      this.coronaForm.telef.setValue(data["0"]["phone"]);
    }
    if(data["0"]["address"] == null){
      this.coronaForm.address.setValue("");
    }else{
      this.coronaForm.address.setValue(data["0"]["address"]);
    }
    if(data["0"]["contact_warning"] === null){ 
      this.coronaForm.contactWarning.setValue("");
    }else{
      this.coronaForm.contactWarning.setValue(data["0"]["contact_warning"])
    }
    if(data["0"]["tef_contact_warning"] === null){
      this.coronaForm.tefContactWarning.setValue("");
    }else{
      this.coronaForm.tefContactWarning.setValue(data["0"]["tef_contact_warning"])
    }
    if(data["0"]["mail"] == null){
      this.coronaForm.mail.setValue("");
    }else{
      this.coronaForm.mail.setValue(data["0"]["mail"]);
    }
    this.change_id_to_name(data["0"]["id_reason"],
      data["0"]["status_det"], data["0"]["id_type"],
        data["0"]["country"])
    if(data["0"]["precondition_1"] === 0 || data["0"]["precondition_1"] === null){
      this.coronaForm.chk00.setValue(false);
    }else{ 
      this.coronaForm.chk00.setValue(true);
    }
    if(data["0"]["precondition_2"] === 0 || data["0"]["precondition_2"] === null){
      this.coronaForm.chk01.setValue(false);
    }else{ 
      this.coronaForm.chk01.setValue(true);
    }
    if(data["0"]["precondition_3"] === 0 || data["0"]["precondition_3"] === null){
      this.coronaForm.chk02.setValue(false);
    }else{ 
      this.coronaForm.chk02.setValue(true);
    }
    if(data["0"]["precondition_4"] === 0 || data["0"]["precondition_4"] === null){
      this.coronaForm.chk03.setValue(false);
    }else{ 
      this.coronaForm.chk03.setValue(true);
    }
    if(data["0"]["precondition_5"] === 0 || data["0"]["precondition_5"] === null){
      this.coronaForm.chk04.setValue(false);
    }else{ 
      this.coronaForm.chk04.setValue(true);
    }
    if(data["0"]["precondition_6"] === 0 || data["0"]["precondition_6"] === null){
      this.coronaForm.chk05.setValue(false);
    }else{ 
      this.coronaForm.chk05.setValue(true);
    }
    if(data["0"]["precondition_7"] === 0 || data["0"]["precondition_7"] === null){
      this.coronaForm.chk06.setValue(false);
    }else{ 
      this.coronaForm.chk06.setValue(true);
    }
    if(data["0"]["precondition_8"] === 0 || data["0"]["precondition_8"] === null){
      this.coronaForm.chk07.setValue(false);
    }else{ 
      this.coronaForm.chk07.setValue(true);
    }
    if(data["0"]["precondition_9"] === 0 || data["0"]["precondition_9"] === null){
      this.coronaForm.chk08.setValue(false);
    }else{ 
      this.coronaForm.chk08.setValue(true);
    }
    if(data["0"]["precondition_10"] === 0 || data["0"]["precondition_10"] === null){
      this.coronaForm.chk09.setValue(false);
    }else{ 
      this.coronaForm.chk09.setValue(true);
    }
    if(data["0"]["precondition_11"] === 0 || data["0"]["precondition_11"] === null){
      this.coronaForm.chk10.setValue(0);
    }else{ 
      this.coronaForm.chk10.setValue(1);
    }
    if(data["0"]["precondition_12"] === 0 || data["0"]["precondition_12"] === null){
      this.coronaForm.chk11.setValue(false);
    }else{ 
      this.coronaForm.chk11.setValue(true);
    }
    if(data["0"]["other_factor"] === null){
      this.coronaForm.otherFactor.setValue("");
    }else{
      this.coronaForm.otherFactor.setValue(data["0"]["other_factor"]);
    }
    this.arrayCronica = data["0"]["array_cronica"];
    if(data["0"]["height"] === "" || data["0"]["height"] === null){
      this.coronaForm.height.setValue(0);
    }else{
      this.coronaForm.height.setValue(Number(data["0"]["height"]));
    }
    if(data["0"]["weight"] === "" || data["0"]["weight"] === null){
      this.coronaForm.weight.setValue(0);
    }else{
      this.coronaForm.weight.setValue(Number(data["0"]["weight"]));
    }
    if(data["0"]["imc"] == "" || data["0"]["imc"] == null){
      this.coronaForm.imc.setValue(0);
    }else{
      this.coronaForm.imc.setValue(Number(data["0"]["imc"]));
    }
    if(data["0"]["transport"] == null){
      this.coronaForm.transportId.setValue(0);
    }else{
      this.coronaForm.transportId.setValue(data["0"]["transport"]);
    }
    this.arrayCoronaRelationshipValue = data["0"]["array_family"]
      // iteracion para mostrar los valores en los inputs de las enfermedades cronicas que tengan como opcion 'Otro tipo de enfermedad...'
      if (this.arrayCronica.length > 0) {
        /* console.log("ENTRO ARRAY CRONICA"); */
        let objeto: RequestCronicasDto;
        this.arrayCronica.forEach(element => {
          this.select.push(element["id_corona_condition_detail"]);
          this.coronaForm.codeSelect.setValue(this.select);
          objeto = {
            id_employee: this.employeeId,
            id_cor_con_det: element["id_corona_condition_detail"],
            other_cor_det: this.coronaForm.inmunosupresionSick.value,
            created_by: this.user.id, updated_by: this.user.id
          }
          this.arrayAuxRequestCondition.push(objeto)
          this.ref.detectChanges();
        });
        this.showOrHideUpload(this.arrayAuxRequestCondition);
        if (this.coronaForm.imc.value > 0) {
          this.txtPreRegister = 1;
          this.ref.detectChanges();
        }
        this.arrayCronica.forEach(element => {
          if (element["id_corona_condition_detail"] === 14) {
            this.coronaForm.inmunosupresionSick.setValue(element.other_chronic_diseases);
            this.conditionEnfermedadesInmunosupresion = true;
          }
          if (element["id_corona_condition_detail"] === 15) {
            this.coronaForm.cardiovascularesSick.setValue(element.other_chronic_diseases);
            this.conditionEnfermedadesCardiovasculares = true;
          }
          if (element["id_corona_condition_detail"] === 16) {
            this.coronaForm.pulmonaresCronicasSick.setValue(element.other_chronic_diseases);
            this.conditionEnfermedadesPulmonares = true;
          }
          this.ref.detectChanges();
        });
      }
      this.ref.detectChanges();
  }
  // remove family by id
  // success
  removeById(id) {
      // Busca un objeto del arreglo y obtengo el indice en el cual se encuentre registrado.
      const index = this.arrayCoronaRelationshipValue.indexOf(this.arrayCoronaRelationshipValue.find(id_x => id_x.id === id))
      // elimino el objeto segun su indice a nivel de frontEnd.
      this.arrayCoronaRelationshipValue.splice(index, 1);
      const sizeArray = this.arrayCoronaRelationshipValue.length;
      // valido el tamaño del array. Si el length es 0, elimino el sessionStorage Family, caso contrario, no.
      this.validateSizeRemoveId(sizeArray);
  }
  validateSizeRemoveId(sizeArray:number){
    if (sizeArray < 0) {
      /* console.log("SIZE ARRAY EQUAL 0"); */
      this.conditionShowTable = false;
      this.coronaForm.chk10.setValue(0);
      this.ref.detectChanges();
    }
  }
  // test success
  removeAccess() {
    this.coronaFormService.removeAccessPass(this.employeeId).
    subscribe(resp => {
      this.responseRemoveAcces(resp);
    })
  }
  // test success
  responseRemoveAcces(resp:any){
    if (resp["condition"] !== false) {
      this.coronaFormService.showAlertCoronaForm("success", resp["message"]);
    } else {
      this.coronaFormService.showAlertCoronaForm("error", resp["message"]);
    }
  }
  // Permite realizar el registro de estado en la tabla dhr_corona_request(Cabecera) y dhr_corona_request_detail(Historico)
  // replace save_post_validate
  // test successs
  savePostCoronaRequest(flagValidation: number) {
    let flagFamily = false;
    let flagImc = false;
    let flagImc1 = false;
    let flagImc2 = false;
    let flagTransport = false;
    const transportId = this.coronaForm.transportId.value;
    if (flagValidation === 1) {
      this.registerCoronaRequest(this.arrayAuxRequestCondition,
         this.arrayCoronaRelationshipValue,this.data);
    } else {
      /*validacion*/
      if (transportId === 0) {
        this.coronaFormService.showAlertCoronaForm("warning", "Necesita selecciona un medio de transporte para generar su registro.");
        flagTransport = false;
      } else {
        flagTransport = true;
      }
      if (this.coronaForm.chk10.value === 1 && this.arrayCoronaRelationshipValue.length === 0) {
        this.coronaFormService.showAlertCoronaForm("warning", "Es obligatorio registrar por lo menos un familiar, si tiene seleccionado la opción de 'Vives con alguien de o con exposición de Riesgo'")
        flagFamily = false;
      } else {
        flagFamily = true;
      }
      if (!(Number(this.coronaForm.height.value) > 0 && (Number(this.coronaForm.height.value) >= 100 && Number(this.coronaForm.height.value) <= 250))) {
        flagImc1 = false;
        this.coronaFormService.showAlertCoronaForm('error', "Error, altura incorrecta. Los valores aceptados tienen que estar dentro del rago de 100cm hasta 250cm")
      } else {
        flagImc1 = true;
      }
      if (!(Number(this.coronaForm.weight.value) > 0 && Number(this.coronaForm.weight.value) <= 250)) {
        flagImc2 = false;
        this.coronaFormService.showAlertCoronaForm('error', "Error, el peso ingresado es incorrecto.");
      } else {
        flagImc2 = true;
      }
      if (Number(this.coronaForm.imc.value) <= 0) {
        flagImc = false;
        this.coronaFormService.showAlertCoronaForm('warning', "Es obligatorio calcular su IMC para poder realizar el registro de su solicitud.");
      } else {
        flagImc = true;
      }
      if (flagImc === true && flagFamily === true && flagTransport === true && flagImc1 === true && flagImc2 === true) {
        this.registerCoronaRequest(this.arrayAuxRequestCondition, 
          this.arrayCoronaRelationshipValue,this.data);
      }
    }


  }
  // register corona request by corona home
  // success
  registerCoronaRequest(arrayAuxRequestCondition: Array<RequestCronicasDto>, arrayCoronaRelationshipValue: Array<RequestFamilyDto>,
    data:any) {
    try {
      arrayAuxRequestCondition.forEach(element => {
        if (element.id_cor_con_det == 14) {
          /* console.log("COR 14") */
          element.other_cor_det = this.coronaForm.inmunosupresionSick.value;
        }
        if (element.id_cor_con_det == 15) {
          /* console.log("COR 15") */
          element.other_cor_det = this.coronaForm.cardiovascularesSick.value;
        }
        if (element.id_cor_con_det == 16) {
          /* console.log("COR 16") */
          element.other_cor_det = this.coronaForm.pulmonaresCronicasSick.value;
        }
      })
      let request: RequestCoronaHomeDto;
      request = {
        array_family: arrayCoronaRelationshipValue, array: arrayAuxRequestCondition,
        id_employee: this.employeeId === null ? "" : this.employeeId,
        phone: this.coronaForm.telef.value === null ? "" : this.coronaForm.telef.value,
        mail: this.coronaForm.mail.value === null ? "" : this.coronaForm.mail.value,
        contact_warning:this.coronaForm.contactWarning.value === null ? "" : this.coronaForm.contactWarning.value,
        tef_contact_warning:this.coronaForm.tefContactWarning.value === null ? "": this.coronaForm.tefContactWarning.value, 
        address: this.coronaForm.address.value === null ? "" : this.coronaForm.address.value,
        id_corona_reason: this.coronaForm.healthPerson.value === null ? "" : this.coronaForm.healthPerson.value,
        comment: this.coronaForm.comment.value === null ? "" : this.coronaForm.comment.value,
        status_det: this.coronaForm.statusWork.value === null ? "" : this.coronaForm.statusWork.value,
        id_corona_type: this.coronaForm.typeWork.value === null ? "" : this.coronaForm.typeWork.value,
        id_country: this.coronaForm.countryId.value === null ? 0 : this.coronaForm.countryId.value,
        id_precondition_1: this.coronaForm.chk00.value === false ? 0 : 1,
        id_precondition_2: this.coronaForm.chk01.value === false ? 0 : 1,
        id_precondition_3: this.coronaForm.chk02.value === false ? 0 : 1,
        id_precondition_4: this.coronaForm.chk03.value === false ? 0 : 1,
        id_precondition_5: this.coronaForm.chk04.value === false ? 0 : 1,
        id_precondition_6: this.coronaForm.chk05.value === false ? 0 : 1,
        id_precondition_7: this.coronaForm.chk06.value === false ? 0 : 1,
        id_precondition_8: this.coronaForm.chk07.value === false ? 0 : 1,
        id_precondition_9: this.coronaForm.chk08.value === false ? 0 : 1,
        id_precondition_10: this.coronaForm.chk09.value === false ? 0 : 1,
        id_precondition_11: this.coronaForm.chk10.value,
        id_precondition_12: this.coronaForm.chk11.value === false ? 0 : 1,
        other_factor: this.coronaForm.otherFactor.value,
        date_reason: this.coronaForm.reasonDate.value !== "" ? this.datePipe.transform(this.coronaForm.reasonDate.value, 'yyyy-MM-dd') : "",
        date_type: this.coronaForm.typeDate.value !== "" ? this.datePipe.transform(this.coronaForm.typeDate.value, 'yyyy-MM-dd') : "",
        weight: this.coronaForm.weight.value, height: this.coronaForm.height.value,
        imc: this.coronaForm.imc.value, transport: this.coronaForm.transportId.value,
        created_by: this.user.id, updated_by: this.user.id
      }

      let flagCondition = 1;
      let genericMessage = "";
      let otherMessage = "";
      if (this.coronaForm.requestId.value === 0) {
        /* console.log("REQUEST ID 0") */
        genericMessage = "Si no ingreso direccion,telefono/celular o estado de salud, no podra completar su registro.";
        flagCondition = 0;
      }
      if (data === null) {
        /* console.log("DATA NULL"); */
        if (this.coronaForm.telef.value === "") {
          /* console.log("TELEFONO") */
          genericMessage = "Si no ingreso direccion,telefono/celular o estado de salud, no podra completar su registro."
          flagCondition = 0;
        }
        if (this.coronaForm.address.value === "") {
          genericMessage = "Si no ingreso direccion,telefono/celular o estado de salud, no podra completar su registro.";
          flagCondition = 0;
        }
        if(this.coronaForm.tefContactWarning.value === ""){ 
          genericMessage = "Si no ingreso el teléfono del contacto de emergencia, no podra completar su registro.";
          flagCondition = 0;
        }
        if(this.coronaForm.contactWarning.value === ""){ 
          genericMessage = "Si no ingreso su contacto de emergencia, no podra completar su registro.";
          flagCondition = 0;
        }
      }
      if (this.coronaForm.pulmonaresCronicasSick.value === "" && this.conditionEnfermedadesPulmonares === true) {
        flagCondition = 0;
        otherMessage = "Si usted selecciono algun de otro tipo de enfermedad cronica, debe de especificar cual es, caso contrario, no podra completar su registro."
      }
      if (this.coronaForm.cardiovascularesSick.value === "" && this.conditionEnfermedadesCardiovasculares === true) {
        flagCondition = 0;
        otherMessage = "Si usted selecciono algun de otro tipo de enfermedad cronica, debe de especificar cual es, caso contrario, no podra completar su registro."

      }
      if (this.coronaForm.inmunosupresionSick.value === "" && this.conditionEnfermedadesInmunosupresion === true) {
        flagCondition = 0;
        otherMessage = "Si usted selecciono algun de otro tipo de enfermedad cronica, debe de especificar cual es, caso contrario, no podra completar su registro."

      }
      if (this.coronaForm.chk11.value === true && this.coronaForm.otherFactor.value === "") {
        flagCondition = 0;
        otherMessage = "Si usted selecciono algun de otro tipo de factor de riesgo, debe de especificar cual es, caso contrario, no podra completar su registro."
      }
      if (flagCondition === 0) {
        /* console.log("FLAG CONDITION 0") */
        this.coronaFormService.showAlertCoronaForm('warning', genericMessage + "\n" + otherMessage);

      } else {
        this.blockUI.start('Guardando datos...');
        this.coronaFormService.registerCoronaRequest(request).toPromise().then(data => {
          this.responseSavePostRequest(data);
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  // test success
  responseSavePostRequest(data){ 
    if (data["rpt"] === 1) {
      this.coronaFormService.showAlertCoronaForm('success', "Hemos guardado tus cambios, recuerda que puedes modificar y/o actualizar tu estado de salud cuando sea necesario.");
      this.getDataForEditAdmin(this.employeeId);
      this.arrayAuxRequestCondition = []
      this.ref.detectChanges();
    } else {
      this.coronaFormService.showAlertCoronaForm('error', data["message"]);
    }
    this.blockUI.stop();
  }
  // test in progress
  showModalRelationship(param: any) {
    let dialogRef: any;
    if (param === 1) {
      if (this.coronaForm.chk10.value !== 0) {
        dialogRef = this.dialog.open(ModalRelationshipComponent, {
          width: '80%',
          minWidth : "350px",
          height: '500px',
          data: {
            relationship: this.arrayCoronaRelationship,
            requestId: this.coronaForm.requestId.value
          }
        });
      }
    }
    if (this.coronaForm.chk10.value === 0) {
      this.conditionShowTable = false;
    }
    if (param === 2) {
      dialogRef = this.dialog.open(ModalRelationshipComponent, {
        width: '80%',
        minWidth : "350px",
        height: '500px',
        data: {
          relationship: this.arrayCoronaRelationship,
          requestId: this.coronaForm.requestId.value
        }
      });
    }
    try {
      dialogRef.afterClosed().subscribe(response => {
        /* console.log("AFTERCLOSED RELATIONSHIP"); */
        let afterCloseArrayRelationship: Array<RequestFamilyDto> = [];
        try {
          afterCloseArrayRelationship = response["response"];
          if (afterCloseArrayRelationship.length > 0) {
            afterCloseArrayRelationship.forEach(element => {
              this.arrayCoronaRelationshipValue.push(element);
              this.ref.detectChanges();
            });
          }
          if (this.arrayCoronaRelationshipValue.length > 0) {
            this.conditionShowTable = true;
            this.ref.detectChanges();
          }
        } catch (error) {
          console.log(error)
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  change_id_to_name(id_reason, status_det, type, country) {
    console.log("CHANGE ID TO NAME");
    for (let value of this.arrayCoronaReason) {
      if (id_reason === value["id"]) {
        this.coronaForm.healthPerson.setValue(value["id"]);
      }
    }
    for (let value of this.arrayCoronaStatus) {
      if (status_det === value["id"]) {
        this.coronaForm.statusWork.setValue(value["id"]);
      }
    }
    for (let value of this.arrayCoronaType) {
      if (type === value["id"]) {
        this.coronaForm.typeWork.setValue(value["id"]);
      }
    }
    for (let value of this.arrayCoronaCountry) {
      if (country === value["id"]) {
        this.coronaForm.countryId.setValue(value["id"]);
      }
    }
    this.ref.detectChanges();
  }
  //files variables
  src: any;
  type: any;
  filename: any;
  // Metodo que permite obtener los atributos del archivo seleccionado 
  // para su almacenamiento en el repositorio en la nube y registro en la DB.
  uploadFileHome(event) {
    try {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.src = JSON.stringify(reader.result);
        this.type = file["type"]
        this.filename = file["name"]
        this.saveCoronaDocument(this.src, this.documentId, TYPEDOC, CATEGORYDOC, this.filename, this.employeeId, this.user.id,"coronavirus_dev");
        this.ref.detectChanges();
      };
    } catch (error) {
      /* console.log(error) */
    }
  }
  // Permite descargar los archivos almancenados en el repositorio por medio de la url,contenedor y nombre de archivo.
  // test success
  getFileAttach() {
    const a = document.createElement("a");
    a.href = ("https://storageqallarix.blob.core.windows.net/rhdigital/coronavirus_dev/" + this.coronaForm.filename.value);
    a.download = this.coronaForm.filename.value;
    a.click();
  }
  // Permite cargar un documento hacia un repositorio en la nube y registrar algunos datos(ejem: nombre de archivo )
  //en la DB
  // Permite registar los datos en la base de datos de los archivos almacenados en la nube
  saveCoronaDocument(src, docId, typeDoc, catDoc, filename, employeeId, userId, container) {
    this.blockUI.start("Cargando documento...")
    this.coronaFormService.saveCoronaDocument(src, docId, typeDoc, catDoc, filename, employeeId, userId, container)
    .toPromise().then(data => {
        this.responseCoronaDocument(data);
    })
  }
  // test success
  responseCoronaDocument(data){
    if (data["condition"] == true) {
      this.blockUI.stop();
      this.coronaFormService.showAlertCoronaForm("success", data["message"]);
      this.getDataFormCoronavirus(this.employeeId);
    } else {
      this.blockUI.stop();
      this.coronaFormService.showAlertCoronaForm("error", data["message"]);
      
    }
    this.ref.detectChanges();
  }
  textValidate(text) {
    if (text === "Generico") {
      return ""
    } else {
      return text;
    }
  }
  // success
  ngOnInit() {
    /* console.log("NG ONINIT") */
    this.user = JSON.parse(localStorage.getItem("user"));
    this.moduleList=JSON.parse(localStorage.getItem("modules"));
    setTimeout(() => {
      this.legalEntity = this.user.relatedParty.legalId[0].legalEntity;
      if (!this.data.id) {
        this.employeeId = this.user.relatedParty.id;
        this.levelAccess = 1;
        this.conditionGeneral = true;
        this.backgroundColor = "#f7f8fa";
        this.flagValidation = 0;
      } else {
        /* console.log("NOT NULL") */
        this.employeeId = this.data.id;
        this.conditionGeneral = false;
        this.backgroundColor = "#FFFFFF";
        this.flagValidation = this.data.flag;
        this.levelAccess = this.data.levelAccess;

      }
      //load data
      this.getDataFormCoronavirus(this.employeeId);
    }, 10);
    this.initData(this.levelAccess,this.conditionLegalEntity);
    this.auth.validateMenu("CORONAVIRUS","/coronavirus/home",this.user,this.moduleList);
  }
  ngAfterViewInit(): void {
    this.auth.executeValidateSession(this.user);
  }
  // calculate imc
  caculateImc() {
    const w = Number(this.coronaForm.weight.value);
    const h = Number(this.coronaForm.height.value)
    if (w <= 0 || h <= 0) {
      this.coronaForm.imc.setValue(0);
    } else {
      const auxImc = w / (Math.pow(h / 100, 2));
      this.coronaForm.imc.setValue(Number(parseFloat(String(auxImc)).toFixed(2)));
    }

  }
  returnCoronaForm() {
    this.returnUrl = "/coronavirus/home"
    //BlockUI Start
    this.router.navigateByUrl(this.returnUrl);
  }

}
