import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IMainUser } from '../../../../../../app/business/models/IModel-module';
import { MailingService } from '../../services/mailing.service';

@Component({
  selector: 'app-modal-files',
  templateUrl: './modal-files.component.html',
  styleUrls: ['./modal-files.component.scss']
})
export class ModalFilesComponent implements OnInit {
  @ViewChild('atachfileInput',{static:false}) inputAttachFile;
  atachedFiles:Array<any>=[]; 
  idAutoincrement: number = 0;
  loading:boolean = true;
  user:IMainUser= null;
  base64File:any=null;

  constructor(
    public dialogRef:MatDialogRef<ModalFilesComponent>,
    private ref:ChangeDetectorRef,
    private fileSer:MailingService
  ) { }
  // test success
  closeModal(): void {
    this.dialogRef.close();
  }
  // test success
  clickAttachFile=()=>{
    this.inputAttachFile.nativeElement.click();
  }
  // test success
  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("user"));
    this.initDataFiles(this.user.id);
  }
  initDataFiles(userId:string){
    this.fileSer.onLoadFileAttach(userId).toPromise().then(resp => {
      this.responseInitDataFiles(resp);
    })
  }
  // test success
  responseInitDataFiles(resp:any){
    this.atachedFiles=[];
    this.loading = false;
      if (resp['status']){
        resp['lista'].forEach(item => {
          let obj = {
            loading: false,
            status: item['id_status'],
            name:item['name'],
            id: item['id']
          } 
          this.atachedFiles.push(obj); 
          this.ref.detectChanges();
        });
        
      }else{
        console.log("ERROR: " + resp['error'])
      }
  }
  attachFileChange =(e)=>{    
    for (let i = 0; i < e.target.files.length; i++) {      
      this.idAutoincrement++;
      const file = e.target.files[i];
      let obj = {
        loading: true,
        name:file['name'],
        filepath:"",
        azurepath:"",
        id: this.idAutoincrement
      }   
      const existe = this.atachedFiles.filter(p => p.name === obj.name).length > 0;
      this.addAttachToList(obj,file,existe,this.user.id); 
    }
  }
  addAttachToList(obj:any,file:any,replace:boolean,userId:string){
    let idx = 0;
    if (replace){
      idx = this.atachedFiles.findIndex(p => p.name === obj.name)
      this.atachedFiles[idx].loading = true;
    }else{    
      this.atachedFiles.push(obj);     
      idx = this.atachedFiles.findIndex(p => p.id === obj.id)
    }    
    this.ref.detectChanges();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64file = reader.result;
      this.fileSer.addAttachList(base64file,file['type'],file['name'],userId).toPromise().then(resp => {
      this.responseAddAttachList(idx,resp);  
      })
      
    }
  }
  responseAddAttachList(idx:number,resp:any){
    this.atachedFiles[idx].loading = false;
        if (resp['status']){
          this.atachedFiles[idx].status = 2;
        }else{
          this.atachedFiles[idx].status = 3;
        }  
        this.initDataFiles(this.user.id);        
        this.ref.detectChanges();
  }
  removeAllAttach(){
    if(this.atachedFiles.length>0){ 
      this.atachedFiles.forEach(element => {
        this.removeAttach(element.id);
      });
    }
  }
  removeAttach(idAttach){ 
    this.fileSer.removeAttach(idAttach).subscribe(
      resp=>{
        this.initDataFiles(this.user.id);
      }
    )
  }
}
