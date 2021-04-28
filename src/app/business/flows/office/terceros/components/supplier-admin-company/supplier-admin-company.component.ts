import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ReplaySubject } from 'rxjs';
import { IMainUser, IViewModule } from '../../../../../../../app/business/models/IModel-module';
import { AuthServiceService } from '../../../../../../../app/commons/services/auth-service.service';
import Swal from 'sweetalert2';
import { RequestCompany, RequestService, RequestUserService } from '../../models/RequestSupplier';
import { Company, CompanyService, ICompanyService, ShowMngTdp } from '../../models/ResponseSupplier';
import { ManagerTdpService } from '../../services/manager-tdp.service';
import { ModalAddManagerSupplierComponent } from '../modal-add-manager-supplier/modal-add-manager-supplier.component';
import { ModalAddManagerTdpComponent } from '../modal-add-manager-tdp/modal-add-manager-tdp.component';
import { ModalShowManagerTdpComponent } from '../modal-show-manager-tdp/modal-show-manager-tdp.component';
import { SupplierAdminReactiveService } from './supplier-admin-reactive.service';
export interface IRemoveGestor {
  condition: number;
  employee: {
    id: number;
  }
}
export interface ILstCompanyService{ 
  company_name:any;
  contact: any;
  createdBy: any;
  id: any;
  idManager: any;
  managerMail: any;
  ruc: any;
  service: any;
  status: any;
  background:any;
  condition:any;
  display:any;
}
@Component({
  selector: 'app-supplier-admin-company',
  templateUrl: './supplier-admin-company.component.html',
  styleUrls: ['./supplier-admin-company.component.scss']
})
export class SupplierAdminCompanyComponent implements OnInit, AfterViewInit {
  moduleList: Array<IViewModule> = [];

  // test success  
  conditionService: boolean = false;
  showMessageCondition: boolean = false;
  messageCondition: string = "";
  // list
  lstCompanies: Array<ILstCompanyService> = [];
  lstCompaniesOwn: Array<ICompanyService> = [];

  // mat table 
  flagFoundAdminRole = false
  displayedColumns: string[] = ['RUC', 'R_SOCIAL', 'SUPPLIER', 'GESTOR', 'STATUS', 'ADDGESTOR'];
  dataSource = new MatTableDataSource(this.lstCompaniesOwn);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // filter
  filteredRelation: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  optionCompany: Array<Company> = [];
  optionCompanyFilter: string[] = [];

  // array
  arrayCompanyService: Array<CompanyService> = []
  arrayGestorTdp: Array<ShowMngTdp> = []

  // object
  user: IMainUser = null;

  formDisabled: boolean = false;
  foundCondition: boolean = false;
  formCondition: boolean = false;

