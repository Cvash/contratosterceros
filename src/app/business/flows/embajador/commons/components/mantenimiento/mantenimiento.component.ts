import { Component, OnInit,ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { IncidentsService } from '../yo-te-ayudo/services/incidents.service';
import { MatStepper } from '@angular/material/stepper';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EmbDialogVerComentarioComponent } from './emb-dialog-ver-comentario/emb-dialog-ver-comentario.component';
import { IMainUser } from 'src/app/business/models/IModel-module';
import { EmbDialogInicioAtencionComponent } from './emb-dialog-inicio-atencion/emb-dialog-inicio-atencion.component';
import { EmbDialogVerDatosEmbajadorComponent } from './emb-dialog-ver-datos-embajador/emb-dialog-ver-datos-embajador.component';
import Swal from 'sweetalert2';
import { EmbDialogNoCorrespondeComponent } from './emb-dialog-no-corresponde/emb-dialog-no-corresponde.component';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { EmbDialogNoContactoComponent } from './emb-dialog-no-contacto/emb-dialog-no-contacto.component';
import { EmbDialogNoFFTTComponent } from './emb-dialog-no-fftt/emb-dialog-no-fftt.component';
import { EmbDialogFinAtencionComponent } from './emb-dialog-fin-atencion/emb-dialog-fin-atencion.component';
import { EmbDialogDatosFinAtencionComponent } from './emb-dialog-datos-fin-atencion/emb-dialog-datos-fin-atencion.component';
import { EmbDialogVerRutasQuiebresComponent } from './emb-dialog-ver-rutas-quiebres/emb-dialog-ver-rutas-quiebres.component';
import { EmbDialogMotivoSubmotivoComponent } from './emb-dialog-motivo-submotivo/emb-dialog-motivo-submotivo.component';
import { FormGroup, FormControl } from '@angular/forms';
import { EmbDialogReporteExcelComponent } from './emb-dialog-reporte-excel/emb-dialog-reporte-excel.component';
import { HttpErrorResponse } from '@angular/common/http';
import { EmbDialogComentarioDinamicoComponent } from './emb-dialog-comentario-dinamico/emb-dialog-comentario-dinamico.component';
@Component({
	selector: 'app-mantenimiento',
	templateUrl: './mantenimiento.component.html',
	styleUrls: ['./mantenimiento.component.scss']
})
export class MantenimientoComponent implements OnInit {

	@BlockUI() blockUI: NgBlockUI;
	Columns_Incident_Details: string[] = [
		'id', 'Nombres', 'DNI', 'Teléfono', 'Correo', 'Teléfono_contacto', 'Red Quiebre', 'Datos_embajador', 'Comentario', 'Creado', 'Actualización', 'Estado', 'Acciones'];

	Columns_Incident_Details2: string[] = [
		'id', 'Nombres', 'DNI', 'Teléfono', 'Correo', 'Teléfono_contacto', 'Red Quiebre', 'Datos_embajador', 'Comentario', 'Creado', 'Actualización', 'Comentario_dinamico', 'Acciones'];

	Columns_Incident_Details3: string[] = [
		'id', 'Nombres', 'DNI', 'Teléfono', 'Correo', 'Teléfono_contacto', 'Red Quiebre', 'Datos_embajador', 'Comentario', 'Creado', 'Actualización', 'Estado', 'Comentario_inicio_atencion', 'Motivo', 'Submotivo', 'No_corresponde', 'No_contacto', 'No_FFTT', 'Fin_de_atencion'];

		INCIDENT_DATA: any = [];
		INCIDENT_DETAILS_DATA: any = [];
		INCIDENT_DETAILS_DATA1: any = [];
		INCIDENT_DETAILS_DATA2: any = [];
		INCIDENT_DETAILS_DATA3: any = [];
		INCIDENT_DETAILS_DATA4: any = [];
	
