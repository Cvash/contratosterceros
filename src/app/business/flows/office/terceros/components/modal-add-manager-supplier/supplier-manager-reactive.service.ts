import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SupplierManagerReactiveService {
  managerSupplier:FormGroup;
  name:FormControl = new FormControl('',[Validators.required]);
  lastName1:FormControl = new FormControl('',[Validators.required]);
  lastName2:FormControl = new FormControl('',[Validators.required]);
  mail:FormControl = new FormControl('',[Validators.required]);
  birthDate: FormControl = new FormControl('');
  codeCompany : FormControl = new FormControl('');
  gender: FormControl = new FormControl('');
  activity:FormControl = new FormControl('');
  nationalId:FormControl = new FormControl('');
  serviceId:FormControl = new FormControl(0);
  constructor() { 
    this.managerSupplier= new FormGroup({
    name:this.name,
    lastName1:this.lastName1,
    lastName2:this.lastName2,
    mail:this.mail,
    birthDate : this.birthDate,
    codeCompany : this.codeCompany,
    gender:this.gender,
    activity : this.activity,
    nationalId: this.nationalId,
    serviceId:this.serviceId
    })

  }
}
