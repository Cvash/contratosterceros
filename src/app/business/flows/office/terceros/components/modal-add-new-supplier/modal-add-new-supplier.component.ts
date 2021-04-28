import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { IMainUser } from '../../../../../../../app/business/models/IModel-module';
import Swal from 'sweetalert2';
import { IRequestAddNewSupplier } from '../../models/RequestSupplier';
import { SupplierManagerService } from '../../services/supplier-manager.service';
import { SupplierManagerReactiveService } from '../modal-add-manager-supplier/supplier-manager-reactive.service';

@Component({
  selector: 'app-modal-add-new-supplier',
  templateUrl: './modal-add-new-supplier.component.html',
  styleUrls: ['./modal-add-new-supplier.component.scss']
})
export class ModalAddNewSupplierComponent implements OnInit {
  // test success
  @BlockUI() blockUI: NgBlockUI;
  // FORMULARIO
  company: any = null;
  supplier: IRequestAddNewSupplier = {
    id: 0,
    name: '',
    lastName1: '',
    lastName2: '',
    nationalId: '',
    codeCompany: '',
    idCompany: 0,
    mail: '',
    birthdate: null,
    gender: '',
    activity: '',
    coronaStatus: 1,
    statusDetail: ''
  }
  user: IMainUser = null;
  formCondition:boolean = false;
  messageCondition = "";
  showMessageCondition:boolean = false;
  create: boolean = true;
  result: boolean = false;
  companyId = null;
  submitText = "Crear usuario"
  titleForm = "Registrar nuevo usuario";
  supplierId: number = 0;
  suppliersCompanyService: Array<any> = [];
  disabledCondition:boolean = false;
  serviceId = null;
  actionForm = "";
  edit: boolean = true;
  conditionService:boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalAddNewSupplierComponent>,
    private datePipe: DatePipe,
    public supplierForm: SupplierManagerReactiveService,
    private ref: ChangeDetectorRef,
    public supplierManager: SupplierManagerService
  ) {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.supplierForm.nationalId.setValue("");
    
  }
  // test success
  capturedataEdit() {
    this.supplierForm.nationalId.setValue(this.supplier.nationalId);
    this.supplierForm.name.setValue(this.supplier.name);
    this.supplierForm.lastName1.setValue(this.supplier.lastName1);
    this.supplierForm.lastName2.setValue(this.supplier.lastName2);
    this.supplierForm.codeCompany.setValue(this.supplier.codeCompany);
    this.supplierForm.mail.setValue(this.supplier.mail);
    this.supplierForm.birthDate.setValue(this.supplier.birthdate);
    this.supplierForm.gender.setValue(this.supplier.gender);
    this.supplierForm.activity.setValue(this.supplier.activity);
    this.disabledCondition = false;
    this.supplierForm.serviceId.setValue(0);
  }
  // test success
  initData(data:any) {
    this.companyId = data.idCompany;
    this.suppliersCompanyService = data.supplierOption;
    this.supplierForm.serviceId.setValue(data.idService);
    if (data.supplier !== null) {
      let date =  data.supplier.birthdate==="None"||data.supplier.birthdate===null
      ||data.supplier.birthdate==="0000-00-00 00:00:00"
        ? "" : this.datePipe.transform(data.supplier.birthdate, 'yyyy-MM-dd');
      this.supplier = { ...data.supplier, birthdate: date }
      this.supplierId = this.supplier.id;
      this.titleForm = "Editar usuario " + this.supplier.name
      this.create = false;
      this.edit = data.conditionEdit;
    }
    this.actionForm = this.data.actionForm;
    if (this.actionForm === "E") {
      this.capturedataEdit();
    }
  }
  // test success
  loadOnInit(data:any,actionForm:string) {
    if (actionForm === "S") {
      /* console.log("ENTRO S") */
      if (data.idService != 0) {
        this.conditionService = true;
      }
    }
    if (actionForm === "E") {
      /* console.log("ENTRO E") */
      this.submitText = "Guardar cambios"
    }
  }
  // test in progress
  resetFormSupplier() {
    this.supplierForm.nationalId.setValue("");
    this.supplierForm.name.setValue("");
    this.supplierForm.lastName1.setValue("");
    this.supplierForm.lastName2.setValue("");
    this.supplierForm.codeCompany.setValue("");
    this.supplierForm.mail.setValue("");
    this.supplierForm.birthDate.setValue("");
    this.supplierForm.gender.setValue("");
    this.supplierForm.activity.setValue("");
    this.disabledCondition = false;
    this.supplierForm.serviceId.setValue(0);
  }
  // test success
  showSweetAlertCondition(i: any, message: string) {
    Swal.fire({
      icon: i,
      text: message
    })
  }
  // test success
  validateSupplierDocument(nationalId: string): boolean {
    if (nationalId === "") {
      this.showSweetAlertCondition('info', "Necesita ingresar un nro. de documento para verificar si existen datos asociados.");
      return false;
    }else{
      return true;
    }
    
  }
  // test success
  nextForm(actionForm:string) {
    this.searchSupplierByDocument(this.supplierForm.nationalId.value, 'mng');
    if (actionForm === "S") {
      if (this.supplierForm.serviceId.value !== 0) {
        let index = this.suppliersCompanyService.indexOf(this.suppliersCompanyService.find(o => o.id === this.supplierForm.serviceId.value));
        const serviceId = this.suppliersCompanyService[index].id;
        this.supplierForm.serviceId.setValue(serviceId);
        this.supplierForm.serviceId.disable();
        this.ref.detectChanges();
      } else {
        this.supplierForm.serviceId.setValue(0);
      }
    }
  }
  searchSupplierByDocument(nationalId: string, type: string) {
    if (this.validateSupplierDocument(nationalId)) {
      this.supplierManager.searchSupplierDocument(this.supplierForm.nationalId.value, type, this.companyId).toPromise().then(
        (response) => {
          this.responseSearchSupplier(response,this.actionForm);
        },
        (error: HttpErrorResponse) => {
          this.showSweetAlertCondition("error", error.statusText);
        }
      );
    }
  }
  // test success
  responseSearchSupplier(supp: any,actionForm:string) {
    if (supp["condition"] == true) {
      this.supplierForm.name.setValue(supp["supp"]["name"]);
      this.supplierForm.lastName1.setValue(supp["supp"]["lastName1"]);
      this.supplierForm.lastName2.setValue(supp["supp"]["lastName2"]);
      this.supplierForm.mail.setValue(supp["supp"]["mail"]);
      this.supplierForm.birthDate.setValue(supp["supp"]["birthdate"] == null || supp["supp"]["birthdate"] == "0000-00-00 00:00:00" ?
        "" : this.datePipe.transform(supp["supp"]["birthdate"], 'yyyy-MM-dd'));
      this.supplierForm.gender.setValue(supp["supp"]["gender"]);
      this.supplierForm.activity.setValue(supp["supp"]["activity"]);
      this.supplierForm.codeCompany.setValue(supp["supp"]["codeCompany"]);
      this.showMessageCondition = false;
      this.formCondition = true;
      if (actionForm === "E") {
        /* console.log("EDITAR") */
        this.disabledCondition = false;
      } else {
        if (actionForm === "S") {
          /* console.log("GUARDAR") */
          this.disabledCondition = true;
        }
      }
      this.ref.detectChanges();
    } else {
      if (supp["message"] === "") {
        this.formCondition = true;
        this.ref.detectChanges();
      } else {
        this.showMessageCondition = true;
        this.messageCondition = supp["message"]
        this.ref.detectChanges();
      }

    }
  }
  // test success
  validateAddSupplier(suprev: IRequestAddNewSupplier) {
    let campo = '';
    let success = true;
    if (suprev.nationalId === "") {
      campo = "DNI";
      success = false;
    } else if (suprev.name === '') {
      campo = "Nombre";
      success = false;
    } else if (suprev.lastName1 === '') {
      campo = "apellido paterno";
      success = false;
    } else if (suprev.mail === '') {
      campo = "correo";
      success = false;
    } else if (suprev.lastName2 === ''){
      campo = "apellido materno";
      success = false;
    }
    return {
      "message": campo,
      "condition": success
    };
  }
  // test success
  captureNewSupplier(supplierId:number): IRequestAddNewSupplier {
    return this.supplier = {
      id: supplierId,
      name: this.supplierForm.name.value,
      idCompany: this.supplierForm.serviceId.value,
      lastName1: this.supplierForm.lastName1.value,
      lastName2: this.supplierForm.lastName2.value,
      nationalId: this.supplierForm.nationalId.value,
      codeCompany: this.supplierForm.codeCompany.value,
      mail: this.supplierForm.mail.value,
      birthdate: this.supplierForm.birthDate.value,
      gender: this.supplierForm.gender.value,
      activity: this.supplierForm.activity.value,
      coronaStatus: 1,
      statusDetail: ''
    }

  }
  addNewSupplier(create:boolean) {
    const responseValidate = this.validateAddSupplier(this.captureNewSupplier(this.supplierId));
    if (!!responseValidate["condition"]) {
      const request = [{supplier: this.captureNewSupplier(this.supplierId),user_id: this.user.id,type: 'sup',typeAction: "U"}]
      this.blockUI.start("Procesando...")
      if (create) {
        this.supplierManager.addNewSupplier(request).toPromise().then(response => {
          this.responseAddNewSupplier(response,"Creación exitosa.");
        })
      }
      if (create === false) {
        this.supplierManager.editNewSupplier(request, this.supplierForm.serviceId.value).toPromise()
          .then(
            (response) => {
              this.responseAddNewSupplier(response,"Datos actualizados.");
            }
          )
      }
      this.supplierForm.serviceId.enable();
    }
    else {
      Swal.fire({
        icon: 'warning',
        title: "El campo " + responseValidate["message"] + " es obligatorio"
      })
    }
  }
  // test success
  responseAddNewSupplier(response: any,message:string) {
    this.resetFormSupplier();
    this.blockUI.stop();
    if (response['status'] === 1) {
      this.showSweetAlertCondition('success',message);
      this.result = true;
    } else {
      this.showSweetAlertCondition('error', response['errors']);
    }
    this.dialogRef.close({
      "result": this.result,
      "mail": this.supplierForm.mail.value
    });
  }
  // test success
  ngOnInit(): void {
    this.initData(this.data);
    this.loadOnInit(this.data,this.actionForm);
  }
  // test success
  closeModal(): void {
    this.resetFormSupplier();
    this.dialogRef.close({
      "result":false
    });
  }
  // test success
  previousForm() {
    this.resetFormSupplier();
    this.formCondition = false;
  }
}
