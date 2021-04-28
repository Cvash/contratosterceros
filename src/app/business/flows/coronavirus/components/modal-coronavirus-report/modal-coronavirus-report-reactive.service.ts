import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ModalCoronavirusReportReactiveService {
  reportForm:FormGroup;

  surveyId: FormControl = new FormControl(0);
  reservaId : FormControl = new FormControl(0);
  index : FormControl = new FormControl("");
  constructor() { 
    this.reportForm = new FormGroup({ 
      surveyId:this.surveyId,
      reservaId:this.reservaId,
      index:this.index
    })
  }
}
