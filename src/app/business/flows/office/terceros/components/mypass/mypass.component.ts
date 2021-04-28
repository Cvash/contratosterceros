import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthServiceService } from '../../../../../../commons/services/auth-service.service';
import Swal from 'sweetalert2';
import { IGetEntryPass, IMainUser, IViewModule } from '../../../../../../business/models/IModel-module';
import { SupplierService } from '../../services/supplier.service';

@Component({
  selector: 'app-mypass',
  templateUrl: './mypass.component.html',
  styleUrls: ['./mypass.component.scss']
})
export class MypassComponent implements OnInit, AfterViewInit {
  moduleList: Array<IViewModule>=[];
  user:IMainUser=null;
  myName:string='';
  viewStatus:number;
  ready:boolean = false;
  elementType = 'url';
  value = '';
  banner= '';
  dailyReview:IGetEntryPass;
  @BlockUI() blockUI: NgBlockUI;
  constructor(public router:Router,
    public ref:ChangeDetectorRef,
    public sup:SupplierService,
    private auth:AuthServiceService) { }
    generatePass(){
    this.router.navigate(['/terceros/form']);
  }
  
  verifyAccessPass(userId:string){
    this.blockUI.start("Procesando");
    this.sup.accessPass(userId,"","","").toPromise().then(
      (daily)=>{
        this.subVerifyAccessPass(daily);
      },
      (error:HttpErrorResponse)=>{
        this.errorSubVerifyAccessPass(error.statusText);
      }
    )
  }
  errorSubVerifyAccessPass(message){
    this.blockUI.stop();
    this.banner="Se produjo un error.";
    this.viewStatus=0;
    Swal.fire({
      icon:"error",
      title:message
    })
  }
  subVerifyAccessPass(daily:any){
    let dictionary:any;
    this.dailyReview=daily;
        dictionary=this.sup.validateStatusToken(this.dailyReview);
        this.ref.detectChanges();
        this.banner=dictionary["banner"];
        this.viewStatus=dictionary["viewStatus"];
        this.value=dictionary["value"];
        this.ready=dictionary["ready"];
        this.ref.detectChanges();
        this.blockUI.stop();
  }
  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("user"));
    this.moduleList=JSON.parse(localStorage.getItem("modules"));
    this.auth.validateMenu("TERCEROS","/terceros/mypass",this.user,this.moduleList);
    this.myName=this.user.relatedParty.name.replace("/"," ").replace("/"," ");
    setTimeout(() => {
      this.verifyAccessPass(this.user.id);
    }, 1000);
  }
  ngAfterViewInit(): void {
    this.auth.executeValidateSession(this.user);
}}