		INCIDENT_DETAILS_FECHAS: any = [];
		INCIDENT_DETAILS_FECHAS2: any = [];
		INCIDENT_DETAILS_FECHAS3: any = [];
	
		INCIDENT_DETAILS_DATA_ORDER: any = [];
	
		INCIDENT_DETAILS_DATA_SUBMOTIVO: any = [];
		INCIDENT_DETAILS_DATA_MOTIVO: any = [];
	
	// dataSourceIncident = new MatTableDataSource();
	dataSourceAllExcel = new MatTableDataSource(this.INCIDENT_DETAILS_DATA1);
	dataSourceIncidentDetails = new MatTableDataSource(this.INCIDENT_DETAILS_DATA1);
	dataSourceIncidentDetails2 = new MatTableDataSource(this.INCIDENT_DETAILS_DATA2);
	dataSourceIncidentDetails3 = new MatTableDataSource(this.INCIDENT_DETAILS_DATA3);
	dataSourceIncidentDetails4 = new MatTableDataSource(this.INCIDENT_DETAILS_DATA4);
	lista_quiebres: any = [];
	datos_fin_atencion: any = [];
	fecha_creacion: any;
	txt_start_date: any = "";
	txt_end_date: any = "";
	fechasFormQuiebres: any;
	fechasFormEnProceso: any;
	fechasFormRegistro: any;
	userNombres: any;
	userApellidos: any;


	// @ViewChild(MatSort) sort: MatSort;
	// @ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChildren(MatSort) sort = new QueryList<MatSort>();
	@ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();

	ngAfterViewInit() {

	}

	constructor(private incidentsService: IncidentsService, public dialog: MatDialog, private ref: ChangeDetectorRef) {

		this.txt_start_date = "";
		this.txt_end_date = "";
		this.createFormQuiebre();
		this.createFormEnProceso();
		this.createFormRegistro();

	}
    // success
	createFormQuiebre() {
		this.fechasFormQuiebres = new FormGroup({
			date1: new FormControl((new Date()).toISOString()),
			date2: new FormControl((new Date()).toISOString())
		});
	}
    // success
	createFormEnProceso() {
		this.fechasFormEnProceso = new FormGroup({
			date3: new FormControl((new Date()).toISOString()),
			date4: new FormControl((new Date()).toISOString())
		});
	}
    // success
	createFormRegistro() {
		this.fechasFormRegistro = new FormGroup({
			date5: new FormControl((new Date()).toISOString()),
			date6: new FormControl((new Date()).toISOString())
		});
	}

	user: IMainUser;
	userId: Number;
	idSetInterval: any;
	incidents: any = [];
	parts: any;
	fechaConvertida: any;
	fechaInicio: any;
	fechaFin: any;
	fechaInicioConvertida: any;
	fechaFinConvertida: any;
	rolRUC: any = false;

	fechaQuiebre: any = [];
	fechaQuiebreConvertida: any = [];



	ngOnInit(): void {
		this.parts = '2021-04-03'.split('-');
		this.fechaConvertida = new Date(this.parts[0], this.parts[1] - 1, this.parts[2]);
		this.user = JSON.parse(localStorage.getItem('user'));
		this.userId = this.user.id;
		console.log("Roles", this.user.role);
		this.traerQuiebres();
		this.descubrirRoles();
		this.animarBoton();
		console.log("Rol Ruc", this.rolRUC);
	}

	applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceIncidentDetails.filter = filterValue.trim().toLowerCase();
  }

	animarBoton() {
		var animateButton = function(e) {

			e.preventDefault;
			//reset animation
			e.target.classList.remove('animate');
			
			e.target.classList.add('animate');
			setTimeout(function(){
				e.target.classList.remove('animate');
			},300);
		};
		
		var bubblyButtons = document.getElementsByClassName("bubbly-button");
		
		for (var i = 0; i < bubblyButtons.length; i++) {
			bubblyButtons[i].addEventListener('click', animateButton, false);
		}
	}


	descubrirRoles() {
		for (let i = 0; i <= this.user.role.length - 1; i++) {
			if(this.user.role[i].id == 209 || this.user.role[i].id == 214) {
				this.rolRUC = true;
				break;
			} 
		}
	}
	


	traerQuiebres() {
		this.blockUI.start('Cargando datos de quiebres...');
		this.incidentsService.getIncidents_Details(this.user.id).subscribe(
			(res) => {
				console.log("TRAER QUIEBRES");
				console.log(res)
				this.responseTraerQuiebres(res);
			},
			(err) => console.log(err)
		);
	}
    responseTraerQuiebres(res){ 
		this.INCIDENT_DETAILS_DATA = res;

				this.INCIDENT_DETAILS_DATA_ORDER = this.INCIDENT_DETAILS_DATA.reverse();

				// Filtrando quiebres que estan en la primera etapa
				

				if (this.rolRUC) {
					console.log('Si tiene rol RUC', this.INCIDENT_DETAILS_DATA1)
					this.INCIDENT_DETAILS_DATA1 = this.INCIDENT_DETAILS_DATA_ORDER.filter((item) => item.situacion_quiebre == "Primera" && (item.id_dhr_red_incident.tipo_documento == "RUC"))
				} else {
					console.log("No es el rol RUC")
					this.INCIDENT_DETAILS_DATA1 = this.INCIDENT_DETAILS_DATA_ORDER.filter((item) => item.situacion_quiebre == "Primera" && (item.id_dhr_red_incident.tipo_documento == "DNI" || item.id_dhr_red_incident.tipo_documento == "CEX"))
				}

				

				for (let i = 0; i < this.INCIDENT_DETAILS_DATA1.length; i++) {
					// console.log('Pintando el arreglo de Incidentes', ((JSON.stringify( this.INCIDENT_DETAILS_DATA1[i].createdAt)).slice(1,11)).split('-') );	
					this.fechaQuiebre = ((JSON.stringify(this.INCIDENT_DETAILS_DATA1[i].createdAt)).slice(1, 11)).split('-')
					// console.log("FechaQuiebre", this.fechaQuiebre);
					this.fechaQuiebreConvertida = new Date(this.fechaQuiebre[0], this.fechaQuiebre[1] - 1, this.fechaQuiebre[2])
					// console.log("Fecha Quiebre Convertida", this.fechaQuiebreConvertida);
					this.INCIDENT_DETAILS_DATA1[i].createdAt = this.fechaQuiebreConvertida;
					// console.log("Nuevo createdAt", typeof this.INCIDENT_DETAILS_DATA1[i].createdAt);
				}


				this.dataSourceIncidentDetails = new MatTableDataSource(this.INCIDENT_DETAILS_DATA1);

				this.dataSourceAllExcel = new MatTableDataSource(this.INCIDENT_DETAILS_DATA1);


				// Filtrando quiebres que estan en la segunda etapa
				// this.INCIDENT_DETAILS_DATA2 = this.INCIDENT_DETAILS_DATA_ORDER.filter((item) => item.situacion_quiebre == "Segunda" && (item.id_dhr_red_incident.tipo_documento == "DNI" || item.id_dhr_red_incident.tipo_documento == "CEX"))
				
				if (this.rolRUC) {
					console.log('Si tiene rol RUC', this.INCIDENT_DETAILS_DATA1)
					this.INCIDENT_DETAILS_DATA2 = this.INCIDENT_DETAILS_DATA_ORDER.filter((item) => item.situacion_quiebre == "Segunda" && (item.id_dhr_red_incident.tipo_documento == "RUC"))
				} else {
					console.log("No es el rol RUC")
					this.INCIDENT_DETAILS_DATA2 = this.INCIDENT_DETAILS_DATA_ORDER.filter((item) => item.situacion_quiebre == "Segunda" && (item.id_dhr_red_incident.tipo_documento == "DNI" || item.id_dhr_red_incident.tipo_documento == "CEX"))
				}
				

				this.dataSourceIncidentDetails2 = new MatTableDataSource(this.INCIDENT_DETAILS_DATA2);
				// console.log('Incident_details2', this.INCIDENT_DETAILS_DATA2);

				for (let i = 0; i < this.INCIDENT_DETAILS_DATA2.length; i++) {
					// console.log('Pintando el arreglo de Incidentes', ((JSON.stringify( this.INCIDENT_DETAILS_DATA2[i].createdAt)).slice(1,11)).split('-') );	
					this.fechaQuiebre = ((JSON.stringify(this.INCIDENT_DETAILS_DATA2[i].id_dhr_red_incident.createdAt)).slice(1, 11)).split('-')
					// console.log("FechaQuiebre", this.fechaQuiebre);
					this.fechaQuiebreConvertida = new Date(this.fechaQuiebre[0], this.fechaQuiebre[1] - 1, this.fechaQuiebre[2])
					// console.log("Fecha Quiebre Convertida", this.fechaQuiebreConvertida);
					this.INCIDENT_DETAILS_DATA2[i].id_dhr_red_incident.createdAt = this.fechaQuiebreConvertida;
					// console.log("Nuevo createdAt", typeof this.INCIDENT_DETAILS_DATA2[i].createdAt);
				}


				// Filtrando quiebres que estan en la tercera etapa
				// this.INCIDENT_DETAILS_DATA3 = this.INCIDENT_DETAILS_DATA_ORDER.filter((item) => item.situacion_quiebre == "Tercera" && (item.id_dhr_red_incident.tipo_documento == "DNI" || item.id_dhr_red_incident.tipo_documento == "CEX"))

				if (this.rolRUC) {
					console.log('Si tiene rol RUC', this.INCIDENT_DETAILS_DATA1)
					this.INCIDENT_DETAILS_DATA3 = this.INCIDENT_DETAILS_DATA_ORDER.filter((item) => item.situacion_quiebre == "Tercera" && (item.id_dhr_red_incident.tipo_documento == "RUC"))
				} else {
					console.log("No es el rol RUC")
					this.INCIDENT_DETAILS_DATA3 = this.INCIDENT_DETAILS_DATA_ORDER.filter((item) => item.situacion_quiebre == "Tercera" && (item.id_dhr_red_incident.tipo_documento == "DNI" || item.id_dhr_red_incident.tipo_documento == "CEX"))
				}

				this.dataSourceIncidentDetails3 = new MatTableDataSource(this.INCIDENT_DETAILS_DATA3);
				// console.log('Incident_details3', this.INCIDENT_DETAILS_DATA3);
				// console.log('Listo!, todos los datos cargados');

				for (let i = 0; i < this.INCIDENT_DETAILS_DATA3.length; i++) {
					// console.log('Pintando el arreglo de Incidentes', ((JSON.stringify( this.INCIDENT_DETAILS_DATA3[i].createdAt)).slice(1,11)).split('-') );	
					this.fechaQuiebre = ((JSON.stringify(this.INCIDENT_DETAILS_DATA3[i].id_dhr_red_incident.createdAt)).slice(1, 11)).split('-')
					// console.log("FechaQuiebre", this.fechaQuiebre);
					this.fechaQuiebreConvertida = new Date(this.fechaQuiebre[0], this.fechaQuiebre[1] - 1, this.fechaQuiebre[2])
					// console.log("Fecha Quiebre Convertida", this.fechaQuiebreConvertida);
					this.INCIDENT_DETAILS_DATA3[i].id_dhr_red_incident.createdAt = this.fechaQuiebreConvertida;
					// console.log("Nuevo createdAt", typeof this.INCIDENT_DETAILS_DATA3[i].createdAt);
				}

				// Filtrando quiebres RUC
				this.INCIDENT_DETAILS_DATA4 = this.INCIDENT_DETAILS_DATA_ORDER.filter((item) => item.id_dhr_red_incident.tipo_documento == "RUC")

				this.dataSourceIncidentDetails4 = new MatTableDataSource(this.INCIDENT_DETAILS_DATA4);
				this.dataSourceIncidentDetails.paginator = this.paginator.toArray()[0];
				this.dataSourceIncidentDetails2.paginator = this.paginator.toArray()[1];
				this.dataSourceIncidentDetails3.paginator = this.paginator.toArray()[2];

				this.dataSourceIncidentDetails.sort = this.sort.toArray()[0];
				this.dataSourceIncidentDetails2.sort = this.sort.toArray()[1];
				this.dataSourceIncidentDetails3.sort = this.sort.toArray()[2];
				this.ref.detectChanges();
				this.blockUI.stop();
                
	}
    // success
	showDataQuiebres(values) {
		console.log("SHOW DATA QUIEBRES")
		console.log(values)
		this.fechaInicio = ((JSON.stringify(values.date1)).slice(1, 11)).split('-');
		this.fechaInicioConvertida = new Date(this.fechaInicio[0], this.fechaInicio[1] - 1, this.fechaInicio[2]);
		this.fechaFin = ((JSON.stringify(values.date2)).slice(1, 11)).split('-');
		this.fechaFinConvertida = new Date(this.fechaFin[0], this.fechaFin[1] - 1, this.fechaFin[2]);
		this.INCIDENT_DETAILS_FECHAS = this.INCIDENT_DETAILS_DATA1.filter((item) => item.createdAt >= this.fechaInicioConvertida && item.createdAt <= this.fechaFinConvertida);
		this.dataSourceIncidentDetails = new MatTableDataSource(this.INCIDENT_DETAILS_FECHAS);
	}
    // success
	showDataEnProceso(values) {
		console.log("SGOW DATA EN PROCESO")
		console.log(values)
		this.fechaInicio = ((JSON.stringify(values.date3)).slice(1, 11)).split('-');
		this.fechaInicioConvertida = new Date(this.fechaInicio[0], this.fechaInicio[1] - 1, this.fechaInicio[2]);
		this.fechaFin = ((JSON.stringify(values.date4)).slice(1, 11)).split('-');
		this.fechaFinConvertida = new Date(this.fechaFin[0], this.fechaFin[1] - 1, this.fechaFin[2]);
		// console.log('fechaInicioConvertida', typeof this.fechaInicioConvertida); 
		// console.log('fechaFinConvertida', typeof this.fechaFinConvertida ); 
		// this.INCIDENT_DETAILS_DATA1 = this.INCIDENT_DETAILS_DATA1.filter((item) => item.createdAt >= this.fechaInicioConvertida.toDateString() && item.createdAt <= this.fechaFinConvertida.toDateString() && item.situacion_quiebre == "Primera");
		this.INCIDENT_DETAILS_FECHAS2 = this.INCIDENT_DETAILS_DATA2.filter((item) => item.id_dhr_red_incident.createdAt >= this.fechaInicioConvertida && item.id_dhr_red_incident.createdAt <= this.fechaFinConvertida);
		// console.log('INCIDENT_DETAILS_FECHAS', this.INCIDENT_DETAILS_DATA2);
		// console.log('INCIDENT_DETAILS_DATA2', this.INCIDENT_DETAILS_DATA2);
		this.dataSourceIncidentDetails2 = new MatTableDataSource(this.INCIDENT_DETAILS_FECHAS2);
	}
    // success
	showDataRegistro(values) {
		console.log("SOGW DATA REGISTRO");
		console.log(values)
		this.fechaInicio = ((JSON.stringify(values.date5)).slice(1, 11)).split('-');
		this.fechaInicioConvertida = new Date(this.fechaInicio[0], this.fechaInicio[1] - 1, this.fechaInicio[2]);
		this.fechaFin = ((JSON.stringify(values.date6)).slice(1, 11)).split('-');
		this.fechaFinConvertida = new Date(this.fechaFin[0], this.fechaFin[1] - 1, this.fechaFin[2]);
		// console.log('fechaInicioConvertida', typeof this.fechaInicioConvertida); 
		// console.log('fechaFinConvertida', typeof this.fechaFinConvertida ); 
		// this.INCIDENT_DETAILS_DATA1 = this.INCIDENT_DETAILS_DATA1.filter((item) => item.createdAt >= this.fechaInicioConvertida.toDateString() && item.createdAt <= this.fechaFinConvertida.toDateString() && item.situacion_quiebre == "Primera");
		this.INCIDENT_DETAILS_FECHAS3 = this.INCIDENT_DETAILS_DATA3.filter((item) => item.id_dhr_red_incident.createdAt >= this.fechaInicioConvertida && item.id_dhr_red_incident.createdAt <= this.fechaFinConvertida);
		// console.log('INCIDENT_DETAILS_FECHAS', this.INCIDENT_DETAILS_DATA2);
		// console.log('INCIDENT_DETAILS_DATA2', this.INCIDENT_DETAILS_DATA2);
		this.dataSourceIncidentDetails3 = new MatTableDataSource(this.INCIDENT_DETAILS_FECHAS3);
	}
	// success
	ngOnDestroy() {
		if (this.idSetInterval) {
			clearInterval(this.idSetInterval);
		}
	}
	// success
	showVerDatosEmbajador(element: any, user: any) {
		this.user = JSON.parse(localStorage.getItem('user'));
	    this.dialog.open(EmbDialogVerDatosEmbajadorComponent, {
			maxWidth: '95vw',
			width: '40%',
			data: {
				element: element,
				user: this.user,
			}
		});
	}
    // success
	showVerComentario(element: any, userId: any) {
		this.dialog.open(EmbDialogVerComentarioComponent, {
			maxWidth: '95vw',
			width: '40%',
			height: '250px',
			data: {
				element: element,
				userId: userId
			}
		});
		
	}
    // success
	showVerRutasQuiebres(element: any, userId: any) {
		console.log("SGOW VER RUTAS QUIEBRES")
		console.log(element)
		// console.log("Element_mantenimiento", element)
		this.lista_quiebres = element;
		// console.log("ListaQuiebre_mantenimiento", this.lista_quiebres)
		this.dialog.open(EmbDialogVerRutasQuiebresComponent, {
			width:"500px",
			height:"300px",
			maxHeight:"90vh",
			maxWidth:"90vw",
			data: {
				lista_quiebres: this.lista_quiebres,
				userId: userId
			}
		});

	}

	showMotivoSubmotivo(element: any, userId: any) {
		console.log("SHOW MOTIVOSUB")
		console.log(element)
		// console.log("Element_mantenimiento", element)
		this.lista_quiebres = element;
		// console.log("ListaQuiebre_mantenimiento", this.lista_quiebres)
		const dialogRef = this.dialog.open(EmbDialogMotivoSubmotivoComponent, {
			width:"500px",
			height:"600px",
			maxHeight:"90vh",
			maxWidth:"90vw",
			data: {
				lista_quiebres: this.lista_quiebres,
				userId: userId
			}
		});
		dialogRef.afterClosed().subscribe((result) => {
			// console.log(`Dialog result: ${result}`);
			try {
				if (result["result"] === true) {
					// console.log("Traer nuevos quiebres en 5 segundos")
					this.traerQuiebres();
					// setTimeout(this.traerQuiebres, 5000);
				} else {
					console.log('Se canceló')
				}
			} catch (error) {
				console.log(error)
			}
		})
	}
    // success
	showInicioAtencion(element: any, userId: any, stepper: MatStepper, section: any, type: any) {
		console.log("SHOW INICIO ATEN")
		console.log(element)
		// console.log("Element_mantenimiento - showInicioAtencion", element)
		this.lista_quiebres = element;
		// console.log("ListaQuiebre_mantenimiento - showInicioAtencion", this.lista_quiebres)
		const dialogRef = this.dialog.open(EmbDialogInicioAtencionComponent, {
			width:"500px",
			height:"500px",
			maxHeight:"90vh",
			maxWidth:"90vw",
			data: {
				lista_quiebres: this.lista_quiebres,
				section: section,
				type: type,
				userId: userId
			}
		});
		dialogRef.afterClosed().subscribe((result) => {
			// console.log(`Dialog result: ${result}`);
			try {
				if (result["result"] === true) {
					// console.log("Traer nuevos quiebres")
					const funcionPrueba: any = () => {
						this.traerQuiebres();
						stepper.next()
					}
					funcionPrueba();
				} else {
					console.log('Se canceló')
				}
			} catch (error) {
				console.log(error)
			}
		})
	}
    // success
	showNoCorresponde(element: any, userId: any, stepper: MatStepper) {
		console.log("SHOW NO CORRECP")
		console.log(element)
		// console.log("Element_mantenimiento - showNoCorresponde", element)
		this.lista_quiebres = element;
		// console.log("ListaQuiebre_mantenimiento - showNoCorresponde", this.lista_quiebres)
		const dialogRef = this.dialog.open(EmbDialogNoCorrespondeComponent, {
			width:"500px",
			height:"600px",
			maxHeight:"90vh",
			maxWidth:"90vw",
			data: {
				lista_quiebres: this.lista_quiebres,
				userId: userId
			}
		});
		dialogRef.afterClosed().subscribe((result) => {
			// console.log(`Dialog result: ${result}`);
			try {
				if (result["result"] === true) {
					stepper.next();
					stepper.next();
					this.traerQuiebres();
				} else {
					console.log('Se canceló')
				}
			} catch (error) {
				console.log(error)
			}
		})
	}
