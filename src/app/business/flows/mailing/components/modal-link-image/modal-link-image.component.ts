import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MailingService } from '../../services/mailing.service';
import { MailingHomeReactiveService } from '../mailing-home/mailing-home-reactive.service';

@Component({
  selector: 'app-modal-link-image',
  templateUrl: './modal-link-image.component.html',
  styleUrls: ['./modal-link-image.component.scss']
})
export class ModalLinkImageComponent implements OnInit {
  imgstatus:number = 0;
  result:string="";
  image:string="";
  link:string="";
  flagdis:boolean = true;
  constructor(public dialogRef:MatDialogRef<ModalLinkImageComponent>, 
  private ref:ChangeDetectorRef, private linkImageServ:MailingService,
  public mailingForm:MailingHomeReactiveService) { }

  ngOnInit(): void {
  }
  // test success
  closeModal(): void {
    this.dialogRef.close({
      "result":this.result
    });
  }
  // test success
  insert(){
    this.result = '<a href="' + this.link + '">' + this.image + '</a>';
    this.dialogRef.close({
      "result":this.result
    });
  }
  // test success
  changeimg(e){
    this.imgstatus = 1;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64file = reader.result;
      this.linkImageServ.uploadFileAzureStore(base64file,file["name"],"messaging/files")
      .toPromise().then(resp => {
        this.responseChangeimg(resp);
      });
    }
  }
  // test -success
  responseChangeimg(resp:any){
    if (resp['rpt']===1){
      this.image = '<img src="https://storageqallarix.blob.core.windows.net/rhdigital/messaging/files/' + resp['filename'] + '" />'
      this.imgstatus = 2;
      this.flagdis = false;
    }else{
      this.imgstatus = 3;
    }
    this.ref.detectChanges();
  }
}
