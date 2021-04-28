import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SupplierSecurityReactiveService {

  securityForm:FormGroup;
  
  observations:FormControl=new FormControl('');
  protectionEquipment:FormControl=new FormControl(false);
  temperature:FormControl=new FormControl(0,[Validators.required]);
  typeMov:FormControl=new FormControl('',[Validators.required]);
  userId:FormControl=new FormControl('',[Validators.required]);
  token:FormControl=new FormControl('');
  document:FormControl=new FormControl('');
  
  constructor() { 
    this.securityForm=new FormGroup({
      observations:this.observations,
      protectionEquipment:this.protectionEquipment,
      temperature:this.temperature,
      typeMov:this.typeMov,
      userId:this.userId,
      document:this.document,
      token:this.token
    })
  }
}
