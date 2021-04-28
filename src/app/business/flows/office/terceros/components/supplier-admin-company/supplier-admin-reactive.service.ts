import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SupplierAdminReactiveService {
  managerCompanyForm:FormGroup;
  // company
  ruc:FormControl= new FormControl('',[Validators.required]);
  companyName:FormControl= new FormControl('',[Validators.required]);
  alias:FormControl= new FormControl('',[Validators.required]);
  activity:FormControl = new FormControl('',[Validators.required]);
  companyId:FormControl = new FormControl(0);
  // service

  contactName:FormControl = new FormControl('',[Validators.required]);
  contactNumber:FormControl = new FormControl('',[Validators.required]);
  contactMail:FormControl = new FormControl('',[Validators.required]);
  serviceName:FormControl = new FormControl('',[Validators.required]);
  description:FormControl = new FormControl('',[Validators.required]);

  // formAction
  formAction:FormControl = new FormControl('B',[Validators.required]);
  constructor() { 
    this.managerCompanyForm = new FormGroup({
      companyId:this.companyId,
      ruc:this.ruc,
      companyName:this.companyName,
      alias:this.alias,
      activity:this.activity,
      contactName:this.contactName,
      contactNumber:this.contactNumber,
      contactMail:this.contactMail,
      serviceName:this.serviceName,
      description:this.description,
      formAction:this.formAction
    })
  }
}
