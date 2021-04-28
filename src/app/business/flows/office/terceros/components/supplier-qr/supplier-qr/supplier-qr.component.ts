import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IMainUser } from '../../../../../../../business/models/IModel-module';

@Component({
  selector: 'app-supplier-qr',
  templateUrl: './supplier-qr.component.html',
  styleUrls: ['./supplier-qr.component.scss']
})
export class SupplierQrComponent implements OnInit {
  myName:string='';
  acepted:boolean = false;
  user:IMainUser;
  constructor(public dialogRef:MatDialogRef<SupplierQrComponent>) { }
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.myName = String(this.user.relatedParty.name).replace("/"," ").replace("/"," "); 
  }
  closeDialog(){
    this.dialogRef.close(this.acept);
  }
  acept(){
    this.acepted = true;
    this.dialogRef.close(this.acept);
  }
}
