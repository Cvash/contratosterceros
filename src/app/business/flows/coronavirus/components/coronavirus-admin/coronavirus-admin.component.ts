import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { IMainUser, IViewMain, IViewModule } from '../../../../../../app/business/models/IModel-module';
import { AuthServiceService } from '../../../../../../app/commons/services/auth-service.service';
import { CoronaEmployee } from '../../models/request-corona-form';
import { IAdminData, ICoronaSick, ICoronavirusFormEdit, IStartedData } from '../../models/response-corona-form';
import { CoronavirusAdminService } from '../../services/coronavirus-admin.service';
import { CoronavirusHomeComponent } from '../coronavirus-home/coronavirus-home.component';
import { ModalCoronavirusReportComponent } from '../modal-coronavirus-report/modal-coronavirus-report.component';
import { CoronavirusAdminReactiveService } from './coronavirus-admin-reactive.service';

@Component({
  selector: 'app-coronavirus-admin',
  templateUrl: './coronavirus-admin.component.html',
  styleUrls: ['./coronavirus-admin.component.scss']
})
export class CoronavirusAdminComponent implements OnInit, AfterViewInit {
  /* init variable */

  module: Array<IViewMain> = [];
  user: IMainUser = null;

  /* objeto file */

  src: string = "";
  type: string = "";
  filename: string = "";
  @ViewChild("myInput", { static: false }) btnfileinputAdm: ElementRef;

  /* variables checkbox */
  
  checked:boolean = false;
  arrayCronica: Array<ICoronaSick> = []
  arrayRequestCondition: Array<ICoronaSick> = []
  conditionCronica:boolean = false;
  conditionPrecondition:boolean = false;
  moduleList: Array<IViewModule>=[];

  // paginacion
  
  items = [];
  
  // VARS
  
  searchResults: Array<IAdminData> = [];
  arrayCondition: Array<IAdminData> = [];
  showDetail: boolean = false;
  personDetails: CoronaEmployee = {
    id: 0,
    name: "",
    cip: "",
    dni: "",
    status: 0,
    comment: "",
    phone: "",
    mail: ""
  };
  
  arrayCoronaStatus: Array<IStartedData> = []
  arrayCoronaType: Array<IStartedData> = []
  arrayCoronaReason: Array<IStartedData> = []
  
  // roles
  
  arrayIdRole: Array<any> = [];
  userLogged = null;
  collectionPrecondition: ICoronavirusFormEdit;

  // mat table angular material headers
  displayedColumns: string[] = ['CIP', 'EMPLEADO', 'DNI', 'SITUACION'
  ,'FECHA EFECTIVA DE SITUACION', 'CONDICIONES', 'TIPO', 'FECHA EFECTIVA DE TIPO DE PERMANENCIA',
  'ESTADO', 'PAIS', 'COMENTARIO', 'ACCIONES'];
  dataSource = new MatTableDataSource(this.searchResults)
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @BlockUI() blockUI: NgBlockUI;

  constructor(
    public coronaAdminForm: CoronavirusAdminReactiveService,
    private dialog: MatDialog, 
    private ref: ChangeDetectorRef,
    public adminService: CoronavirusAdminService,
    public auth: AuthServiceService
  ) {
  }
  
  // test success
  startedData() {
    /* console.log("STARTET DATA") */
    this.coronaAdminForm.byemployeeinp.setValue("");
    this.coronaAdminForm.healthPerson.setValue(0);
    this.coronaAdminForm.typeWork.setValue(0);
    this.coronaAdminForm.statusWork.setValue(0);
  }
  // test success
  initData() {
    /* console.log("INIT DATA") */
    this.arrayIdRole = []
    this.user = JSON.parse(localStorage.getItem("user"));
    this.moduleList = JSON.parse(localStorage.getItem("modules"))
    this.arrayIdRole = this.adminService.addPermissionSearchService();
    this.auth.validateMenu("CORONAVIRUS","/coronavirus/admin",this.user,this.moduleList);
    this.ref.detectChanges();
  }

