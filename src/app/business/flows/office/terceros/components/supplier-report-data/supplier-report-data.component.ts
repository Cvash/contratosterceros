import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';
import { Company, CompanyService, ReportData } from '../../models/ResponseSupplier';
import { DatePipe } from '@angular/common';
import { IMainUser, IViewModule } from '../../../../../../../app/business/models/IModel-module';
import { SupplierReportReactiveService } from './supplier-report-reactive.service';
import { ReportService } from '../../services/report.service';
import { AuthServiceService } from '../../../../../../../app/commons/services/auth-service.service';

@Component({
  selector: 'app-supplier-report-data',
  templateUrl: './supplier-report-data.component.html',
  styleUrls: ['./supplier-report-data.component.scss']
})
export class SupplierReportDataComponent implements OnInit, AfterViewInit {
  moduleList: Array<IViewModule>=[];
  companyId = 0;
  nameCompany = "";
  nameService = "";
  filter = "";
  arrayCompanyOptions: Array<Company> = [];
  arrayCompanyServiceOptions: Array<CompanyService> = [];
  findCompanyServiceOptions: Array<CompanyService> = [];
  @BlockUI() blockUI: NgBlockUI;
  companyRuc: any = "5558745896520025";
  displayedColumns = [
    "DNI", "NAME", "LASTNAME1", "LASTNAME2", "SERVICENAME",
    "DATEGENERATE", "USERSTATUS", "DOCMEDIC", "QRSTATUS",
    "QRHOUR", "PERSONSTATUS", "REPORTHOUR", "PERSONDOOR",
    "CHECKING", "HOURIN", "TEMPIN", "HOUROUT", "TEMPOUT",
    "COUNTOUT", "COUNTIN"
  ]
  arrayReportGeneral: Array<ReportData> = [];
  dataSource = new MatTableDataSource(this.arrayReportGeneral);
  arrayIdService: Array<any> = []
  conditionAll:any = 0;
  userId = null;
  user: IMainUser = null;
  startDate:string = "";
  endDate:string = "";
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private ref: ChangeDetectorRef,
    private datePipe: DatePipe,
    public reportForm: SupplierReportReactiveService,
    private report: ReportService,
    public auth:AuthServiceService) {
    
  }
  // test success
  ngOnInit(): void {
    this.reportForm.companyId.setValue(null);
    this.user = JSON.parse(localStorage.getItem("user"));
    this.moduleList=JSON.parse(localStorage.getItem("modules"));
    this.auth.validateMenu("TERCEROS","/terceros/report",this.user,this.moduleList);
    this.loadDataOptions(this.user.id)
    this.disabledContent();
  }
  // test success
  errorHttpAlert(message: string) {
    this.blockUI.stop();
    Swal.fire({
      icon: 'error',
      text: message
    })
  }
  // test success
  loadDataOptions(userId: string) {
    this.blockUI.start("Cargando datos..");
    this.report.loadDataOptinos(userId).toPromise().then(d => {
        this.responseLoadDataOptions(d);
    })
  }
  // test success
  responseLoadDataOptions(d:any){
    /* console.log("RESPONSE LOAD DATA"); */
    if (d["condition"] === true) {
      this.arrayCompanyOptions = d["company"];
      this.arrayCompanyServiceOptions = d["services"];
      this.conditionAll = d["permission"]
      this.ref.detectChanges();
      if (this.conditionAll === 1) {
        this.findByIdCompany();
      }
    } else {
      this.errorHttpAlert(d['errors']);
    }
    this.blockUI.stop();
  }
  // test success
  findByIdCompany() {
    /* console.log("FIND BY COMPANY") */
    if (this.reportForm.companyId.value === 0) {
      /* console.log("COMPANY ID 0") */
      this.arrayIdService = []
      this.companyId = 0;
      this.arrayCompanyServiceOptions.forEach(element => {
        this.arrayIdService.push(element.id)
      });
    } else {
      /* console.log("COMPANY ID != 0") */
      this.findCompanyServiceOptions = [];
      this.reportForm.serviceId.setValue(0);
      this.arrayCompanyServiceOptions.forEach(element => {
        if (Number(element.id_company) === Number(this.reportForm.companyId.value)) {
          this.findCompanyServiceOptions.push(element);
        }
      });
    }
    this.reportForm.reportFormReactive.get("serviceId").enable();
    this.getNameCompany(this.reportForm.companyId.value);
    if (this.findCompanyServiceOptions.length > 0) {
      this.reportForm.endDate.enable();
      this.reportForm.startDate.enable();
    }
  }
  // test success
  clearContent() {
    /* console.log("CLEAR CONTENT"); */
    this.reportForm.companyId.setValue(null);
    this.reportForm.reportFormReactive.get("serviceId").disable();
    this.reportForm.serviceId.setValue(0);

    this.reportForm.reportFormReactive.get("startDate").disable();
    this.reportForm.startDate.setValue("");
    this.reportForm.reportFormReactive.get("endDate").disable();
    this.reportForm.endDate.setValue("");
  }
  // test success
  disabledContent() {
    /* console.log("DISABLED CONTENT") */
    this.reportForm.serviceId.disable();
    this.reportForm.startDate.disable();
    this.reportForm.endDate.disable();
    this.companyId = this.reportForm.companyId.value;
  }
  // test success
  getNameCompany(idComp: number) {
    /* console.log("GET NAME COMPANY") */
    if (idComp === 0) {
      this.nameCompany = "Todas las empresas."
      this.nameService = "Todos los servicios."
      this.ref.detectChanges();
    } else {
      /* console.log("COMPANY ID !== 0") */
      this.arrayCompanyOptions.forEach(element => {
        if (element.id === this.reportForm.companyId.value) {
          this.nameCompany = element.name;
          this.ref.detectChanges();
        }
      });
    }
  }
  // test success
  addDataSource(d: any) {
    /* console.log("ADD DATA SOURCE") */
    this.arrayReportGeneral = d["reportData"]
    if(this.arrayReportGeneral.length===0){ 
      Swal.fire({
        icon:"info",
        title:"No existen datos en el rango de fecha seleccionado."
      })
    }
    this.dataSource = new MatTableDataSource(this.arrayReportGeneral);
    this.dataSource.paginator = this.paginator;
    this.clearContent();
    this.ref.detectChanges();
  }
  // test success
  validateDataReport(user:IMainUser,conditionAll:number,companyId:number,serviceId:number,startDate:any,endDate:any) {
    
    if (user === null) {
      this.errorHttpAlert("Error, el id de usuario es incorrecto. Por favor, verificar existencia.")
      return false;
    }
    if (conditionAll === 0) {
      if (companyId === 0) {
        this.errorHttpAlert("Error, necesita seleccionar una empresa.");
        return false;
      } else {
        if (serviceId === 0) {
          this.errorHttpAlert("Error, necesita seleccionar un servicio.");
          return false;
        }
      }
    } else {
      if (conditionAll === 1 && companyId > 0) {
        if (serviceId === 0) {
          this.errorHttpAlert("Error, necesita seleccionar un servicio.");
          return false;
        }
      }
    }

    if (startDate === "" || endDate === "") {
      this.errorHttpAlert("Error, necesita seleccionar un rango de fecha.");
      return false;
    } else {
      if (this.datePipe.transform(startDate, "yyyy-MM-dd") > this.datePipe.transform(endDate, "yyyy-MM-dd")) {
        this.errorHttpAlert("Error, rango de fecha incorrecto.");
        return false;
      }
    }
    return true;
  }
  showPreviewOrDownload(typeAction: any) {
    let condition = true;
    if (typeAction === "P") {
      condition = this.validateDataReport(this.user,this.conditionAll,
        this.reportForm.companyId.value,
        this.reportForm.serviceId.value,
        this.reportForm.startDate.value,
        this.reportForm.endDate.value);
      if (condition !== false) {
        const json = {
          "userId": this.userId,
          "dateStart": this.datePipe.transform(this.reportForm.startDate.value, "yyyy-MM-dd"),
          "dateEnd": this.datePipe.transform(this.reportForm.endDate.value, "yyyy-MM-dd"),
          "idService": this.arrayIdService,
          "dataReport": "",
          "typeAction": typeAction
        }
        this.blockUI.start("Buscando datos...");
        this.report.generateReportSupplier(json).toPromise().then(d => {
          if (d["condition"]) {
            this.addDataSource(d)
          } else {
            this.errorHttpAlert(d["errors"]);
          }
          this.blockUI.stop();
        })
      }
    }
    if (typeAction === "R") {
      const json = {
        "userId": this.userId,
        "dateStart": "",
        "dateEnd": "",
        "idService": "",
        "dataReport": this.arrayReportGeneral,
        "typeAction": typeAction
      }
      this.blockUI.start("Generando reporte de terceros. Por favor, espere")
      this.report.downloadReportSupplier(json).toPromise().then(d => {
        const data = d;
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(data);
        link.target = "_blank";
        link.download = "REPORTE GENERAL TERCEROS.xlsx";
        link.click();
        this.blockUI.stop();
      })
    }
  }
  // test success
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // test success
  getServiceCompany() {
    this.arrayIdService = []
    this.arrayIdService.push(this.reportForm.serviceId.value);
    this.arrayCompanyServiceOptions.forEach(element => {
      if (element.id == this.reportForm.serviceId.value) {
        this.nameService = element.name;
        this.ref.detectChanges();
      }
    });
  }
  ngAfterViewInit(): void {
		this.auth.executeValidateSession(this.user);
  }
}
