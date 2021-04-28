import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IMainUser, IViewModule } from 'src/app/business/models/IModel-module';
import { AuthServiceService } from 'src/app/commons/services/auth-service.service';
import Swal from 'sweetalert2';
import { IDocumentStatus } from '../../models/responseDocument';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-document-status',
  templateUrl: './document-status.component.html',
  styleUrls: ['../../../mailing/components/mailing-home/mailing-home.component.scss']
})
export class DocumentStatusComponent implements OnInit, AfterViewInit {
  flagLoadingData: boolean = true;
  lstDocumentStatus: Array<IDocumentStatus> = []
  displayedColumns: string[] = ['id', 'title', 'created_at', 'created_by', 'status', 'total', 'ratios'];
  dataSource = new MatTableDataSource(this.lstDocumentStatus);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  user:IMainUser=null;
  moduleList: Array<IViewModule>=[];
  constructor(
    private ref: ChangeDetectorRef,
    public statusServ: DocumentService,
    public auth:AuthServiceService
  ) { }
  

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("user"));
    this.moduleList=JSON.parse(localStorage.getItem("modules"));
    this.auth.validateMenu("DOCUMENTOS DINÁMICOS","/document/status",this.user,this.moduleList);
    this.chargedListStatus();
  }
  
  ngAfterViewInit(): void {
    this.auth.executeValidateSession(this.user)
  }
  chargedListStatus() {
    this.statusServ.chargedTemplateStatus().toPromise().then(
      (list) => {
        this.responseChargedList(list);
      }
    )
  }
  // test success
  responseChargedList(resp: any) {
    this.lstDocumentStatus = resp['data'];
    this.dataSource = new MatTableDataSource<IDocumentStatus>(this.lstDocumentStatus);
    this.dataSource.paginator = this.paginator;
    this.flagLoadingData = false;
    this.ref.detectChanges();
  }
  // test success
  downloadfiles = (name: string) => {
    Swal.fire({
      icon:"info",
      text:"Se procede a descargar el archivo."
    })
    const a = document.createElement("a");
    a.href = ("https://storageqallarix.blob.core.windows.net/rhdigital/messaging/files/" + name);
    a.download = name;
    a.click();
  }
  // test success
  jsDateDocument = (pydate) => {
    if (pydate){
      const fecha:Date = new Date(pydate);    
      let mm =  (fecha.getMonth()+1).toString();
      mm = mm.length == 1?"0"+mm:mm;
      return fecha.getDate() + "-" + mm + "-" + fecha.getFullYear();
    }else{
      return "-";
    }
  }
  // test success
  getStatusDoc (id:number){
    switch (id) {
      case 1:
        return "En proceso...";
      case 2:
        return "Fallido"
      case 3:
        return "Finalizado"
      default:
        return "No definido"
    }
  }
  // test success
  applyFilterStatus(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
