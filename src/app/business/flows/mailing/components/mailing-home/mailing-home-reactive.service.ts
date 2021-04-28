import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MailingHomeReactiveService {
  mailingFormGroup : FormGroup;

  // template object
  title:FormControl = new FormControl('');
  cc:FormControl = new FormControl("");
  cco:FormControl = new FormControl("");
  subject:FormControl = new FormControl("");
  cusAttach: FormControl = new FormControl("");
  body:FormControl = new FormControl("");
  caseVariable : FormControl = new FormControl("");
  id:FormControl = new FormControl(0);
  // temp object
  tInput:FormControl = new FormControl("");
  tBody:FormControl = new FormControl("");
  tFoot:FormControl = new FormControl("");

  link:FormControl = new FormControl("");
  // preview link
  constructor() {
    this.mailingFormGroup = new FormGroup({
      title:this.title,
      cc:this.cc,
      cco:this.cco,
      subject:this.subject,
      cusAttach:this.cusAttach,
      body:this.body,
      caseVariable:this.caseVariable,
      tInput:this.tInput,
      tBody:this.tBody,
      tFoot:this.tFoot,
      link:this.link
    })
    
   }
}
