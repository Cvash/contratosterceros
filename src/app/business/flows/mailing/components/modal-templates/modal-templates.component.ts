import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { IMailTemplate } from '../../models/responseMailing';
import { MailingService } from '../../services/mailing.service';

@Component({
  selector: 'app-modal-templates',
  templateUrl: './modal-templates.component.html',
  styleUrls: ['./modal-templates.component.scss']
})
export class ModalTemplatesComponent implements OnInit, AfterViewInit {
  @BlockUI() blockUI: NgBlockUI;
  data:Array<any>=[];
  displayedColumns: Array<string> = ['id', 'description','actions'];
  dataSource = new MatTableDataSource<any>(this.data);
  template:IMailTemplate=null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dat:any,
    public dialogRef:MatDialogRef<ModalTemplatesComponent>,
    private ref:ChangeDetectorRef,
    public templatesServ:MailingService
  ) { }
  
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;  
  ngOnInit(): void {
    this.initLoadTemplate(this.dat);
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  initLoadTemplate(dat:any){
    this.data = dat;
    this.dataSource = new MatTableDataSource(this.data);

    this.ref.detectChanges();
  }
  applyFilterTemplates(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  closeModal(): void {
    this.dialogRef.close({
      "template":this.template
    });
  }
  chargeTemplate(id:number):void{
    this.blockUI.start("Cargando plantilla...")
    this.templatesServ.chargeTemplate(id).toPromise().then(resp => {
      this.responsechargeTemplate(resp);
    })    
  }
  responsechargeTemplate(resp:any){
    this.blockUI.stop();
      const loadTemplate:IMailTemplate = {
        id:resp['id'],
        cc:resp['cc'],
        cco:resp['cco'],
        title:resp['title'],
        subject:resp['subject'],
        body:resp['body']
      }
      this.template = loadTemplate;
      this.dialogRef.close({
        "template":this.template
      });
  }
}