// success
	showNoContacto(element: any, userId: any, stepper: MatStepper) {
		console.log("SHOW NO CONTACTO")
		console.log(element)
		// console.log("Element_mantenimiento - showNoContacto", element)
		this.lista_quiebres = element;
		// console.log("ListaQuiebre_mantenimiento - showNoContacto", this.lista_quiebres)
		const dialogRef = this.dialog.open(EmbDialogNoContactoComponent, {
			width:"500px",
			height:"600px",
			maxHeight:"90vh",
			maxWidth:"90vw",
			data: {
				lista_quiebres: this.lista_quiebres,
				userId: userId
			}
		});
		dialogRef.afterClosed().subscribe((result) => {
			// console.log(`Dialog result: ${result}`);
			try {
				if (result["result"] === true) {
					stepper.next();
					this.traerQuiebres();
				} else {
					console.log('Se canceló')
				}
			} catch (error) {
				console.log(error)
			}
		})
	}
// success
	showNoFFTT(element: any, userId: any, stepper: MatStepper) {
		console.log("SHOW NO FFTT")
		console.log(element)
		// console.log("Element_mantenimiento - showNoFFTT", element)
		this.lista_quiebres = element;
		// console.log("ListaQuiebre_mantenimiento - showNoFFTT", this.lista_quiebres)
		const dialogRef = this.dialog.open(EmbDialogNoFFTTComponent, {
			width:"500px",
			height:"600px",
			maxHeight:"90vh",
			maxWidth:"90vw",
			data: {
				lista_quiebres: this.lista_quiebres,
				userId: userId
			}
		});
		dialogRef.afterClosed().subscribe((result) => {
			// console.log(`Dialog result: ${result}`);
			try {
				if (result["result"] === true) {
					stepper.next();
					this.traerQuiebres();
				} else {
					// console.log('Se canceló')
				}
			} catch (error) {
				console.log(error)
			}
		})
	}
