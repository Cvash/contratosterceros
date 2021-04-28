import { DatePipe, formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { IMainUser } from '../../../../../../../app/business/models/IModel-module';
import Swal from 'sweetalert2';
import { IRequestPostAddSupplier } from '../../models/RequestSupplier';
import * as XLSX from 'xlsx';
import { SupplierManagerService } from '../../services/supplier-manager.service';
import { SupplierAdminSupplierReactiveService } from '../supplier-admin-supplier/supplier-admin-reactive.service';
const SHEET_NAME = 'Hoja1';
@Component({
  selector: 'app-modal-massive-supplier',
  templateUrl: './modal-massive-supplier.component.html',
  styleUrls: ['./modal-massive-supplier.component.scss']
})
export class ModalMassiveSupplierComponent implements OnInit {
  // test success
  @BlockUI() blockUI: NgBlockUI;
  result: boolean = false;
  companyId: any = null;
  user: IMainUser = null;
  // EXCEL VARS
  SHEET_NAME = 'Hoja1';
  hojaDatos: any[] = [];
  errors: string[] = [];
  @ViewChild('fileinput', { static: false }) inputfileExcel;
  suppliersCompanyService: Array<any> = [];
  conditionService: boolean = false;
  serviceId: any = null;
  constructor(
    private sup: SupplierManagerService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalMassiveSupplierComponent>,
    public ref: ChangeDetectorRef,
    public supplierForm: SupplierAdminSupplierReactiveService
  ) {

  }
  // test success
  initNgOnInit(data: any) {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.companyId = data.idCompany;
    this.suppliersCompanyService = data.supplierOption;
    this.serviceId = data.idService;
    if (data.idService !== 0) {
      this.conditionService = true;
      this.ref.detectChanges();
    }
  }
  // test success
  validateSaveCorrects(serviceId: number) {
    if (serviceId === 0) {
      this.showAlertCondition('error', "Necesita seleccionar el servicio al cual se asignaran los usuarios.");
      return false;
    }
    return true;
  }
  // test success
  captureValueSaveCorrects(userId: any): Array<IRequestPostAddSupplier> {
    let request: Array<IRequestPostAddSupplier> = [];
    this.hojaDatos.forEach(element => {
      element.idCompany = this.serviceId;
      request.push({
        supplier: element,
        user_id: userId,
        type: "sup",
        typeAction: "M"
      })
    });
    return request;
  }
  saveCorrects() {
    this.serviceId = this.supplierForm.serviceId.value;
    if (this.validateSaveCorrects(this.serviceId)) {
      this.blockUI.start("Procesando");
      this.sup.findByNationalId(this.captureValueSaveCorrects(this.user.id)).subscribe(find => {
        this.responseFindByNationalId(find, this.captureValueSaveCorrects(this.user.id));
      })
    }
  }
  // test success
  responseFindByNationalId(find: any, request: Array<IRequestPostAddSupplier>) {
    if (find["status"] === 1) {
      // save request supplier
      this.saveMassiveSupplier(request);
    } else {
      this.showAlertCondition("error", find["errors"]);
    }
  }
  // test success
  showAlertCondition(banner: any, message: string) {
    this.blockUI.stop();
    Swal.fire({
      icon: banner,
      text: message,
    })
  }
  // test success
  saveMassiveSupplier(request: Array<IRequestPostAddSupplier>) {
    this.sup.addNewSupplier(request).toPromise().then(response => {
      this.responseSaveMassiveSupplier(response);
    })
  }
  // test success
  responseSaveMassiveSupplier(response: any) {
    this.blockUI.stop();
    if (response['status'] === 1) {
      this.showAlertCondition("success", "Creación exitosa");
      this.result = true;
    } else {
      this.showAlertCondition("error", response["errors"]);
    }
    this.dialogRef.close({
      result: true,
      dataSheet: this.hojaDatos
    });
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
  // VALIDACIONES test success
  ExcelDateToJSDate(date) {
    const exldate = new Date(Math.round((date - 25569) * 86400 * 1000))
    var strdate = formatDate(exldate, 'yyyy-MM-dd', 'en-US');
    return strdate;
  }
  // test success
  showAlertFileChange(banner: any, messageText: string, messageHtml: string) {
    Swal.fire({
      icon: banner,
      title: messageText,
      html: messageHtml
    })
  }
  validateSizeEquals(hojasDatos: any[]){
    if (hojasDatos.length === 0) {
      this.showAlertFileChange("error", "Error en el libro.", "No se encontró data en este libro.");
    }
  }
  // test success
  validateSheetValue(jsonData:any){
    // CORRECCIÓN Y VALIDACIÓN DE DATA:
    jsonData.forEach((row, idx) => {

      if (row.DNI && row.DNI != "") {
        // VALIDACIÓN DE OBLIGATORIOS
        if (row.DNI.length < 8)
          this.errors.push("Columna " + (idx + 2) + ": El documento de identidad debe tener al menos 8 digitos")
        else if (!row.CORREO)
          this.errors.push("Columna " + (idx + 2) + ": Correo es obligatorio")
        else if (!row.NOMBRE)
          this.errors.push("Columna " + (idx + 2) + ": Nombre es obligatorio")
        else if (!row.APELLIDO1 || !row.APELLIDO2)
          this.errors.push("Columna " + (idx + 2) + ": Apellidos son obligatorios")
        else if (row.GENERO && !(row.GENERO === "M" || row.GENERO === "F"))
          this.errors.push("Columna " + (idx + 2) + ": Genero solo puede ser M o F")
        else if (row.NACIMIENTO && isNaN(row.NACIMIENTO))
          this.errors.push("Columna " + (idx + 2) + ": Fecha de nacimiento debe ser formato fecha")
        else

          this.hojaDatos.push({
            activity: row.ACTIVIDAD ? row.ACTIVIDAD : '',
            birthdate: row.NACIMIENTO ? this.datePipe.transform(row.NACIMIENTO, 'yyyy-MM-dd') : '',
            codeCompany: row.CODIGO ? row.CODIGO : '',
            gender: row.GENERO ? row.GENERO : '',
            mail: row.CORREO,
            name: row.NOMBRE,
            lastName1: row.APELLIDO1 ? row.APELLIDO1 : '',
            lastName2: row.APELLIDO2 ? row.APELLIDO2 : '',
            nationalId: row.DNI,
            statusDetail: "",
            coronaStatus: 1,
            idCompany: this.companyId
          })
      }
    })
  }
  
  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    let headers: any[] = [];
    const reader = new FileReader();
    const file = ev.target.files[0];
    // Leer el libro excel cargado
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary', cellDates: true, cellNF: false, cellText: false });
      // Validar el libro
      if (workBook.SheetNames.includes(SHEET_NAME)) {
        const sheet = workBook.Sheets[SHEET_NAME];
        headers = this.getHeaderRow(sheet);
        jsonData = XLSX.utils.sheet_to_json(sheet, { raw: true, dateNF: "YYYY-MM-DD" });
        // CORRECCIÓN Y VALIDACIÓN DE DATA:
        this.validateSheetValue(jsonData);
        this.validateSizeEquals(this.hojaDatos)
      } else {
        this.showAlertFileChange("error", 'Error en el libro.', 'No se encontró la hoja <b>' + SHEET_NAME + '</b>.');
      }
    }
    reader.readAsBinaryString(file);
  }
  // test success
  onNoClick(): void {
    this.dialogRef.close({
      result: false
    });
  }
  // test success
  ngOnInit(): void {
    this.initNgOnInit(this.data);
  }

}
