import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { IMainUser } from '../../../../../../../app/business/models/IModel-module';
import Swal from 'sweetalert2';
import { IRequestAddSupplier } from '../../models/RequestSupplier';
import { SupplierManagerService } from '../../services/supplier-manager.service';
import { SupplierManagerReactiveService } from './supplier-manager-reactive.service';

@Component({
  selector: 'app-modal-add-manager-supplier',
  templateUrl: './modal-add-manager-supplier.component.html',
  styleUrls: ['./modal-add-manager-supplier.component.scss']
})
export class ModalAddManagerSupplierComponent implements OnInit {
  result:boolean = false;
  @BlockUI() blockUI: NgBlockUI;
  company:any=null;
  user:IMainUser=null;
  supplier: IRequestAddSupplier = {
    name:'',
    lastName1:'',
    lastName2:'',
    nationalId:'',
    codeCompany:'',
    idCompany:0,
    mail:'',
    birthdate:'',
    gender:'',
    activity:''
  }
  disabledCondition=false;
  formCondition=false;
  messageCondition="";
  showMessageCondition=false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dat: any,
    private ref:ChangeDetectorRef,
    public dialogRef:MatDialogRef<ModalAddManagerSupplierComponent>,
    private datePide:DatePipe,
    private supplierManager:SupplierManagerService,
    public supplierForm:SupplierManagerReactiveService
  ) { 
    
    }
    // test success
    initData(){
      /* console.log("EXECUTE INITDATA"); */
      this.user=JSON.parse(localStorage.getItem("user"));
        this.company = this.dat.comp;
        this.resetFormSupplier();
    }
    disableConditionExists(condition:boolean){
      if(condition){
        this.supplierForm.activity.disable();
        this.supplierForm.birthDate.disable();
        this.supplierForm.codeCompany.disable();
        this.supplierForm.gender.disable();
        this.supplierForm.lastName1.disable();
        this.supplierForm.lastName2.disable();
        this.supplierForm.mail.disable();
        this.supplierForm.nationalId.disable();
        this.supplierForm.name.disable();
        this.supplierForm.codeCompany.disable();
      }else{
        this.supplierForm.activity.enable();
        this.supplierForm.birthDate.enable();
        this.supplierForm.codeCompany.enable();
        this.supplierForm.gender.enable();
        this.supplierForm.lastName1.enable();
        this.supplierForm.lastName2.enable();
        this.supplierForm.mail.enable();
        this.supplierForm.nationalId.enable();
        this.supplierForm.name.enable();
        this.supplierForm.codeCompany.enable();
      }
    }
    // test success
    resetFormSupplier(){
      /* console.log("EXECUTE RESETFORMSUPPLIER"); */
      this.supplierForm.name.setValue("");
      this.supplierForm.lastName1.setValue("");
      this.supplierForm.lastName2.setValue("");
      this.supplierForm.codeCompany.setValue("");
      this.supplierForm.mail.setValue("");
      this.supplierForm.birthDate.setValue("");
      this.supplierForm.gender.setValue("");
      this.supplierForm.activity.setValue("");
      this.disabledCondition=false;
      this.disableConditionExists(this.disabledCondition);
    }
    // test success
    showSweetAlertCondition(i:any,message:string){
      Swal.fire({
        icon:i,
        text:message
      })
    }
    // test success
    validateSupplierDocument(nationalId:string):boolean{
      if(nationalId===""){
        this.showSweetAlertCondition('info',"Necesita ingresar un nro. de documento para verificar si existen datos asociados.");
        return false;        
      }
      return true;
    }
    // test success
    nextForm(){
      if(this.validateSupplierDocument(this.supplierForm.nationalId.value)){
        this.supplierManager.searchSupplierDocument(this.supplierForm.nationalId.value,'U',this.company.id).toPromise().then(
          (response)=>{ 
            this.responseSearchSupplier(response);
          }
        );
      }
    }
    captureSupplier():IRequestAddSupplier{
      return this.supplier = {
          name:this.supplierForm.name.value,
          idCompany:this.company.id,
          lastName1:this.supplierForm.lastName1.value,
          lastName2:this.supplierForm.lastName2.value,
          nationalId:this.supplierForm.nationalId.value,
          codeCompany:this.supplierForm.codeCompany.value,
          mail:this.supplierForm.mail.value,
          birthdate:this.supplierForm.birthDate.value,
          gender:this.supplierForm.gender.value,
          activity:this.supplierForm.activity.value
      }
      
    }
    // test success
    responseSearchSupplier(supp:any){
/*       console.log("RESPONSE SEARCH SUPPLIER");
 */
      if(supp["condition"]==true){
        this.supplierForm.name.setValue(supp["supp"]["name"]);
        this.supplierForm.lastName1.setValue(supp["supp"]["lastName1"]);
        this.supplierForm.lastName2.setValue(supp["supp"]["lastName2"]);
        this.supplierForm.mail.setValue(supp["supp"]["mail"]);
        this.supplierForm.birthDate.setValue(supp["supp"]["birthdate"]==null||supp["supp"]["birthdate"]=="0000-00-00 00:00:00"?
        "":this.datePide.transform(supp["supp"]["birthdate"],'yyyy-MM-dd'));
        this.supplierForm.gender.setValue(supp["supp"]["gender"]);
        this.supplierForm.activity.setValue(supp["supp"]["activity"]);
        this.supplierForm.codeCompany.setValue(supp["supp"]["codeCompany"]);
        this.disabledCondition=true;
        this.disableConditionExists(this.disabledCondition);
        this.showMessageCondition=false;
        this.formCondition=true;
        this.ref.detectChanges();
      }else{
        this.resetFormSupplier();
        if(supp["message"]==""){
          this.formCondition=true;
          this.ref.detectChanges();
        }else{
          this.showMessageCondition=true;
          this.messageCondition=supp["message"]
          this.ref.detectChanges();
        }
        
      }
    }
    // test success
    previousForm(){
      this.supplierForm.nationalId.setValue("");
      this.resetFormSupplier()
      this.formCondition=false;
    }

  // test success
  ngOnInit(): void {
    /* console.log("NG INIT") */
    this.supplierForm.nationalId.setValue("");
    this.initData();
  }
  // test success
  validateAddSupplier(suprev:IRequestAddSupplier){
    let campo = '';
    let success = true;
    if (suprev.nationalId === ""){
      campo = "DNI";
      success = false;
    } else if (suprev.name === ''){
      campo = "Nombre";
      success = false;
    }else if (suprev.lastName1 === ''){
      campo = "Apellido paterno";
      success = false;
    }else if (suprev.lastName2 === ''){
      campo = "Apellido materno";
      success = false;
    }else if (suprev.mail === ''){
      campo = "Correo";
      success = false;
    }
    return { 
      "message":campo,
      "condition":success};
  }
  // test in progress
  addNewSupplier(){
    const responseValidate=this.validateAddSupplier(this.captureSupplier());
    this.addSubNewSupplier(responseValidate);
  }
  addSubNewSupplier(responseValidate:any){
    if (!!responseValidate["condition"]){
      this.supplier.idCompany = this.company.id;    
      const request = [{
        supplier: this.captureSupplier(),
        user_id: this.user.id,
        type: 'mng',
        typeAction:"U"

      }]
      this.blockUI.start("Procesando...")
      this.supplierManager.addNewSupplier(request).toPromise().then(resp => {
          this.responseAddNewSupplier(resp);
      })
    }
    else{
      Swal.fire({
        icon:'warning',
        title:"El campo " + responseValidate["message"] + " es obligatorio"
      })
    }
  }
  // test success
  responseAddNewSupplier(response:any){
    this.responseAddSupplier(response);
        this.dialogRef.close({
          "result":this.result,
          "mail":this.supplierForm.mail.value
        });
  }
  // test success
  responseAddSupplier(response:any){
    this.blockUI.stop();
        if (response['status'] == 1){
          this.showSweetAlertCondition('success',"Creación exitosa");
          this.result = true;
        }else{
          this.showSweetAlertCondition('error',response['errors']);
        }
  }
  // test success
  closeDialog(){
    this.dialogRef.close()
  }
}
