import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { IncidentsService } from '../../yo-te-ayudo/services/incidents.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { IMainUser } from 'src/app/business/models/IModel-module';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormGroup, FormControl } from '@angular/forms';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { HttpErrorResponse } from '@angular/common/http';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXT = '.xlsx';



@Component({
	selector: 'app-emb-dialog-reporte-excel',
	templateUrl: './emb-dialog-reporte-excel.component.html',
	styleUrls: ['./emb-dialog-reporte-excel.component.scss']
})
export class EmbDialogReporteExcelComponent implements OnInit {

	range = new FormGroup({
		start: new FormControl(),
		end: new FormControl()
	});

	@BlockUI() blockUI: NgBlockUI;
	Columns_Incident_Details: string[] = [
		'id', 'Nombres', 'DNI', 'Teléfono', 'Correo', 'Teléfono_contacto', 'Red', 'Caso', 'Consulta', 'Nombre_embajador', 'Cell_embajador', 'Mail_embajador', 'Comentario', 'Creado', 'Actualización', 'Estado'];

	Columns_Incident_Details2: string[] = [
		'id', 'Nombres', 'DNI', 'Teléfono', 'Correo', 'Teléfono_contacto', 'Red', 'Caso', 'Consulta', 'Nombre_embajador', 'Cell_embajador', 'Mail_embajador', 'Comentario', 'Creado', 'Actualización', 'Estado', 'Comentario_inicio_atencion', 'Motivo', 'Submotivo'];

	Columns_Incident_Details3: string[] = [
		'id', 'Nombres', 'DNI', 'Teléfono', 'Correo', 'Teléfono_contacto', 'Red', 'Caso', 'Consulta', 'Nombre_embajador', 'Cell_embajador', 'Mail_embajador', 'Comentario', 'Creado', 'Actualización', 'Estado', 'Comentario_inicio_atencion', 'Motivo', 'Submotivo', 'No_corresponde', 'No_contacto', 'No_FFTT', 'Comentario_final', 'Se_hizo_ajuste', 'Importe_ajuste', 'Observacion_ajuste', 'Se_atendio_remedy', 'Codigo_remedy', 'Se_realizo_doit', 'Codigo_doit'];

	Columns_Reporte_Excel: string[] = [
		'id', 'Nombres', 'DNI', 'Teléfono', 'Correo', 'Teléfono_contacto', 'Red', 'Caso', 'Consulta', 'Mail', 'Nombre', 'Apellido', 'Comentario', 'Creado', 'Actualización', 'Estado', 'Inicio_atencion', 'No_corresponde', 'Eliminar',];

	Columns_Reporte_Excel3: string[] = [
		'id', 'Nombres', 'DNI', 'Teléfono', 'Correo', 'Teléfono_contacto', 'Red', 'Caso', 'Consulta', 'Datos_embajador', 'Comentario', 'Creado', 'Actualización', 'Estado', 'Comentario_inicio_atencion', 'Motivo', 'Submotivo', 'No_corresponde', 'No_contacto', 'No_FFTT', 'Fin_de_atencion',];

	// dataSourceIncident = new MatTableDataSource();
	dataSourceAllExcel = new MatTableDataSource();
	dataSourceIncidentDetails = new MatTableDataSource();
	dataSourceIncidentDetails2 = new MatTableDataSource();
	dataSourceIncidentDetails3 = new MatTableDataSource();
	lista_quiebres: any = [];
	datos_fin_atencion: any = [];

	fecha_creacion: any;

	tablaReporte: boolean = true;



	// @ViewChild(MatSort) sort: MatSort;
	// @ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChildren(MatSort) sort = new QueryList<MatSort>();
	@ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();

	ngAfterViewInit() {

	}

	constructor(private incidentsService: IncidentsService) { }

	user: IMainUser;
	userId: Number;
	idSetInterval: any;
	rolRUC: any = false;
	incidents: any = [];
	INCIDENT_DATA: any = [];
	INCIDENT_DETAILS_DATA: any = [];
	INCIDENT_DETAILS_DATA1: any = [];
	INCIDENT_DETAILS_DATA2: any = [];
	INCIDENT_DETAILS_DATA3: any = [];

	INCIDENT_DETAILS_DATA_ORDER: any = [];

	INCIDENT_DETAILS_DATA_SUBMOTIVO: any = [];
	INCIDENT_DETAILS_DATA_MOTIVO: any = [];



