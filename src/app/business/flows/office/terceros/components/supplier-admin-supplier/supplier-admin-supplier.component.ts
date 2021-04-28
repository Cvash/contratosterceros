import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { IMainUser, IViewModule } from '../../../../../../../app/business/models/IModel-module';
import { AuthServiceService } from '../../../../../../../app/commons/services/auth-service.service';
import { IResponseManagementSupplier, IServicesDisabled, ISuppServices } from '../../models/ResponseSupplier';
import { ManagerSupplierService } from '../../services/manager-supplier.service';
import { ModalAddNewSupplierComponent } from '../modal-add-new-supplier/modal-add-new-supplier.component';
import { ModalEnabledSupplierComponent } from '../modal-enabled-supplier/modal-enabled-supplier.component';
import { ModalMassiveSupplierComponent } from '../modal-massive-supplier/modal-massive-supplier.component';
import { ModalQuestionDeteleComponent } from '../modal-question-detele/modal-question-detele.component';
import { SupplierAdminSupplierReactiveService } from './supplier-admin-reactive.service';

@Component({
  selector: 'app-supplier-admin-supplier',
  templateUrl: './supplier-admin-supplier.component.html',
  styleUrls: ['./supplier-admin-supplier.component.scss']
})
export class SupplierAdminSupplierComponent implements OnInit, AfterViewInit {
  moduleList: Array<IViewModule>=[];
  // array
  suppliers: IResponseManagementSupplier[]=[];
  suppliersBack: IResponseManagementSupplier[]=[];
  deshabilitados: IResponseManagementSupplier[]=[];
  suppliersCompanyService: Array<any> =[];
  suppliersGestorCompanyService: Array<ISuppServices> = [];
  suppliersServiceDisabled: Array<IServicesDisabled> = [];


  user: IMainUser = null;
  // mat tables
  displayedColumns = []
  displayColumnsService = ["SUPPLIERNAME", "SERVICENAME", "COMPANYNAME", "CONDITION", "ACTION"]
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('MatPaginatorDisabled', { read: MatPaginator, static: true }) paginator2: MatPaginator;
  dataSource = new MatTableDataSource(this.suppliers);
  dataSourceService = new MatTableDataSource(this.suppliersServiceDisabled);


  // ng block ui
  @BlockUI() blockUI: NgBlockUI;

  // form
  today: string = "";
  loading: boolean = true;
  company: {
    company: number;
    companyName: string;
    contactMail: string;
    contactPerson: string;
    contactPhone: string;
    created_at: string;
    description: string;
    id: number,
    managerMail: string;
    managerTdpOwnerMail: string;
    name: string;
    status: boolean;
    updated_at: string;
  } = null;
  supplierId:number = 0;
  gestorName:string = ""
  filtro:string= '';
  serviceId: number = 0;
  
  companyName:string = "";
  type:string = "";
  conditionLoad:number = 0;
  sizeSupplierCompanyService:number = 0;
  cssSuccess:string = "";
  cssCancel:string = "";
  cssWait:string = "";

  constructor(
    private dialog: MatDialog,
    private ref: ChangeDetectorRef,
    private supplierManager: ManagerSupplierService,
    public supplierForm: SupplierAdminSupplierReactiveService,
    public auth:AuthServiceService
    ) {
    
   }
   
