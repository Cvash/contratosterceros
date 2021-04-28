import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ShowMngTdp } from '../../models/ResponseSupplier';

@Component({
  selector: 'app-modal-show-manager-tdp',
  templateUrl: './modal-show-manager-tdp.component.html',
  styleUrls: ['./modal-show-manager-tdp.component.scss']
})
export class ModalShowManagerTdpComponent implements OnInit {
  // test success
  serviceName="";
  displayedColumns=["DOC","CIP","NAME","ACTION"]
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  arrayGestorTdp:Array<ShowMngTdp>=[]
  dataSource=new MatTableDataSource(this.arrayGestorTdp);
  body:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef:MatDialogRef<ModalShowManagerTdpComponent>,
    private ref:ChangeDetectorRef
  ) {
    
   }
  // test success
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // test success
  OnClose(){
    this.body={
      "condition":0
    }
    this.dialogRef.close(this.body);
  }
  // test success
  loadData(data:any){
    if(data!==null){
      this.arrayGestorTdp=data.gestorTdp;
      this.ref.detectChanges();
    }
  }
  // test success
  showGestorDataTdp(arrayGestorTdp:Array<ShowMngTdp>){
    this.arrayGestorTdp=arrayGestorTdp;
    this.dataSource=new MatTableDataSource(this.arrayGestorTdp);
    this.dataSource.paginator=this.paginator;
    this.ref.detectChanges();
   
  }
  // test success
  ngOnInit(): void {
    this.loadData(this.data);
    this.showGestorDataTdp(this.arrayGestorTdp);
  }
  // test success
  disabledRoleTdpMng(obj:any){
    this.body={
      "condition":1,
      "employee":obj
    }
    this.dialogRef.close(this.body);
  }
}