	// success
	ngOnInit(): void {
		this.user = JSON.parse(localStorage.getItem('user'));
		this.userId = this.user.id;
		this.traerQuiebres();
		this.descubrirRoles();

	}

	descubrirRoles() {
		for (let i = 0; i <= this.user.role.length - 1; i++) {
			if(this.user.role[i].id == 209 || this.user.role[i].id == 214) {
				this.rolRUC = true;
				break;
			} 
		}
	}
	// success
	ocultarTabla() {
		this.tablaReporte = true;
	}
	// success
	traerQuiebres() {
		this.blockUI.start('Cargando reportes');
		this.incidentsService.getIncidents_Details(this.user.id).subscribe(
			(res) => {
				this.responseGetQuiebresReport(res);
			},
			(err) => console.log(err)
		);
	}
	// success
	responseGetQuiebresReport(res) {

		this.INCIDENT_DETAILS_DATA = res;
		this.INCIDENT_DETAILS_DATA_SUBMOTIVO = this.INCIDENT_DETAILS_DATA.id_dhr_incident_submotivo
		// this.INCIDENT_DETAILS_DATA_MOTIVO = this.INCIDENT_DETAILS_DATA_SUBMOTIVO.id_dhr_incident_motivo

		this.INCIDENT_DETAILS_DATA_ORDER = this.INCIDENT_DETAILS_DATA.reverse();
		// Filtrando quiebres que estan en la primera etapa
		// this.INCIDENT_DETAILS_DATA1 = this.INCIDENT_DETAILS_DATA_ORDER.filter((item) => item.situacion_quiebre == "Primera")
		if (this.rolRUC) {
			console.log('Si tiene rol RUC', this.INCIDENT_DETAILS_DATA1)
			this.INCIDENT_DETAILS_DATA1 = this.INCIDENT_DETAILS_DATA_ORDER.filter((item) => item.situacion_quiebre == "Primera" && (item.id_dhr_red_incident.tipo_documento == "RUC"))
		} else {
			console.log("No es el rol RUC")
			this.INCIDENT_DETAILS_DATA1 = this.INCIDENT_DETAILS_DATA_ORDER.filter((item) => item.situacion_quiebre == "Primera" && (item.id_dhr_red_incident.tipo_documento == "DNI" || item.id_dhr_red_incident.tipo_documento == "CEX"))
		}





		// console.log('Tipo de dato createdAt', this.INCIDENT_DETAILS_DATA1.createdAt);
		this.dataSourceIncidentDetails = new MatTableDataSource(this.INCIDENT_DETAILS_DATA1);

		this.dataSourceAllExcel = new MatTableDataSource(this.INCIDENT_DETAILS_DATA1);

		// Filtrando quiebres que estan en la segunda etapa
		// this.INCIDENT_DETAILS_DATA2 = this.INCIDENT_DETAILS_DATA_ORDER.filter((item) => item.situacion_quiebre == "Segunda")

		if (this.rolRUC) {
			console.log('Si tiene rol RUC', this.INCIDENT_DETAILS_DATA1)
			this.INCIDENT_DETAILS_DATA2 = this.INCIDENT_DETAILS_DATA_ORDER.filter((item) => item.situacion_quiebre == "Segunda" && (item.id_dhr_red_incident.tipo_documento == "RUC"))
		} else {
			console.log("No es el rol RUC")
			this.INCIDENT_DETAILS_DATA2 = this.INCIDENT_DETAILS_DATA_ORDER.filter((item) => item.situacion_quiebre == "Segunda" && (item.id_dhr_red_incident.tipo_documento == "DNI" || item.id_dhr_red_incident.tipo_documento == "CEX"))
		}






		this.dataSourceIncidentDetails2 = new MatTableDataSource(this.INCIDENT_DETAILS_DATA2);
		// Filtrando quiebres que estan en la tercera etapa
		// this.INCIDENT_DETAILS_DATA3 = this.INCIDENT_DETAILS_DATA_ORDER.filter((item) => item.situacion_quiebre == "Tercera")

		if (this.rolRUC) {
			console.log('Si tiene rol RUC', this.INCIDENT_DETAILS_DATA1)
			this.INCIDENT_DETAILS_DATA3 = this.INCIDENT_DETAILS_DATA_ORDER.filter((item) => item.situacion_quiebre == "Tercera" && (item.id_dhr_red_incident.tipo_documento == "RUC"))
		} else {
			console.log("No es el rol RUC")
			this.INCIDENT_DETAILS_DATA3 = this.INCIDENT_DETAILS_DATA_ORDER.filter((item) => item.situacion_quiebre == "Tercera" && (item.id_dhr_red_incident.tipo_documento == "DNI" || item.id_dhr_red_incident.tipo_documento == "CEX"))
		}



		this.dataSourceIncidentDetails3 = new MatTableDataSource(this.INCIDENT_DETAILS_DATA3);

		this.dataSourceIncidentDetails.paginator = this.paginator.toArray()[0];
		this.dataSourceIncidentDetails2.paginator = this.paginator.toArray()[1];
		this.dataSourceIncidentDetails3.paginator = this.paginator.toArray()[2];

		this.dataSourceIncidentDetails.sort = this.sort.toArray()[0];
		this.dataSourceIncidentDetails2.sort = this.sort.toArray()[1];
		this.dataSourceIncidentDetails3.sort = this.sort.toArray()[2];

		this.blockUI.stop();
	}
	// success
	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSourceIncidentDetails.filter = filterValue.trim().toLowerCase();
	}
	// success
	applyFilter2(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSourceIncidentDetails2.filter = filterValue.trim().toLowerCase();
	}
	// success
	applyFilter3(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSourceIncidentDetails3.filter = filterValue.trim().toLowerCase();
	}
    // success
	ngOnDestroy() {
		if (this.idSetInterval) {
			clearInterval(this.idSetInterval);
		}
	}

	alertSwalBorrarIncident(swalWithBootstrapButtons, mainTitle: string, message: string, icon: any) {
		this.blockUI.stop();
		swalWithBootstrapButtons.fire(
			mainTitle,
			message,
			icon
		);
	}

	borrarIncident_Details(id: number) {

		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success m-1',
				cancelButton: 'btn btn-danger m-1'
			},
			buttonsStyling: false
		});

		swalWithBootstrapButtons
			.fire({
				title: 'Estas seguro que desea eliminar el quiebre?',
				text: 'Se eliminará el quiebre para siempre',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Si, eliminar!',
				cancelButtonText: 'No, cancelar!',
				reverseButtons: true
			})
			.then((result) => {
				this.responseThenSwalAlert(result.isConfirmed,swalWithBootstrapButtons,id,result.dismiss);
			});
	}
	responseThenSwalAlert(isConfirmed:any,swalWithBootstrapButtons,id,dismiss:any){
		if (isConfirmed) {
			this.incidentsService.deleteIncident_Details(id).subscribe(
				res => {
					this.responseReportIncidentDelete(swalWithBootstrapButtons);
				},
				(err: HttpErrorResponse) => {
					this.alertSwalBorrarIncident(swalWithBootstrapButtons, "Cancelado!", err.statusText, "error");
				}
			)
		} else {
			this.elseIfDeleteIncident(dismiss, Swal.DismissReason.cancel, swalWithBootstrapButtons);
		}
	}
	responseReportIncidentDelete(swalWithBootstrapButtons) {
		this.alertSwalBorrarIncident(swalWithBootstrapButtons, 'Correcto!', "Se eliminó el quiebre", "success");
		this.traerQuiebres();
	}
	elseIfDeleteIncident(dismiss: any, buttonCancel: any, swalWithBootstrapButtons) {
		if (dismiss === Swal.DismissReason.cancel) {
			this.alertSwalBorrarIncident(swalWithBootstrapButtons, 'Cancelado!', "No se eliminó el quiebre", "error");
		}
	}
	exportToExcel(json: any[], excelFileName: string): void {
		const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
		const workbook: XLSX.WorkBook = {
			Sheets: { 'data': worksheet },
			SheetNames: ['data']
		};
		const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
		// Llamar al método, pasar el buffer y el nombre
		this.saveAsExcel(excelBuffer, excelFileName);
	}

	private saveAsExcel(buffer: any, fileName: string): void {
		const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
		FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXT);
		// FileSaver.saveAs(data, fileName  + '_export_' + new datePipe().getTime() + EXCEL_EXT);
	}

	exportAsXLSX(): void {
		this.exportToExcel(this.dataSourceAllExcel.data, 'my_export');
	}

}


