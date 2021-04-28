import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ModalRelationshipReactiveService {

  relationshipFormReactive:FormGroup;

  name:FormControl = new FormControl('', [ Validators.required]);
  requestId:FormControl = new FormControl(null) // request id
  lastName1: FormControl = new FormControl('');
  lastName2: FormControl = new FormControl('');
  comment: FormControl = new FormControl('');
  chk01 :  FormControl = new FormControl(null); // mayor a 60 años
  chk02 : FormControl = new FormControl(null);  // Enfermedad crónica
  chk03 : FormControl = new FormControl(null); // Embarazo
  chk04 :FormControl = new FormControl(null); // Expuesto: Hospital, Policia , Militar.
  relationshipF: FormControl = new FormControl(0) // parentesco
  otherRelationship: FormControl = new FormControl('') // otro tipo de parentesco
  constructor() { 
    this.relationshipFormReactive = new FormGroup({
      name:this.name,
      lastName1:this.lastName1,
      lastName2:this.lastName2,
      comment:this.comment,
      chk01:this.chk01,
      chk02:this.chk02,
      chk03:this.chk03,
      chk04:this.chk04,
      relationshipF:this.relationshipF,
      otherRelationship:this.otherRelationship,
      requestId:this.requestId
    })
  }
}