  newService: boolean = true;
  @BlockUI() blockUI: NgBlockUI;
  actionForm: string = '';
  // dto
  company: RequestCompany = {
    ruc: '',
    alias: '',
    name: '',
    activity: ''
  }
  service: RequestService = {
    id_company: 0,
    name: '',
    description: '',
    contactname: '',
    contactnumber: '',
    contactmail: '',
  }
  constructor(public formAdmin: SupplierAdminReactiveService,
    private ref: ChangeDetectorRef, private dialog: MatDialog,
    public manager: ManagerTdpService,
    private auth: AuthServiceService) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.moduleList = JSON.parse(localStorage.getItem("modules"));
    this.auth.validateMenu("TERCEROS", "/terceros/empresas", this.user, this.moduleList);
    this.loadContent(this.user)
  }
  ngAfterViewInit(): void {
    this.auth.executeValidateSession(this.user);
  }

  clearForms() {
    this.formAdmin.activity.setValue("");
    this.formAdmin.alias.setValue("");
    this.formAdmin.companyName.setValue("");
    this.formAdmin.ruc.setValue("");

    this.formAdmin.contactName.setValue("");
    this.formAdmin.contactNumber.setValue("");
    this.formAdmin.contactMail.setValue("");
    this.formAdmin.serviceName.setValue("");
    this.formAdmin.description.setValue("");

    this.formCondition = false;
    this.foundCondition = false;
  }

  // test success
  loadContent(user: IMainUser) {
    this.blockUI.start("Cargando...")
    this.manager.loadContentManager(user).subscribe(response => {
      this.addContent(response, this.user);
    })
  }
  // test success
  addContent(response: any, user: IMainUser) {
    console.log(response)
    this.lstCompanies = [];
    if (response['companies']) {
      this.flagFoundAdminRole = response["foundAdmin"];
      this.lstCompanies = response['companies'];
      console.log(this.lstCompanies)
      for (let index = 0; index < this.lstCompanies.length; index++) {
        const element = this.lstCompanies[index];
        if(Number(element.createdBy)===Number(user.id)){ 
          this.lstCompanies[index].background="#db5151";
          this.lstCompanies[index].condition="Asignado";
        }else{
          this.lstCompanies[index].background="#5bc500";
          this.lstCompanies[index].condition="No Asignado";
          this.lstCompanies[index].display="none";
        }

      }

      this.dataSource = new MatTableDataSource(this.lstCompanies);
      this.dataSource.paginator = this.paginator;
      this.ref.detectChanges();
    } this.blockUI.stop();
  }
  /*   addDescriptionCompany(response:any){
      console.log("addDescriptionCompany");
      console.log(response)
        this.conditionService=true;
        this.service=response["company"]
        this.ref.detectChanges();
    }
    showDescriptionCompanyService(idServ){
      this.manager.showDescriptionCompanyService(idServ).toPromise().then(response=>{
        this.addDescriptionCompany(response);
      })
    } */

  // test success
  nextForm() {
    this.findCompanyByRuc();
  }
  // test success
  previousTableCompanyService() {
    this.newService = true;
    this.formAdmin.ruc.enable();
    this.ref.detectChanges();
  }
  // test success
  showAddNewCompanyService(type) {
    this.formAdmin.ruc.setValue("");
    if (type == "E") {
      this.newService = false;
      this.clearForms();
    }
    if (type == "D") {
      this.newService = true;
      this.clearForms();
    }
  }
  // test success
  responseFindCompanyRuc(company: any) {
    this.foundCondition = company["condition"];
    if (this.foundCondition === true) {
      this.formAdmin.ruc.setValue(company["company"]["company_code"]);
      this.formAdmin.companyName.setValue(company["company"]["name"]);
      this.formAdmin.alias.setValue(company["company"]["alias"]);
      this.formAdmin.activity.setValue(company["company"]["activity"]);
      this.formAdmin.companyId.setValue(company["company"]["id"]);
      this.messageCondition = company["message"];
      this.formDisabled = true;
      this.formCondition = true;
      this.actionForm = "B";
      this.formAdmin.formAction.setValue("B");

      // disable
      this.formAdmin.ruc.disable();
      this.formAdmin.companyId.disable();
      this.formAdmin.activity.disable();
      this.formAdmin.alias.disable();
      this.formAdmin.companyName.disable();
      this.ref.detectChanges();
    } else {
      /* console.log("ENCONTRO") */
      this.actionForm = "B";
      this.formAdmin.formAction.setValue("B");
      this.formCondition = true;
      this.formDisabled = false;
      this.ref.detectChanges();
    }
  }
  // test success
  findCompanyByRuc() {
    if (this.formAdmin.ruc.value === "") {
      this.showMessageCondition = true;
      this.messageCondition = "Necesita ingresar el RUC de la empresa para poder crear un servicio."
    } else {
      this.manager.findCompanyByRuc(this.formAdmin.ruc.value).toPromise().then(company => {
        this.responseFindCompanyRuc(company);
      })
    }
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
  showDialogSuccessManagerTdp(response: any, compId: any, user: IMainUser) {
    if (response["condition"] == true) {
      this.arrayGestorTdp = response["employee"];
      const dialog = this.dialog.open(ModalShowManagerTdpComponent, {
        width: '700px',
        minHeight: '400px',
        data: {
          "gestorTdp": this.arrayGestorTdp
        }
      });
      dialog.afterClosed().subscribe((resp) => {
        try {
          this.executeRemoveGestorTdpService(resp.condition, resp.employee.id, compId, user.id);
        } catch (error) {
          console.log(error)
        }
      })
    }
  }
  // test successs
  executeRemoveGestorTdpService(condition: number, employeeId: number, idService: number, userId: number) {
    if (condition !== 0) {
      const body = {
        "id_emp": employeeId,
        "user_id": userId,
        "idService": idService
      }
      this.removeGestorTdpService(body);
    }
  }
  // test success
  showManagerGestor(obj: any) {
    this.manager.showManagerGestorTdp(obj).toPromise().then(resp => {
      this.showDialogSuccessManagerTdp(resp, obj.id, this.user);
    })
  }
  // test success
  showSweetAlertMessage(banner: any, message: string) {
    Swal.fire({
      icon: banner,
      text: message
    });
  }
  // test success
  showAlertResponse(response: any) {
    if (response["condition"]) {
      this.showSweetAlertMessage("success", response["message"]);
      this.blockUI.stop();
    } else {
      this.showSweetAlertMessage("error", response["errors"])
      this.blockUI.stop();
    }
  }
  // test success
  removeGestorTdpService(obj: {
    id_emp: number,
    user_id: number,
    idService: number
  }) {
    this.blockUI.start("Procesando..")
    this.manager.removeGestorTdpService(obj).toPromise().then(
      (response: {
        condition: boolean;
        message: string;
      }) => {
        this.blockUI.stop();
        this.responseRemoveGestorTdpService(response);
      }
    )
  }
  // test success
  responseRemoveGestorTdpService(response: {
    condition: boolean;
    message: string;
  }) {
    if (response.condition === true) {

      this.showSweetAlertMessage('info', response.message);
      this.loadContent(this.user);
    } else {
      this.showSweetAlertMessage('error', response.message);

    }
  }
  // test success
  addUserService(userService: RequestUserService) {
    this.blockUI.start("Procesando..");
    this.manager.addUserService(userService).toPromise().then(response => {
      // colocar aqui
      this.showAlertResponse(response);
    });
  }
  // test success
  validateFormCompanyService() {
    if (this.formAdmin.ruc.value === "") {
      this.showSweetAlertMessage("warning", "El campo RUC es obligatorio.");
      return true;
    } else if (this.formAdmin.companyName.value === "") {
      this.showSweetAlertMessage("warning", "El campo Razón social es obligatorio.")
      return true;

    } else if (this.formAdmin.serviceName.value === "") {
      this.showSweetAlertMessage("warning", "El campo Nombre del servicio social es obligatorio.");
      return true;
    } else if (this.formAdmin.contactName.value === "") {
      this.showSweetAlertMessage("warning", "El campo Persona de contacto es obligatorio.");
      return true;
    } else if (this.formAdmin.contactNumber.value === "") {
      this.showSweetAlertMessage("warning", "El campo Número de contacto es obligatorio,")
      return true;
    }
    return false
  }
  // test success
  responseCreateCompanyService(response: any) {
    this.blockUI.stop();
    if (response['status'] === 1) {
      Swal.fire({
        icon: "success",
        title: "El servicio tercero se registró correctamente."
      }).then((response) => {
        this.responseThenSwal();
      })
    } else {
      this.showSweetAlertMessage("error", response["message"])
    }
  }
  responseThenSwal() {
    this.formAdmin.formAction.setValue("");
    this.clearForms();
    this.previousTableCompanyService();
    this.loadContent(this.user);
    this.ref.detectChanges();
  }
  // test success
  captureCompanyObject(): RequestCompany {
    return this.company = {
      ruc: this.formAdmin.ruc.value,
      alias: this.formAdmin.alias.value,
      name: this.formAdmin.companyName.value,
      activity: this.formAdmin.activity.value
    }
  }
  // test success
  captureServiceObject(): RequestService {
    return this.service = {
      id_company: this.formAdmin.companyId.value,
      name: this.formAdmin.serviceName.value,
      description: this.formAdmin.description.value,
      contactname: this.formAdmin.contactName.value,
      contactmail: this.formAdmin.contactMail.value,
      contactnumber: this.formAdmin.contactNumber.value
    }
  }
  // test success
  createCompanyService() {
    if (!this.validateFormCompanyService()) {
      const request = {
        action: this.foundCondition == true ? "C" : this.formAdmin.formAction.value,
        company: this.captureCompanyObject(), service: this.captureServiceObject(), id_user: this.user.id
      };
      this.blockUI.start("Procesando...")
      this.manager.createCompanyService(request).toPromise().then(
        (response) => {
          this.responseCreateCompanyService(response);
        }
      )
    }
  }
  // test success
  asignManagerGestor(obj: any) {
    const dialog = this.dialog.open(ModalAddManagerTdpComponent, {
      width: '700px',
      minHeight: '400px',
      minWidth: '400px',
      data: {
        "serviceObj": obj
      }
    });
    dialog.afterClosed().subscribe(resp => {
      this.responseAsignManagerGestor(resp, obj.id, this.user);
    })
  }
  // test success
  responseAsignManagerGestor(resp: any, serviceId: any, userId: IMainUser) {
    try {
      if (resp["condition"] === 1) {
        const body = {
          "id_emp": resp["employee"]["id"],
          "id_serv": serviceId,
          "created_by": userId.id,
          "updated_by": userId.id
        }
        this.addUserService(body);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // test success
  previousForm() {
    this.clearForms();
    this.formCondition = false;
    this.showMessageCondition = false;
    this.formAdmin.ruc.enable();
    this.messageCondition = "";
    this.ref.detectChanges();
  }
  // test success
  asignManager(mng) {
    const dialog = this.dialog.open(ModalAddManagerSupplierComponent, {
      width: '600px',
      minHeight: '400px',
      data: {
        comp: mng
      }
    });
    dialog.afterClosed().subscribe((response) => {
      this.responseAsignManager(response, this.user);
    });
  }
  // test success
  responseAsignManager(response: any, user: IMainUser) {
    if (response !== null) {
      const result = response["result"];
      const mail = response["mail"];
      if (result) {
        this.loadContent(user);
        const long = this.lstCompanies.length
        this.lstCompanies[long - 1].idManager = 0;
        this.lstCompanies[long - 1].managerMail = mail;
        this.ref.detectChanges();
      }
    }
  }
}
