import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SupplierReportReactiveService {
  reportFormReactive:FormGroup;
  filter:FormControl = new FormControl('',[Validators.required]);
  endDate:FormControl = new FormControl('',[Validators.required]);
  startDate:FormControl = new FormControl('',[Validators.required]);
  companyId:FormControl = new FormControl(0,[Validators.required]);
  serviceId:FormControl = new FormControl(0,[Validators.required]);
  constructor() {
    this.reportFormReactive = new FormGroup({
      filter:this.filter,
      endDate:this.endDate,
      startDate:this.startDate,
      companyId:this.companyId,
      serviceId:this.serviceId
    }
    )
   }
}
