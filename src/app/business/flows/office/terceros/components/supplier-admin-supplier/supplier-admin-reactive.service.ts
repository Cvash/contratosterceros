import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SupplierAdminSupplierReactiveService {
  supplierAdmin:FormGroup;
  serviceId:FormControl = new FormControl(0);
  checkbox:FormControl = new FormControl(false,[Validators.required]);
  constructor() { 
    this.supplierAdmin= new FormGroup({
      serviceId:this.serviceId,
      checkbox:this.checkbox
    })
  }
}