  showReportCovid19() {
    this.dialog.open(ModalCoronavirusReportComponent, {
      width: '650px',
      height: '350px',
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /* showPrecondition(employeeId: string) {
    this.adminService.showPreconditionCollection(employeeId).toPromise().then(data => {
      this.responseShowPrecondition(data);
    })
  }
  responseShowPrecondition(data:any){
    this.collectionPrecondition = data;
      this.coronaAdminForm.chk00.setValue(this.collectionPrecondition.precondition_1 == 1 ? true : false)
      this.coronaAdminForm.chk01.setValue(this.collectionPrecondition.precondition_2 == 1 ? true : false)
      this.coronaAdminForm.chk02.setValue(this.collectionPrecondition.precondition_3 == 1 ? true : false)
      this.coronaAdminForm.chk03.setValue(this.collectionPrecondition.precondition_4 == 1 ? true : false)
      this.coronaAdminForm.chk04.setValue(this.collectionPrecondition.precondition_5 == 1 ? true : false)
      this.coronaAdminForm.chk05.setValue(this.collectionPrecondition.precondition_6 == 1 ? true : false)
      this.coronaAdminForm.chk06.setValue(this.collectionPrecondition.precondition_7 == 1 ? true : false)
      this.coronaAdminForm.chk07.setValue(this.collectionPrecondition.precondition_8 == 1 ? true : false)
      this.coronaAdminForm.chk08.setValue(this.collectionPrecondition.precondition_9 == 1 ? true : false)
      this.coronaAdminForm.chk09.setValue(this.collectionPrecondition.precondition_10 == 1 ? true : false)
  } */
  /* busqueda de empleados */
  searchByEmployee(employeeId: string) {
    this.blockUI.start("Buscando empleados...");
    this.adminService.searchEmployeeByCondition(employeeId, this.arrayIdRole).toPromise().then(response => {
      this.responseSearchEmployee(response);
    })
  }
  responseSearchEmployee(response: any) {
    try {
      this.showDetail = false;
      this.searchResults = response["results"]
      if (this.searchResults.length !== 0) {
        if(this.searchResults.length === 0){
          this.arrayCronica =  [];
        }else{
          this.arrayCronica = response["results"]["0"]["array_cronico"];
        }
        this.arrayRequestCondition = response["results"]["0"]["request_condition"]
        this.ref.detectChanges();
        if (response['code']) {
          this.dataSource = new MatTableDataSource(this.searchResults);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.blockUI.stop();
        } else {
          this.adminService.showAlertCoronaFormAdmin("error", "Error, no se pudo cargar lo data. Comunicarse con el area correspondiente.")
          this.blockUI.stop();
        }
        this.blockUI.stop();
        this.ref.detectChanges();
      } else {
        this.blockUI.stop();
        this.adminService.showAlertCoronaFormAdmin("info", "No existen datos relacionados para la busqueda.")
      }
    } catch (error) {
      this.blockUI.stop();
      /* console.log(error); */
    }
  }
  // test success
  loadDataCdo() {
    /* console.log("LOAD DATA CBO") */
    this.blockUI.start("Movistar...");
    this.adminService.loadDataCoronaFormAdmin(0).toPromise().then(data => {
      this.responseLoadData(data);
    })
  }
  // test success
  responseLoadData(data: any) {
    /* console.log("RESPONSE LOAD DATA") */
    if (data["status"] !== false) {
      this.arrayCoronaReason = data["array_r"]
      this.arrayCoronaStatus = data["array"]
      this.arrayCoronaType = data["array_t"]
      this.blockUI.stop();
    }
    else {
      this.adminService.showAlertCoronaFormAdmin("error", data["message"]);
    }
  }
  // test success
  findByStatusDetName(idStatusFilter: any) {
    this.blockUI.start("Cargando datos...");
    this.adminService.findByStatusFilter(idStatusFilter, this.arrayIdRole).toPromise().then(data => {
      this.responseFindStatusDetails(data);
    })
  }
  // test success
  responseFindStatusDetails(data: any) {
    /* console.log("RESPONSE FIND STATUS"); */
    this.searchResults = data;
    if(data.length === 0){
      this.arrayCronica = [];
    }else{
      this.arrayCronica = data["0"]["array_cronico"]
    }
    this.dataSource = new MatTableDataSource(this.searchResults);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.ref.detectChanges();
    this.blockUI.stop();

  }
  // test success
  clear() {
    this.showDetail = false;
    this.searchResults = []
    this.personDetails = {
      id: 0,
      name: "",
      cip: "",
      dni: "",
      status: 0,
      comment: "",
      phone: "",
      mail: ""
    }
    this.coronaAdminForm.byemployeeinp.setValue("");
    this.ref.detectChanges();
    this.coronaAdminForm.typeWork.setValue("")
    this.coronaAdminForm.healthPerson.setValue("");
    this.coronaAdminForm.statusWork.setValue("");
  }
  // test success
  showDetails(emp: CoronaEmployee) {
    this.showDetail = true;
    this.personDetails = emp;
    if (emp.id_request) {
      this.blockUI.start("Cargando...")
      this.adminService.showDetailsCoronaAdmin(emp.id_request).toPromise().then(resp => {
        this.responseShowDetails(resp, emp);
      })
    } else {
      this.personDetails.details = [];
    }
  }
  // test success
  responseConditionSize(size:number){
    if (size > 0) {
      /* console.log("ARRAY CONDITION"); */
      this.conditionPrecondition = true;
      let array_size = size - 1;
      if(this.arrayCondition[array_size].precondition_1 === 1){
        this.coronaAdminForm.chk00.setValue(true);
      }else{
        this.coronaAdminForm.chk00.setValue(false);
      }
      if(this.arrayCondition[array_size].precondition_2 === 1){
        this.coronaAdminForm.chk01.setValue(true);
      }else{
        this.coronaAdminForm.chk01.setValue(false);
      }
      if(this.arrayCondition[array_size].precondition_3 === 1){
        this.coronaAdminForm.chk02.setValue(true);
      }else{
        this.coronaAdminForm.chk02.setValue(false);
      }
      if(this.arrayCondition[array_size].precondition_4 === 1){
        this.coronaAdminForm.chk03.setValue(true);
      }else{
        this.coronaAdminForm.chk03.setValue(false);
      }
      if(this.arrayCondition[array_size].precondition_5 === 1){
        this.coronaAdminForm.chk04.setValue(true);
      }else{
        this.coronaAdminForm.chk04.setValue(false);
      }
      if(this.arrayCondition[array_size].precondition_6 === 1){
        this.coronaAdminForm.chk05.setValue(true);
      }else{
        this.coronaAdminForm.chk05.setValue(false);
      }
      if(this.arrayCondition[array_size].precondition_7 === 1){
        this.coronaAdminForm.chk06.setValue(true);
      }else{
        this.coronaAdminForm.chk06.setValue(false);
      }
      if(this.arrayCondition[array_size].precondition_8 === 1){
        this.coronaAdminForm.chk07.setValue(true);
      }else{
        this.coronaAdminForm.chk07.setValue(false);
      }
      if(this.arrayCondition[array_size].precondition_9 === 1){
        this.coronaAdminForm.chk08.setValue(true);
      }else{
        this.coronaAdminForm.chk08.setValue(false);
      }
      if(this.arrayCondition[array_size].precondition_10 === 1){
        this.coronaAdminForm.chk09.setValue(true);
      }else{
        this.coronaAdminForm.chk09.setValue(false);
      }
      this.ref.detectChanges();
    } else {
      this.conditionPrecondition = false;
      this.ref.detectChanges();
    }
  }
  // test success
  responseShowDetails(response: any, emp: CoronaEmployee) {
    try {
      if (response['code']) {
        this.personDetails.details = response['details'];
        this.searchResults.forEach(element => {
          this.responseEqualsId(emp.id,element.id,element);
        });
      } else {
        this.blockUI.stop();
        this.personDetails.details = [];
        this.ref.detectChanges();
      }

    } catch (error) {
      console.log(error);
    }
  }
  responseEqualsId(objEmpId:any,arrayEmpId:any,element:any){
    if (objEmpId === arrayEmpId) {
      /* console.log("RESPONSE SHOW DETAILS") */
      this.arrayCondition.push(element);
      let size=this.arrayCondition.length;
      this.responseConditionSize(size);
      this.blockUI.stop();
    }
  }
  // test success
  showPreconditionByCondition() {
    if (this.coronaAdminForm.chk00.value === false && this.coronaAdminForm.chk01.value === false &&
      this.coronaAdminForm.chk02.value === false && this.coronaAdminForm.chk03.value === false &&
      this.coronaAdminForm.chk04.value === false && this.coronaAdminForm.chk05.value === false &&
      this.coronaAdminForm.chk06.value === false && this.coronaAdminForm.chk07.value === false &&
      this.coronaAdminForm.chk08.value === false && this.coronaAdminForm.chk09.value === false) {
      return true
    }
    return false
  }
  // test success
  showDataEdit(id_employee: any) {
    const dialogRef = this.dialog.open(CoronavirusHomeComponent, {
      width: '1100px',
      height: '90vh',
      data: {
        id: id_employee,
        condition: true,
        rol: "CORONA_ADMIN",
        flag: 1,
        levelAccess: 3
      }
    });
    dialogRef.afterClosed().subscribe(_result => {
      this.searchByEmployee(this.coronaAdminForm.byemployeeinp.value);
    });
  }
  // test success
  onFileChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.src = JSON.stringify(reader.result);
      this.type = file["type"]
      this.filename = file["name"]
      this.uploadFile(this.src, this.filename, "##", 1, this.user.id);
      this.ref.detectChanges();
    };
  }
  // test success
  resetInput() {
    this.btnfileinputAdm.nativeElement.value = "";
  }

  // test success
  uploadFile(src: string, fileName: string, identifiers: string, point: number, userId: string) {
    if (point === 1) {
      this.blockUI.start("Guardando datos...")
    }
    this.adminService.saveMassiveCoronaRequest(fileName, src, identifiers, userId).subscribe(file => {
      this.responseUploadFile(file);
    })
  }
  // test success
  responseUploadFile(file: any) {
    if (file["condition"] == true) {
      this.adminService.showAlertCoronaFormAdmin("success", "Los datos fueron registrados con éxito.");
      this.blockUI.stop()
    } else {
      this.blockUI.stop()
      this.adminService.showAlertCoronaFormAdmin("error", file["message"]);
    }
    this.resetInput();
    this.ref.detectChanges();

  }
  // test success
  ngOnInit(): void {
    this.startedData();
    this.initData();
    this.loadDataCdo();
  }
  ngAfterViewInit(): void {
    this.auth.executeValidateSession(this.user);
  }
}
