import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AccessCodeService {
  accessForm:FormGroup;

  constructor() {
    this.accessForm=new FormGroup({
        code:new FormControl("")
    })

   }
}
