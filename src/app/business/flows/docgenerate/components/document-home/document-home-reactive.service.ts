import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DocumentHomeReactiveService {

  documentHomeForm:FormGroup;

  title: FormControl = new FormControl("");
  documentBody : FormControl = new FormControl("");
  caseVariable : FormControl = new FormControl("");
  documentFooter : FormControl = new FormControl("");
  templateId: FormControl = new FormControl(0);
  constructor() { 
    this.documentHomeForm = new FormGroup({ 
      title:this.title,
      documentBody:this.documentBody,
      caseVariable:this.caseVariable,
      documentFooter:this.documentFooter
    })
  }
}
