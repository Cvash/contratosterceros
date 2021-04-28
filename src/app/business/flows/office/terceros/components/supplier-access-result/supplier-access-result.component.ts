import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMainUser } from '../../../../../../business/models/IModel-module';

@Component({
  selector: 'app-supplier-access-result',
  templateUrl: './supplier-access-result.component.html',
  styleUrls: ['./supplier-access-result.component.scss']
})
export class SupplierAccessResultComponent implements OnInit {

  // MODAL
  showdefaultMessage:boolean=true;
  user:IMainUser
  name:string="";
  defaultTitle:string="";
  defaultMessage="";
  hour:string="";
  defaultResult:boolean=null;
  defaultIcon:boolean=null;
  resultStatus:number=2;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef:MatDialogRef<SupplierAccessResultComponent>,
    private ref:ChangeDetectorRef
  ) { }
  closeDialog(){
    this.dialogRef.close();
  }
  ngOnInit(): void {
    if(this.data!==null){
      this.showdefaultMessage=this.data.showdefaultMessage_x;
      this.defaultMessage=this.data.defaultMessage_x;
      this.defaultTitle=this.data.defaultTitle_x;
      this.defaultResult=this.data.defaultResult_x;
      this.defaultIcon=this.data.defaultIcon_x;
      this.resultStatus=Number(this.data.resultStatus_x);
      this.user=this.data.user_x;
      this.hour=this.data.hour_x;
      this.ref.detectChanges();
    }
  }

}
