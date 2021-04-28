import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestFamilyDto } from '../../models/request-corona-form';
import { CoronavirusFormService } from '../../services/coronavirus-form.service';
import { ModalRelationshipReactiveService } from './modal-relationship-reactive.service';

@Component({
  selector: 'app-modal-relationship',
  templateUrl: './modal-relationship.component.html',
  styleUrls: ['./modal-relationship.component.scss']
})
export class ModalRelationshipComponent implements OnInit {
  // conditions
  conditionRealtionShip : boolean = false;
  arrayCoronaRelationshipValue: Array<RequestFamilyDto> = []
  auxArrayCoronaRelationshipValue: Array<RequestFamilyDto> = []
  arrayCoronaRelationship: Array<any> = []
  constructor(
    public dialogRef:MatDialogRef<ModalRelationshipComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private relationship:CoronavirusFormService,
    public relationshipForm: ModalRelationshipReactiveService, private ref:ChangeDetectorRef
  ) { }
  // test success
  addFamily() {
    let flag = true;
    let chk01=this.relationshipForm.chk01.value===true?1:0;
    let chk02=this.relationshipForm.chk02.value===true?1:0;
    let chk03=this.relationshipForm.chk03.value===true?1:0;
    let chk04=this.relationshipForm.chk04.value===true?1:0;
    let acuChk=Number(chk01)+Number(chk02)+Number(chk03)+Number(chk04);
    if(acuChk<1){
      /* console.log("acuCHK 0") */
      this.relationship.showAlertCoronaForm('warning',"Necesita seleccionar por lo menos 1 condición de riesgo para registrar un familiar.")
      flag = false;
    }else{
      flag = true;
    }
    if (this.relationshipForm.relationshipF.value === 0 || this.relationshipForm.relationshipF.value === null) {
      /* console.log("RELATIONSHIP 0") */
      this.relationship.showAlertCoronaForm("warning","Necesitas seleccionar el tipo de parentesco para registrar un familiar.")
      flag = false;
    }
    if (this.relationshipForm.name.value === "") {
      /* console.log("NAME NULL") */
      this.relationship.showAlertCoronaForm("warning","Necesitas ingresar el nombre completo para registrar un familiar.")
      flag = false;
    }
    if (flag == true) {
     /*  console.log("ENTRO FLAG") */
      let family = null;
      this.arrayCoronaRelationship.forEach(element => {
        if (Number(element["id"]) == Number(this.relationshipForm.relationshipF.value)) {
          family = new RequestFamilyDto(String(this.arrayCoronaRelationshipValue.length+1)+"a", 1, this.relationshipForm.name.value,
          this.relationshipForm.lastName1.value, this.relationshipForm.lastName2.value,
          this.relationshipForm.relationshipF.value,
            element["name"],
            chk01,
            chk02,
            chk03,
            chk04,
            this.relationshipForm.otherRelationship.value,
            this.relationshipForm.comment.value,
            "T");
        }
      });
      this.arrayCoronaRelationshipValue.push(family);
      this.clearForm();
      this.onNoClick();
    }
  }
  onNoClick(): void {
    /* console.log("VALORES") */
    this.dialogRef.close({
      "response":this.arrayCoronaRelationshipValue.length===0?[]:this.arrayCoronaRelationshipValue
    });
  }
  // test success
  reset() {
    this.arrayCoronaRelationshipValue = [];
  }
  // test success
  clearForm() {
    this.relationshipForm.name.setValue("");
    this.relationshipForm.lastName1.setValue("");
    this.relationshipForm.lastName2.setValue("");
    this.relationshipForm.chk01.setValue(null);
    this.relationshipForm.chk02.setValue(null);
    this.relationshipForm.chk03.setValue(null);
    this.relationshipForm.chk04.setValue(null);
    this.relationshipForm.comment.setValue("");
    this.relationshipForm.otherRelationship.setValue("");
  }
  // test success
  showOtherRelationship() {
    if (this.relationshipForm.relationshipF.value === 7) {
      this.conditionRealtionShip = true;
    } else {
      this.conditionRealtionShip = false;
    }
  }
  // test success
  initDataRelationShip(data:any){
    /* console.log("INITDATARELATIONSHIP") */
    if(data!==null){
      /* console.log("ENTRO DATA") */
      this.arrayCoronaRelationship=data.relationship;
      this.relationshipForm.requestId.setValue(data.request);
      this.ref.detectChanges();
    }
  }
  // test success
  ngOnInit(): void {
    /* console.log("NG ON INIT") */
    this.clearForm();
    this.initDataRelationShip(this.data);
  }

}
