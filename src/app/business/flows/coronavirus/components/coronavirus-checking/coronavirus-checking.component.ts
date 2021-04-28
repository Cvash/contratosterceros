import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthServiceService } from '../../../../../../app/commons/services/auth-service.service';
import { IMainUser, IViewModule } from '../../../../../../app/business/models/IModel-module';
import { ICheckingData } from '../../models/response-corona-form';
import { CoronavirusAdminService } from '../../services/coronavirus-admin.service';
import { CoronavirusCheckingService } from '../../services/coronavirus-checking.service';
import { ModalCoronavirusReportComponent } from '../modal-coronavirus-report/modal-coronavirus-report.component';
import { CoronavirusCheckingReactiveService } from './coronavirus-checking-reactive.service';

@Component({
  selector: 'app-coronavirus-checking',
  templateUrl: './coronavirus-checking.component.html',
  styleUrls: ['./coronavirus-checking.component.scss']
})
export class CoronavirusCheckingComponent implements OnInit , AfterViewInit {
  moduleList: Array<IViewModule>=[];
  user:IMainUser=null;
  //roles
  arrayIdRole:Array<any>=[]; 
  arrayPermissions:Array<any>=[];
  //array data assist
  arrayAssistMgn:Array<ICheckingData>=[]
  @ViewChild("btnfileinput",{static: false}) btnfileinput:ElementRef;
  //variables para archivos tipo File
  src:string="";
  type:string="";
  filename:string="";
  @BlockUI() blockUI: NgBlockUI;
  //mat table angular material headers
  displayedColumns: string[] = ['CIP', 'EMPLEADO', 'FECHA DE ASISTENCIA','HORA DE ASISTENCIA'
   ,'FORMATO DE ASISTENCIA','COMENTARIO','ACCIONES'];
  dataSource = new MatTableDataSource(this.arrayAssistMgn)
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private ref:ChangeDetectorRef,
    private dialog:MatDialog,
    public checkingForm:CoronavirusCheckingReactiveService,
    public checkingService:CoronavirusCheckingService,
    private adminService:CoronavirusAdminService,
    public auth:AuthServiceService
  ) { }
  
  // test success
  showCheckingReportCovid19() {
    this.dialog.open(ModalCoronavirusReportComponent, {
      width: '650px',
      height: '350px',
      data:{report_assist:true}
    });
  }
  // test success
  onFileChange(event) {
    try {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.src = JSON.stringify(reader.result);
        this.type = file["type"]
        this.filename=file["name"]
        this.uploadFile(this.src,this.filename,"##",1,this.user.id);
        this.ref.detectChanges();
      };
    } catch (error) {
      console.log(error)
    }
  }
  
  // src - > blob
  // file_name -> file type
  // identifiesr -> any
  // test success
  uploadFile(src,fileName,identifiers,point,userId:string){
      if(point===1){
        this.blockUI.start("Guardando datos...")
      }
      this.checkingService.saveMassiveChecking(fileName,src,identifiers,userId)
      .toPromise().then(file=>{
        this.responseUploadFile(file)
      })
      /* saveMassive.unsubscribe();  */ 
      this.btnfileinput.nativeElement.value = '';
  }
  // test success
  responseUploadFile(file:any){
    if(file["condition"]===true){
      /* console.log("CONDITION TRUE") */
      this.adminService.showAlertCoronaFormAdmin("success","Los datos fueron registrados con éxito.");
      this.showDataAssistManagement(0);
      this.blockUI.stop()
    }else{
      this.blockUI.stop()
      this.adminService.showAlertCoronaFormAdmin("error",file["message"]);
    }
    this.ref.detectChanges();
    
  }
  // test success
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // test success
  showData(date1:any,date2:any){
    if(date1==="" || date2===""){
      this.showDataAssistManagement(0);
    }else{
      this.showDataAssistByDate(date1,date2);
    }
    
  }
  // test success
  showDataAssistByDate(date1,date2){
    this.blockUI.start("Cargando datos...")
    this.checkingService.searchCoronaChecking(date1,date2,this.arrayIdRole)
    .toPromise().then(data=>{   
      this.responseShowDataByDate(data);
    })
  }
  // test success
  responseShowDataByDate(data:any){ 
    this.arrayAssistMgn=data;
      this.ref.detectChanges();
      if(this.arrayAssistMgn.length===0){
        this.adminService.showAlertCoronaFormAdmin("info","No existen registros en el rango de fecha seleccionado.");
      }
      this.dataSource=new MatTableDataSource(this.arrayAssistMgn);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.checkingForm.startDate.setValue("");
      this.checkingForm.endDate.setValue("");
      this.blockUI.stop();
  }
  // test success
  removeDataAssistManagement(id){
    this.checkingService.removeCheckingData(id).toPromise().then(data=>{
      this.responseRemoveData(data);
    });
  }
  // test success
  responseRemoveData(data){
    if(data["condition"]!=false){
      this.showDataAssistManagement(0);
    }else{
      this.adminService.showAlertCoronaFormAdmin("error",data["message"]);
    }
  }
  // test success
  showDataAssistManagement(point){
    /* console.log("SHOWDATAASSIST"); */
    if(point===0){
      this.blockUI.start("Cargando datos...")
    }
    if(point===2){
      this.blockUI.start("Movistar...")
    }
    this.checkingService.showDataManagementAssist(this.arrayIdRole).toPromise().then(data=>{
        this.responseShowDataAssistMng(data);
    })
  }
  // test success
  responseShowDataAssistMng(data){
    /* console.log("responseShowDataAssistMng"); */
    if (data["condition"]!=false){
      this.arrayAssistMgn=data;
      this.ref.detectChanges();
      this.dataSource=new MatTableDataSource(this.arrayAssistMgn);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.blockUI.stop();
      }else{
        this.blockUI.stop();
        this.adminService.showAlertCoronaFormAdmin("error",data["message"])
      }
  }
  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("user"));
    this.moduleList=JSON.parse(localStorage.getItem("modules"));
    this.arrayIdRole=this.adminService.addPermissionSearchService();
    this.ref.detectChanges();
    this.auth.validateMenu("CORONAVIRUS","/coronavirus/checking",this.user,this.moduleList);
  }
  ngAfterViewInit(): void {
    this.auth.executeValidateSession(this.user);
  }
}
