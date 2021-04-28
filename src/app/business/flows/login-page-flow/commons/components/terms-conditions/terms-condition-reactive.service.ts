import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TermsConditionReactiveService {

  termsForm:FormGroup;
  acceptTerm:FormControl=new FormControl(false);
  constructor() { 
    this.termsForm=new FormGroup({
      acceptTerm:this.acceptTerm
    })
  }
}
