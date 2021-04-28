import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { IViewMain} from '../../../../../../business/models/IModel-module';
import Swal from 'sweetalert2';
import { EmployeeData } from '../../models/ResponseSupplier';
import { ManagerTdpService } from '../../services/manager-tdp.service';

@Component({
  selector: 'app-modal-add-manager-tdp',
  templateUrl: './modal-add-manager-tdp.component.html',
  styleUrls: ['./modal-add-manager-tdp.component.scss']
})
export class ModalAddManagerTdpComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @BlockUI() blockUI: NgBlockUI;
  byemployeeinp = "";
  serviceName = ""

  module: Array<IViewMain> = [];
  // ROLES
  arrayIdRole: Array<any> = [];
  // MAT TABLE 
  // ARRAY EMPLOYEE
  lstEmployee: Array<EmployeeData> = [];
  displayedColumns: string[] = ['CIP', 'DOC', 'NAME', 'LASTNAME1', 'LASTNAME2', 'ACTION'];
  dataSource = new MatTableDataSource(this.lstEmployee)
  
  constructor(
    private manager: ManagerTdpService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalAddManagerTdpComponent>
  ) { }
  ngOnInit(): void {
    this.loadDataManager(this.data);
  }
  // test success
  loadDataManager(data:any) {
    setTimeout(() => {
      this.addPermissionSearch();
    }, 500);
    setTimeout(() => {
      this.addDataToVariable(data);
    }, 500);
  }
  // test success
  addPermissionSearch() {
    this.module = JSON.parse(localStorage.getItem("permission"));
    this.module.forEach(element => {
      element.entitlement.forEach(entitle => {
        entitle.manageableAsset.forEach(manageable => {
          if (manageable.action === "R&W") {
            this.arrayIdRole.push(element.id);
          }
        });
      });
    });
  }
  // test success
  addDataToVariable(data:any) {
    if (data !== null) {
      this.serviceName = data.serviceObj.service;
    }
  }
  // test success
  onClose() {
    let json = {
      "condition": 0
    }
    this.dialogRef.close(json)
  }
  searchByEmployee() {
    this.blockUI.start("Buscando colaboradores...");
    const request = { filter: this.byemployeeinp, role_x: this.arrayIdRole }
    this.manager.searchEmployeeByEntity(request).toPromise().then(resp => {
      if (resp['status'] == 1) {
        this.addDataSourceEmployee(resp);
      } else {
        this.errorAlertTdpManager("Error, no se pudo cargar lo data. Comunicarse con el area correspondiente.");
      }

    })
  }
  // test success
  addDataSourceEmployee(resp: any) {
    this.lstEmployee = resp["employee"];
    this.dataSource = new MatTableDataSource(this.lstEmployee)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.blockUI.stop();
  }
  // test success
  errorAlertTdpManager(message: string) {
    this.blockUI.stop();
    Swal.fire({
      icon: "error",
      title: message
    })
  }
  // test success
  asignManagerTdp(emp: EmployeeData) {
    let json = {
      "condition": 1,
      "employee": emp
    }
    this.dialogRef.close(json);
  }
}