// success
	showFinAtencion(element: any, user: any, stepper: MatStepper) {
		console.log("SHOW FIN ATENCION")
		console.log(element)
		this.lista_quiebres = element;
		const dialogRef = this.dialog.open(EmbDialogFinAtencionComponent, {
			width:"500px",
			height:"600px",
			maxHeight:"90vh",
			maxWidth:"90vw",
			data: {
				lista_quiebres: this.lista_quiebres,
				user: this.user
			}
		});
		dialogRef.afterClosed().subscribe((result) => {
			try {
		    // console.log(`Dialog result: ${result}`);
			if (result["result"] === true) {
				stepper.next();
				this.traerQuiebres();
			} else {
				// console.log('Se canceló')
			}
			} catch (error) {
				console.log(error)
			}
		})
	}

	showComentarioDinamico(element: any, userId: any, stepper: MatStepper) {
		console.log("Comentario Dinamico")
		console.log(element)
		this.lista_quiebres = element;
		const dialogRef = this.dialog.open(EmbDialogComentarioDinamicoComponent, {
			width:"500px",
			height:"600px",
			maxHeight:"90vh",
			maxWidth:"90vw",
			data: {
				lista_quiebres: this.lista_quiebres,
				user: this.user
			}
		});
		dialogRef.afterClosed().subscribe((result) => {
			try {
		    // console.log(`Dialog result: ${result}`);
			if (result["result"] === true) {
				this.traerQuiebres();
			} else {
				// console.log('Se canceló')
			}
			} catch (error) {
				console.log(error)
			}
		})
	}