  // test success
  laodData(init: number) {
    this.blockUI.start("Cargando datos");
    this.supplierManager.loadManagementSupplierData(this.user.relatedParty.id, this.supplierForm.serviceId.value).toPromise().then(resp => {
      this.responseLoadData(resp,init);
    })
  }
  // test success
  responseLoadData(resp:any,init:number){
    /* console.log("LOAD DATA") */
    if (resp['status'] === 1) {
      this.company = resp['company'];
      this.companyName = this.company.companyName
      this.suppliersCompanyService = resp["services"];
      this.sizeSupplierCompanyService = this.suppliersCompanyService.length;
      this.ref.detectChanges();
    }
    if (resp['status'] === 1) {
      this.loadDataSuppliers(init);
    }
    if (resp["status"] === 0) {
      this.blockUI.stop();
      this.supplierManager.showAlertCondition('success', resp['errors']);
    }
  }
  // test success
  loadDataSuppliers(init: any) {
    /* console.log("load data supplier"); */
    let lstIdServices = []
    this.serviceId=this.supplierForm.serviceId.value;
    if (this.serviceId === 0) {
      this.suppliersCompanyService.forEach(element => {
        lstIdServices.push(element.id);
      });
    } else {
      lstIdServices.push(this.serviceId);
    }
    this.supplierManager.loadManagementSubSupplierData(lstIdServices, this.user.id).toPromise().then(
      (response) => {
        // aqui
        /* console.log("RESPONSE DATA SUP") */
        this.responseLoadDataSuppliers(response, init,this.serviceId);
      },
      (error: HttpErrorResponse) => {
        this.supplierManager.showAlertCondition('error', error.statusText);
      }
    )
  }
  // test success
  responseLoadDataSuppliers(response: any, init: any,serviceId) {
    if (response["status"] == 1) {
      this.suppliers = [...response['suppliers']];
      this.dataSource = new MatTableDataSource(this.suppliers);
      this.dataSource.paginator = this.paginator;
      this.suppliersBack = [...response['suppliers']];
      this.deshabilitados = [...this.suppliersBack.filter(p => p.coronaStatus == 2)];
      this.suppliersServiceDisabled = [...response["serviceDisabled"]];
      this.dataSourceService = new MatTableDataSource(this.suppliersServiceDisabled);
      this.dataSourceService.paginator = this.paginator2;
      this.loading = false;
      this.conditionLoad = 1;
      if (init === 0) {
        if (this.conditionLoad === 1) {
          if (this.sizeSupplierCompanyService === 1) {
            this.supplierForm.serviceId.setValue(this.suppliersCompanyService[0].id);
            this.ref.detectChanges();
          }
          if (this.sizeSupplierCompanyService > 1) {
            this.supplierForm.serviceId.setValue(0);
            this.ref.detectChanges();
          }
        }
      }
      if (serviceId === 0) {
        this.displayedColumns = ["DOCUMENT", "NAME", "MAIL", "CODECOMPANY", "SEX", "SERVICE", "STATUS", "CHECKING", "ACTION"];
      } else {
        this.displayedColumns = ["DOCUMENT", "NAME", "MAIL", "CODECOMPANY", "SEX", "SERVICE", "STATUS", "CHECKING", "ACTION", "ADDGESTOR"]

      }
      this.cssSuccess = "{background-color: #5bc500;color: #ffffff;padding: 5px 8px;border-radius: 5px;}"
      this.cssCancel = "{background-color: #e87171;color: #ffffff;padding: 5px 8px;border-radius: 5px;}"
      this.cssWait = "{background-color: #00a9e0;;color: #ffffff;padding: 5px 8px;border-radius: 5px;}"
      this.blockUI.stop();
      this.ref.detectChanges();

    } else {
      this.supplierManager.showAlertCondition('success', response["errors"]);
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
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceService.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceService.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // test success
  deleteSupplier(suppId: number, typeAction: string) {
    this.suppliersGestorCompanyService = []
    this.supplierManager.getCompanyServiceByUser(suppId, this.user.id, typeAction).toPromise().then(response => {
      this.responseDeleteSupplier(response, suppId, typeAction)
    })

  }
  // test success
  responseDeleteSupplier(response: any, suppId: number, typeAction: string) {
    if (response["condition"] == true) {
      this.suppliersGestorCompanyService = response["array"]
      this.type = "";
      let auxServiceOption: Array<any> = []
      let supplierName = "";
      if (typeAction === "D") {
        this.suppliers.forEach(element => {
          if (element.id === suppId) {
            supplierName = element.name
          }
        });
        this.suppliersCompanyService.forEach(element => {
          this.suppliersGestorCompanyService.forEach(element2 => {
            if (element.id == element2.id) {
              auxServiceOption.push(element2)
            }
          });
        });
        this.ref.detectChanges();
        const dialog = this.dialog.open(ModalQuestionDeteleComponent, {
          width: '600px',
          height: '350px',
          minHeight:"300px",
          minWidth:'350px',
          data: {
            serviceOption: auxServiceOption,
            suppName: supplierName,
            gestorName: this.gestorName,
            typeAct: typeAction,
            idService: this.supplierForm.serviceId.value
          }
        })
        dialog.afterClosed().subscribe(d => {
          this.responseAfterClosedQuestionDelete(d,suppId);
        })
      }
      if (typeAction === "E") {
        this.suppliersServiceDisabled.forEach(element => {
          if (element.idSupplier === suppId) {
            supplierName = element.supplierName;
          }
        });
        auxServiceOption = this.suppliersGestorCompanyService;
        const dialog = this.dialog.open(ModalQuestionDeteleComponent, {
          width: '600px',
          minHeight: '400px',
          data: {
            serviceOption: auxServiceOption,
            suppName: supplierName,
            gestorName: this.gestorName,
            typeAct: typeAction
          }
        })
        dialog.afterClosed().subscribe(d => {
          this.responseAfterClosedQuestionDelete(d,suppId);
        })
      }

    }
  }
  responseAfterClosedQuestionDelete(d:any,suppId:number){
    if (d !== null) {
      if (d["flagActive"] === 1) {
        if (d["cond"] === true) {
          this.removeSupplier(suppId, d["cond"], d["idService"], this.user.id, d["actionType"]);
        }
      }
    }
  }
  // test success
  removeSupplier(suppId: number, cond: boolean, serviceId: number, userId: string, typeAction: string) {
    if (cond == true) {
      this.blockUI.start("Procesando...")
      this.supplierManager.removeSupplierFromService(suppId, serviceId, userId, typeAction).toPromise().then(response => {
        this.repsonseRemoveSupplier(response, typeAction, suppId);
      })
    }
  }
  // test success
  repsonseRemoveSupplier(response: any, typeAction: string, suppId: number) {
    if (response['status'] == 1) {
      // BORRAR DEL ARREGLO BACK
      let idxb = this.suppliersBack.indexOf(this.suppliersBack.find(p => p.id === suppId));
      if (idxb != -1) this.suppliers.splice(idxb, 1);
      // BORRAR DEL ARREGLO
      let idx = this.suppliers.indexOf(this.suppliers.find(p => p.id === suppId));
      if (idx != -1) this.suppliers.splice(idx, 1);
      this.ref.detectChanges();
      this.blockUI.stop();

      if (typeAction === "D") {
        this.supplierManager.showAlertCondition('success', response["message"]);

      } else if(typeAction === "E"){
        this.supplierManager.showAlertCondition('success', response["message"]);
      }
      this.laodData(1);
    } else {
      this.blockUI.stop();
      this.supplierManager.showAlertCondition('error', response["errors"]);
    }
  }
  // test success
  editSupplier(suptoedit: IResponseManagementSupplier) {
    const dialog = this.dialog.open(ModalAddNewSupplierComponent, {
      width: '600px',
      minHeight: '400px',
      data: {
        idCompany: this.company.id,
        supplier: suptoedit,
        supplierOption: this.suppliersCompanyService,
        conditionEdit: false, actionForm: "E",
        idService: this.supplierForm.serviceId.value
      }
    });
    dialog.afterClosed().subscribe((response) => {
      /* console.log("EDIT SUPPLIER"); */
      this.responseEditAfterClosedSupplier(response,suptoedit);
      
    });
  }
  // test success
  responseEditAfterClosedSupplier(response:any,suptoedit: IResponseManagementSupplier){
    if(response["result"]!==false){
      const result = response["result"];
      const edited = response["supplier"];
      if (result) {
        // EDITAR DEL ARREGLO
        let idx = this.suppliers.indexOf(this.suppliers.find(p => p.id == suptoedit.id));
        if (idx !== -1) this.suppliers[idx] = edited;
        // EDITAR DEL BACK
        let idxb = this.suppliersBack.indexOf(this.suppliersBack.find(p => p.id == suptoedit.id));
        if (idxb !== -1) this.suppliersBack[idxb] = edited;
        this.laodData(1);
        this.ref.detectChanges();
      }
    }
  }
  // test success
  newTercero() {
    this.serviceId=this.supplierForm.serviceId.value;
    const dialog = this.dialog.open(ModalAddNewSupplierComponent, {
      width: '600px',
      minHeight: '400px',
      data: {
        idCompany: this.company===null?0:this.company.id, supplier: null,
        supplierOption: this.suppliersCompanyService,
        conditionEdit: false,
        actionForm: "S",
        idService: this.supplierForm.serviceId.value
      }
    });
    dialog.afterClosed().subscribe((response) => {
      /* console.log("SAVE SUPPLIER") */
      this.responseNewTerceroAfterClosed(response);
    });
  }
  responseNewTerceroAfterClosed(response:any){
    if(response!=="undefined"){ 
      const result = response["result"];
      const created = response["supplier"];
      if (result) {
        // AGREGAR AL ARREGLO
        this.suppliers.push(created);
        // AGREGAR AL BACK
        this.suppliersBack.push(created);
        this.laodData(1);
        this.ref.detectChanges();
      }
      }
  }
  // test success
  asignNewGestor(sup: IResponseManagementSupplier) {
    this.blockUI.start("Procesando..")
    this.supplierManager.addNewServiceManagement(sup.id, this.supplierForm.serviceId.value, this.user.id)
      .toPromise().then(response => {
        this.responseAsignNewGestor(response);
      })
  }
  // test success
  responseAsignNewGestor(response: any) {
    if (response["condition"]) {
      this.supplierManager.showAlertCondition('success', response["message"]);
      this.laodData(0);
    } else {
      this.supplierManager.showAlertCondition('error', response["message"]);
    }
    this.blockUI.stop();
  }
  // test success
  masiveChargeModal() {
    const dialog = this.dialog.open(ModalMassiveSupplierComponent, {
      width: '80%',
      minHeight: '400px',
      data: { supplierOption: this.suppliersCompanyService, idService: this.serviceId }
    });
    dialog.afterClosed().subscribe((response) => {
      /* console.log("MASSIVE CHARGE MODAL"); */
      this.responseMassiveCharge(response);
      
    });
  }
  // test success
  responseMassiveCharge(response:any){
    /* console.log("responseMAssiveCharge") */
    if(response!=='undefined' || response!==null){ 
      const result = response["result"];
    const datos: IResponseManagementSupplier[] = response["dataSheet"];
    if (result) {
      // AGREGAR AL ARREGLO
      this.suppliers = [...this.suppliers.concat(datos)];
      // AGREGAR AL BACK
      this.suppliersBack = [...this.suppliersBack.concat(datos)];
      this.laodData(1);
      this.ref.detectChanges();
    }
    }
  }
  // test success
  clear() {
    this.filtro = '';
    this.suppliers = this.suppliersBack;
  }
  // test success
  changeFilter(e) {
    this.suppliers = [...this.suppliersBack.filter(p =>
      p.name.toLowerCase().includes(e.toLowerCase()) ||
      p.mail.toLowerCase().includes(e.toLowerCase()) ||
      (p.nationalId).toString().toLowerCase().includes(e.toLowerCase())
    )]
  }
  // test success
  getCoronaStatus(id: number) {
    switch (id) {
      case 1:
        return "Sin novedad";
      case 2:
        return "Deshabilitado"
      default:
        return "Sin definir";
    }
  }
  // test success
  habilitar(sup) {
    /* console.log("HABILITAR") */
    this.dialog.open(ModalEnabledSupplierComponent, {
      width: '600px',
      minHeight: '400px',
      data: sup
    }).afterClosed().subscribe(() => {
      this.loading = true;
      this.laodData(1);
      this.ref.detectChanges();
    });
  }
  // test success
  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("user"));
    this.moduleList=JSON.parse(localStorage.getItem("modules"));
    this.auth.validateMenu("TERCEROS","/terceros/admin",this.user,this.moduleList);
    this.ref.detectChanges();
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    this.today = year + "-" + (month > 9 ? month.toString() : "0" + month) + "-" + (day > 9 ? day.toString() : "0" + day);
    this.gestorName = String(this.user.relatedParty.name).replace("/"," ");
    this.ref.detectChanges();
    this.laodData(0);
    
  }
  ngAfterViewInit(): void {
		this.auth.executeValidateSession(this.user);
  }

}
