import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SignaturePad } from 'angular2-signaturepad';

@Component({
  selector: 'app-modal-sign-component',
  templateUrl: './modal-sign-component.component.html',
  styleUrls: ['./modal-sign-component.component.scss']
})
export class ModalSignComponentComponent implements OnInit {
  acepted:boolean = false;
  flagSign:boolean = false;
  blobData:Blob;
  base64data=null;
  @ViewChild(SignaturePad, {static: false}) signaturePad: SignaturePad;
  
 
  signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 2,
    'canvasWidth': 300,
    'canvasHeight': 150
  };

  constructor(public dialogRef:MatDialogRef<ModalSignComponentComponent>) { }

  ngAfterViewInit() {
    this.signaturePad.set('minWidth', 2); 
    this.signaturePad.set('penColor',"#323232");
    this.signaturePad.clear(); 
  }
 

  ngOnInit() {
  }


  // SIGNATURE FUNCTIONS 
  clearSign(){
    this.signaturePad.clear(); 
  }
  closeModal(){    
    this.dialogRef.close({
      "flagSign":this.flagSign,
      "base64data":this.base64data
    });
  }
  saveSign(){
    //this.blobData = this.convertBase64ToBlobData( this.signaturePad.toDataURL().split(",")[1] );
    this.base64data =  this.signaturePad.toDataURL();
    this.flagSign = true; 
    this.dialogRef.close({
      "flagSign":this.flagSign,
      "base64data":this.base64data
    });
  }
  drawComplete() {
  } 
  drawStart() {
  }
}
