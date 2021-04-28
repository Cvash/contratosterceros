import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ICode, IDelete } from '../../models/ResponseSupplier';
import { SupplierManagerReactiveService } from '../modal-add-manager-supplier/supplier-manager-reactive.service';

@Component({
  selector: 'app-modal-question-detele',
  templateUrl: './modal-question-detele.component.html',
  styleUrls: ['./modal-question-detele.component.scss']
})
export class ModalQuestionDeteleComponent implements OnInit {
  supplierName: string = "";
  serviceName: string = "";
  gestorName: string = "";
  serviceId = [];
  suppliersCompanyService: Array<any> = []
  messageCondition: string = "";
  typeAction: string = "";
  conditionService: boolean = false;
  arrayServiceValue:Array<ICode>=[]
  constructor(public supplierForm: SupplierManagerReactiveService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalQuestionDeteleComponent>,
    private ref: ChangeDetectorRef) { }
    // test success
    selectAll() {
    this.serviceId = []
    this.suppliersCompanyService.forEach(element => {
      this.serviceId.push(element.id);
    });
/*     console.log("SELECT ALL") */
    this.supplierForm.serviceId.setValue(this.serviceId);
    }
  // test success
  onNoClick() {
    let request: IDelete;
    request = {
      idService: 0,
      actionType: "S",
      cond: false,
      flagActive: 0
    }
    this.dialogRef.close(request);
  }
  // test success
  deleteSupplier(type:string) {
    this.serviceId=this.supplierForm.serviceId.value;
    let size=this.serviceId.length;
    this.requestDeleteSupplier(size,type);
    
  }
  // test success
  requestDeleteSupplier(size:number,type:string){
    if (size > 0) {
      let request: IDelete;
      /* console.log("ENTRAMOS") */
      request = {
        idService: this.serviceId,
        actionType: type,
        cond: true,
        flagActive: 1
      }
      this.dialogRef.close(request);
    } else {
      Swal.fire({
        icon: 'error',
        text: "Error, no se ha seleccionado algún servicio."
      })
    }
  }
  // test success
  getValues(event: {
    isUserInput: any;
    source: { value: any; selected: any };
  }) {
    try {
      if (event.isUserInput) {
        if (event.source.selected === true) {
          //save
          let request:ICode
          request={
            id:event.source.value
          }
          this.arrayServiceValue.push(request)
        } else {
          /* console.log("DELETE") */
          let index=this.arrayServiceValue.indexOf(this.arrayServiceValue.find(o=>o.id==event.source.value));
          this.arrayServiceValue.splice(index,1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  // test success
  initNgOnInit(data:any){
    if(data!==null){
      this.suppliersCompanyService=data.serviceOption===null?[]:data.serviceOption;
      this.supplierName=data.suppName;
      this.gestorName=data.gestorName;
      this.typeAction=data.typeAct;
      this.messageCondition="El colaborador tercero "+ this.supplierName + " no tiene servicios asignado por el gestor "+ this.gestorName +"."
 
    }
    if(this.typeAction==='D' && data.idService!==0){
      /* console.log("AQUI ENTRA OK") */
      this.serviceId.push(Number(data.idService).toString());
      this.supplierForm.serviceId.setValue(this.serviceId);
      this.conditionService=true;
      this.ref.detectChanges();
    }
  }
  // test success
  ngOnInit(): void {
    /* console.log("INIT") */
    this.initNgOnInit(this.data);
  }

}
