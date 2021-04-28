import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { IMainUser } from '../../../../../../../app/business/models/IModel-module';
import Swal from 'sweetalert2';
import { IResponseManagementSupplier } from '../../models/ResponseSupplier';
import { SupplierEnabledService } from '../../services/supplier-enabled.service';
import { SupplierAdminSupplierReactiveService } from '../supplier-admin-supplier/supplier-admin-reactive.service';

@Component({
  selector: 'app-modal-enabled-supplier',
  templateUrl: './modal-enabled-supplier.component.html',
  styleUrls: ['./modal-enabled-supplier.component.scss']
})
export class ModalEnabledSupplierComponent implements OnInit {
  // test success
  document:any="";
  @BlockUI() blockUI: NgBlockUI;
  filename:string = "No se seleccionó archivo."
  supplier:IResponseManagementSupplier = null;
  checkbox:boolean=false;
  fileloaded:boolean=false;
  @ViewChild('atachfileInput',{static:false}) inputAttachFile;
  user:IMainUser=null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IResponseManagementSupplier,
    public dialogRef:MatDialogRef<ModalEnabledSupplierComponent>,
    public supplierServ:SupplierEnabledService,
    public supplierForm:SupplierAdminSupplierReactiveService,
    private ref:ChangeDetectorRef
  ) {
    
   }
   // test success
   initData(dat: IResponseManagementSupplier){
    this.supplier=dat;
    this.user=JSON.parse(localStorage.getItem("user"));
   }
   // test success
   closeDialog(){
    this.dialogRef.close();
  }
  // test success
  showAlertByCondition(banner:any,message:string){
    this.blockUI.stop();
    Swal.fire({
      icon:banner,
      title:message
    });
  }
  sendRequest(){
    if(this.validateAccept(this.supplierForm.checkbox.value,this.fileloaded)){
      this.blockUI.start("Procesando");
    this.supplierServ.sendDocumentBySupplier(this.supplier.id,this.document,this.user.id).then(
      (response) => {
      this.responseSendRequest(response);
    },
    (error:HttpErrorResponse)=>{
      this.showAlertByCondition('error',error.statusText);
    })
    }
    
  }
  // test success
  responseSendRequest(response:any){
    this.blockUI.stop();
    if (response['status'] == 1){
      Swal.fire({
        icon:"success",
        title:"El usuario fue habilitado"
      });
    }else{
      Swal.fire({
        icon:"error",
        title:"Se produjo un error",
        text:"Vuelva a intentarlo más tarde."
      });
    }
    this.dialogRef.close();
  }
  // test success
  attachFileChange=(e)=>{
    /* console.log("FILE DATA") */
    const file = e.target.files[0];
    const reader = new FileReader();
    /* console.log("READDATA") */
    reader.readAsDataURL(file);
    reader.onload = () => {
      /* console.log("READLOAD") */
      this.document = reader.result;
      this.filename = file['name']
      this.fileloaded = true;
    }
  }
  // test success
  clickAttachFile=()=>{
    this.inputAttachFile.nativeElement.click();
  }
  // test success
  ngOnInit(): void {
    this.initData(this.data);
  }
  // test success
  validateAccept(check:boolean,file:boolean){
    if(check===false){ 
      this.showAlertByCondition('error',"Necesita seleccionar el check de confirmación de revisón medica.");
      return false;
    }
    if(file===false){
      this.showAlertByCondition('error','Necesita adjuntar un documento para habilitar al colaborador.')
      return false;
    }
    return true;
  }
}
