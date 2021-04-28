import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { IChargedTemplate } from '../../models/responseDocument';


@Component({
  selector: 'app-modal-document-temp',
  templateUrl: './modal-document-temp.component.html',
  styleUrls: ['./modal-document-temp.component.scss']
})
export class ModalDocumentTempComponent implements OnInit{
  @BlockUI() blockUI: NgBlockUI;
  data:Array<IChargedTemplate>=[];
  displayedColumns: string[] = ['id', 'description','actions'];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // TEMPLATE
  template:IChargedTemplate;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dat:any,
    public dialogRef:MatDialogRef<ModalDocumentTempComponent>,
    private ref:ChangeDetectorRef
  ) { }
  

  ngOnInit(): void {
    this.data = this.dat;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.ref.detectChanges();
  }

  // test success
  closeModal(): void {
    this.dialogRef.close(
      {
        "condition":false,
        "template":this.template
      }
    );
  }
  // test success
  chargeTemplate(id){
    const selectedRow = this.data.find(p => p.id === id);
    this.template = selectedRow;
    this.ref.detectChanges();
    this.dialogRef.close(
      {
        "condition":true,
        "template":this.template
      }
    );
  }
  // test success
  applyFilterTemplate(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
