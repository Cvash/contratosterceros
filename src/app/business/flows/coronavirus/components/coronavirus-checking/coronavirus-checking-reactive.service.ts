import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CoronavirusCheckingReactiveService {
  coronaCheckingForm:FormGroup;
  startDate:FormControl = new FormControl("",[Validators.required]);
  endDate:FormControl = new FormControl("",[Validators.required]);
  constructor() { 
    this.coronaCheckingForm = new FormGroup({ 
      startDate:this.startDate,
      endDate:this.endDate
    })
  }
}
