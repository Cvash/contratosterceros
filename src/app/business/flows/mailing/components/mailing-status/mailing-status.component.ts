import { state, style, trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { IMainUser, IViewModule } from 'src/app/business/models/IModel-module';
import { AuthServiceService } from 'src/app/commons/services/auth-service.service';
import { ISentDetail, ISents } from '../../models/responseMailing';
import { MailingService } from '../../services/mailing.service';
import { ModalPreviewComponent } from '../modal-preview/modal-preview.component';

@Component({
  selector: 'app-mailing-status',
  templateUrl: './mailing-status.component.html',
  styleUrls: ['./mailing-status.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
    ])
  ]
})
export class MailingStatusComponent implements OnInit, AfterViewInit {
  @BlockUI() blockUI: NgBlockUI;
  flagLoadingData:boolean = true;
  DATA:Array<ISents>=[];
  displayedColumns: string[] = ['id', 'template', 'sent_at', 'sent_by','status','total','ratios'];
  dataSource = new MatTableDataSource(this.DATA);
  expandedElement: ISents | null;
  flagShow=true;
  detalle:Array<ISentDetail> = [];
  moduleList: Array<IViewModule>=[];
  user:IMainUser = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
  public statusServ:MailingService,
  private ref:ChangeDetectorRef,
  private dialog:MatDialog,
  public auth:AuthServiceService
  ) { }
  
  // test success
  ngOnInit(): void {
    this.initDataMails();
    this.user=JSON.parse(localStorage.getItem("user"));
    this.moduleList= JSON.parse(localStorage.getItem("modules"));
    this.auth.validateMenu("MENSAJERIA","/messaging/status",this.user,this.moduleList);
  }
  // test success
  ngAfterViewInit(): void {
    this.auth.executeValidateSession(this.user)
  }
  // test success
  initDataMails(){
    this.blockUI.start("Cargando...")
    this.statusServ.loadMails().toPromise().then(resp => {
      /* console.log(resp); */
      this.responseLoadDataMails(resp);      
    })
  }
  // test success
  responseLoadDataMails(resp:any){
      this.DATA = resp['sents'];      
      this.dataSource = new MatTableDataSource(this.DATA);
      this.dataSource.paginator = this.paginator;
      this.flagLoadingData = false;
      this.blockUI.stop();
      this.ref.detectChanges();
  }
  // test success
  showMailDetails(sentMail:ISentDetail){
    this.dialog.open(ModalPreviewComponent, {
      width: '90%',
        minHeight: '80vh',
      data: {
        template:sentMail,
        type: 'final',
        to: sentMail.correo}
    }); 
  }
  expandElement(element:ISents){
    /* console.log("EXPANDED") */
    if(this.expandedElement === element ){
      this.expandedElement=null;
    }else{
      this.expandedElement=element;
    }
    this.flagShow = false;
    this.validateExpandedElement(this.expandedElement,element);
  }
  // test success
  validateExpandedElement(exp:any, element:ISents){
    if (exp !== null){
      this.statusServ.loadMailsSendDetails(element.id).toPromise().then(resp => {
            this.responseExpandElement(resp);
        });      
    }else{
      this.detalle = [];
    }
  }
  // test success
  responseExpandElement(resp){
    this.detalle = resp['details'];
    this.flagShow = true;
    this.ref.detectChanges();
  }
  // test success
  getStatusDetaill(id:number){
    switch (id) {
      case 1:
        return "Pendiente";
      case 2:
        return "Fallido";
      case 3:
        return "Enviado";
      case 4:
        return "Faltó Adjunto";
      default:
        return "No definido";
    }
  }
  // test success
  getStatusSent (id:number){
    switch (id) {
      case 1:
        return "En proceso...";
      case 2:
        return "Enviado con fallos"
      case 3:
        return "Enviado correctamente"
      default:
        return "No definido"
    }
  }
  // test success
  checkCurrentStatus (id:number){
    this.statusServ.checkStatus(id).toPromise().then(resp => {
      this.statusServ.showSwalAlertHtmlContent('info',"Estado actual de envio:","<ul> <li>Correctos: " +  resp['success'] +"</li> <li>Fallidos: " +  resp['fails'] +"  </li></ul>")
    })
  }
  // test success
  jsDate = (pydate) => {
    if (pydate){
      const fecha:Date = new Date(pydate);    
      let mm =  (fecha.getMonth()+1).toString();
      mm = mm.length == 1?"0"+mm:mm;
      return fecha.getDate() + "-" + mm + "-" + fecha.getFullYear();
    }else{
      return "-";
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