// success
	showDatosFinAtencion(element: any, userId: any) {
		console.log("SHOW DATOS FIN ATENCION")
		console.log(element)
		// console.log("Element_mantenimiento - showDatosFinAtencion", element)
		this.datos_fin_atencion = element;
		// console.log("ListaQuiebre_mantenimiento - showDatosFinAtencion", this.datos_fin_atencion)
		this.dialog.open(EmbDialogDatosFinAtencionComponent, {
			maxWidth: '95vw',
			width: '60%',
			data: {
				datos_fin_atencion: this.datos_fin_atencion,
				user:this.user
			}
		});

	}
	// success
	showReporteExcel() {
		// console.log('Abriendo reporte')
		this.dialog.open(EmbDialogReporteExcelComponent, {
			maxWidth: '95vw',
			width: '40%',
			data: {
			}
		});
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
				if (result.isConfirmed) {
					this.incidentsService.deleteIncident_Details(id).subscribe(
						res => {
		                   this.responseDeleteIncident(swalWithBootstrapButtons);					
						},
						(err:HttpErrorResponse) => {
                             this.swalAlertMantenimiento(swalWithBootstrapButtons,"Cancelado!",err.statusText,"error");
						}
					)	
				} else {
					this.elseBorrarIncidente(result.dismiss,Swal.DismissReason.cancel,swalWithBootstrapButtons);
				}
			});


	}
	// success
	responseDeleteIncident(swalWithBootstrapButtons){
		this.swalAlertMantenimiento(swalWithBootstrapButtons,"Correcto!","Se eliminó el quiebre","success");
		this.traerQuiebres();
	}
	// success
    swalAlertMantenimiento(swalWithBootstrapButtons,mainTitle:string,message:string,icon:any){ 
		this.blockUI.stop();
		swalWithBootstrapButtons.fire(
			mainTitle,
			message,
			icon
		);
	}
	// success
	elseBorrarIncidente(dismiss:any,buttonCancel:any,swalWithBootstrapButtons){
		if (
			dismiss===buttonCancel
		) {
			this.swalAlertMantenimiento(swalWithBootstrapButtons,"Cancelado!","No se eliminó el quiebre","error");
		}
	}
}
