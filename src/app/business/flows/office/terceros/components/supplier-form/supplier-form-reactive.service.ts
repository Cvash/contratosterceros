import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SupplierFormReactiveService {

  isDisabledTransport:boolean=true;
  isDisabledSede:boolean=true;
  supplierForm:FormGroup;

  chkConfirm:FormControl=new FormControl(false)
  cityOption:FormControl=new FormControl('',[Validators.required])
  sedeOption:FormControl=new FormControl({value:'',disabled:this.isDisabledSede},[Validators.required])
  stageOption:FormControl=new FormControl('',[Validators.required])
  transportOption:FormControl=new FormControl({value:0,disabled:this.isDisabledTransport},[Validators.required])
  imageBase64:FormControl=new FormControl('',[Validators.required])
  contactCoronavirus:FormControl= new FormControl(false)
  isSymp:FormControl=new FormControl(false);
  constructor() {
    this.supplierForm=new FormGroup({
      chkConfirm:this.chkConfirm,
      cityOption:this.cityOption,
      sedeOption:this.sedeOption,
      stageOption:this.stageOption,
      transportOption:this.transportOption,
      imageBase64:this.imageBase64,
      contactCoronavirus:this.contactCoronavirus,
      isSymp:this.isSymp
    })
   }
}
