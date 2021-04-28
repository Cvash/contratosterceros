import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IncidentsService } from './services/incidents.service';
import { RedService } from './services/red.service';
import { MatTableDataSource } from '@angular/material/table';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import Swal from 'sweetalert2';
import {
	FormBuilder,
	FormGroup,
	Validators
} from '@angular/forms';
import { IMainUser } from '../../../../../../business/models/IModel-module';
import { EmbDialogVerEstadoComponent } from './emb-dialog-ver-estado/emb-dialog-ver-estado.component';

@Component({
	selector: 'app-yo-te-ayudo',
	templateUrl: './yo-te-ayudo.component.html',
	styleUrls: ['./yo-te-ayudo.component.scss']
})
export class YoTeAyudoComponent implements OnInit {

	INCIDENT_DATA: any = [];
	@BlockUI() blockUI: NgBlockUI;
	Columns_Incident_Details: string[] = [
	 'Titular', 'Celular', 'Documento', 'Estado', 'Tipo de quiebre', 'Tipo de producto'];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	dataSourceIncidentDetails = new MatTableDataSource(this.INCIDENT_DATA);
	yoteayudoForm: FormGroup;
	incidents: any = [];
	incidents_details: any = [];
	emailUsuario: any;
	mostrarFormulario = false;
	tipodocumento: any = 'sindocumento';
	user: IMainUser;
	userrole: any = [];
	userId: any;
	rolAdministrador: boolean = false;
	incident_details: any = {
		comment: '',
		cause: '',
		situacion_quiebre: '',
		se_hizo_ajuste: '',
		se_atendio_remedy: '',
		se_realizo_doit: '',
		comentario_no_contacto: '',
		comentario_no_fftt: '',
		comentario_no_corresponde: '',
		comentario_inicio_atencion: '',
		importe_ajuste: '',
		observacion_ajuste: '',
		comentario_final: '',
		codigo_remedy: '',
		codigo_doit: '',
		status: '',
		id_dhr_red_incident: 0,
		id_dhr_red_status: 0,
		id_dhr_incident_submotivo: 0,
	};
	incidentReset: any = {
		ruc: '',
		razon_social: '',
		name_titular_cex: '',
		cex_titular: '',
		tipo_documento: 'sindocumento',
		name_titular: '',
		dni_titular: '',
		cell_titular: '',
		mail_titular: '',
		phone_incident: '',
		mail_emb: '',
		cell_emb: '',
		description: '',
		id_dhr_user: '',
		id_red_subcategory: ''
	};
	incidente_creado: any = [];
	tipo_documento: any;
	public id_subcategory: any;
	public incident_form: any = [];
	public red_category2: any = [];
	public red_subcategory2: any = [];
	public selectedRed_Type = { id: 0, name: 'Seleccione el tipo' };
	public red_type: any = [];
	public red_category: any = [];
	public red_subcategory: any = [];

	constructor(
		private incidentsService: IncidentsService,
		private redService: RedService,
		private _builder: FormBuilder,
		public dialog: MatDialog,
		private ref:ChangeDetectorRef
	) {
		this.yoteayudoForm = this._builder.group({
			ruc: ['',],
			razon_social: [''],
			cex_titular: ['',],
			name_titular_cex: ['',],
			name_titular: [''],
			dni_titular: [''],
			tipo_documento: [''],
			cell_titular: ['', Validators.required],
			mail_titular: ['', Validators.required],
			phone_incident: ['', Validators.required],
			mail_emb: ['', Validators.required],
			cell_emb: ['', Validators.required],
			description: ['', Validators.required],
			id_dhr_user: [''],
			id_red_subcategory: ['']
		});
	}



	ngOnInit(): void {
		
		this.user = JSON.parse(localStorage.getItem('user'));
		this.emailUsuario = this.user.relatedParty.email;
		this.ref.detectChanges();
		this.traerQuiebres();
		this.initDataSelect();
		// this.userId = this.user.id;
		// this.userrole = this.user.role;
	}


	initDataSelect(){ 
		this.incidentsService.getIncidents().subscribe(
			(res) => {
				this.responseGetIncident(res);
			},
			(err) => console.log(err)
		);

		this.redService.getRedTypes().subscribe(
			(res) => {
				this.responseGetTypes(res);
			},
			(err) => console.log(err)
		);

		this.redService.getRedCategory().subscribe(
			(res) => {
				this.responseGetCategory(res)
			},
			(err) => console.log(err)
		);

		this.redService.getRedSubCategory().subscribe(
			(res) => {
				this.responseGetSubCategory(res);
			},
			(err) => console.log(err)
		);
		this.ref.detectChanges();
	}
	// success
	responseGetIncident(resp){
		this.incidents = resp;
		console.log("incident")
		console.log(this.incidents)
		this.ref.detectChanges();
	}
	// success
	responseGetTypes(resp){ 
		this.red_type = resp;
		console.log("getTypes");
		console.log(this.red_type);
		this.ref.detectChanges();
	}
	// success
	responseGetCategory(resp){
		this.red_category = resp;
		console.log("getCategory");
		console.log(this.red_category)
		this.ref.detectChanges();
	}
	// success
	responseGetSubCategory(resp){
		this.red_subcategory = resp;
		console.log("subCategory");
		console.log(this.red_subcategory)
		this.ref.detectChanges();
	}
	// success
	traerQuiebres() {
		this.blockUI.start("Cargando #YoTeAyudo");
		this.user = JSON.parse(localStorage.getItem('user'));
		console.log("USER ID")
		console.log(this.user)
		console.log(this.user.id)
		this.incidentsService.getIncidents_Details(this.user.id).subscribe(
			(res) => {
				this.responseTraerQuiebres(res);
			},
			(err) => console.log(err)

	 );
	}
	// success
	responseTraerQuiebres(res){
		console.log("TRAER QUIEBRES")
		console.log(res)
				this.INCIDENT_DATA = res;
				this.INCIDENT_DATA = this.INCIDENT_DATA.reverse();
				this.dataSourceIncidentDetails = new MatTableDataSource(this.INCIDENT_DATA);
				this.dataSourceIncidentDetails.paginator = this.paginator;
				// console.log('Incident_details YoTeAyudo', this.INCIDENT_DATA);
				this.blockUI.stop();
	}
	// success
	onSelectRed(id: number): void {
		console.log('IdRed->', id);
		// console.log('red_category->', this.red_category.filter(item => item.id_red_type.id == id));
		this.red_category2 = this.red_category.filter((item) => item.id_red_type.id == id);
	}
	// success
	onSelectCategory(id: number): void {
		 console.log('IdCategory->', id);
		 console.log('red_subcategory->', this.red_subcategory);
		 console.log('red_category3->', this.red_subcategory.filter(item => item.id_red_category.id == id));
		this.red_subcategory2 = this.red_subcategory.filter((item) => item.id_red_category.id == id);
		console.log('red_subcategory2->', this.red_subcategory2);
	}
	// success
	onSelectSubCategory(id: number): number {
		this.id_subcategory = id;
		// console.log('IdSubCategory->', this.id_subcategory);
		return this.id_subcategory;
	}
	// success
	onSelectTipoDocumento(id: number): void {
		// console.log('IdTipoDocumento->', id);
		this.tipodocumento = id;
		// console.log('red_category->', this.red_category.filter(item => item.id_red_type.id == id));
		// // this.red_category2 =  this.red_category.filter(item => item.id_red_type.id == id);
	}
	// success
	showForm() {
		this.mostrarFormulario = !this.mostrarFormulario;
	}
	// success
	showVerEstado(element: any, userId: any) {
		console.log('estadoEmbajador', element)
		this.dialog.open(EmbDialogVerEstadoComponent, {
			maxWidth: '95vw',
			width: '40%',
			data: {
				element: element,
				userId: userId
			}
		});
	}
	// success
	resetearForm() {
		(<FormGroup>this.yoteayudoForm).setValue(this.incidentReset, { onlySelf: true });
	}
	// success
	saveIncident(values) {
		console.log(values)
		this.user = JSON.parse(localStorage.getItem('user'));
		this.userId = this.user.id;
		// console.log('UserId', this.userId);
		this.onSelectSubCategory(this.id_subcategory);
		this.onSelectTipoDocumento(this.tipodocumento);
		// Pasando el objeto del yoteayudoForm a incident_form
		this.incident_form = values;
		this.incident_form.id_red_subcategory = this.id_subcategory;
		this.incident_form.id_dhr_user = this.userId;
		this.incident_form.tipo_documento = this.tipodocumento;
		console.log('UserId', this.incident_form.id_dhr_user)
		console.log('Incident_Form -> SaveIncident', this.incident_form);		
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success m-1',
				cancelButton: 'btn btn-danger m-1'
			},
			buttonsStyling: false
		});
		swalWithBootstrapButtons
			.fire({
				title: 'Estas seguro?',
				text: 'Se registrará el quiebre',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Si, registrar!',
				cancelButtonText: 'No, cancelar!',
				reverseButtons: true
			})
			.then((result) => {
				this.blockUI.start("Procesando...")
				if (result.isConfirmed) {
					this.incidentsService.saveIncident(this.incident_form).subscribe(
						(res) => {
							console.log("RESPONSE SAVE INCIDENT")
							console.log(res)
							// console.log('Id_Quiebre', this.incidente_creado.id);
							// console.log('Id_Detalle_Quiebre', this.incident_details.id_dhr_red_incident);
							// console.log('Quiebrecreado -> Saveincident_Details', this.incident_details);
							this.incidentsService.saveIncident_Details(this.responseSaveIncident(res)).subscribe(
								(res) => {
									this.responseSaveIncidentDetails(swalWithBootstrapButtons,'Registrado!',"Se registró el quiebre","success")
								},
								(err) =>{
									// console.log('Error en crear el detalle del Quiebre', err)
									this.responseSaveIncidentDetails(swalWithBootstrapButtons,"Cancelado!","Error en crear el detalle del Quiebre","error")
								} 
							);
						},
						(err) => {
							this.errorIncident();
						}
							
					);

					this.mostrarFormulario = !this.mostrarFormulario;
					this.resetearForm();
					
				} else {
					this.elseDissmissSwal(result.dismiss,Swal.DismissReason.cancel,swalWithBootstrapButtons)
				}
			});

	}
	// success
	elseDissmissSwal(conditionDismiss,ButtonCance:any,swalWithBootstrapButtons){
		if (
			/* Read more about handling dismissals below */
			conditionDismiss === ButtonCance
			
		) {
			this.responseSaveIncidentDetails(swalWithBootstrapButtons,'Cancelado!',"No se registró el quiebre","error")
			
		}
	}
	// success
	responseSaveIncident(res){
		// console.log(res)
		// console.log("Incidente registrado", res);
		this.incidente_creado = res;
		// console.log('Id Incidente_creado', this.incidente_creado.id);
		// console.log('Quiebre creado', this.incidente_creado);

		this.incident_details.id_dhr_red_incident = this.incidente_creado.id;
		this.incident_details.se_hizo_ajuste = 'No';
		this.incident_details.se_atendio_remedy = 'No';
		this.incident_details.se_realizo_doit = 'No';

		this.incident_details.situacion_quiebre = 'Primera';
		this.incident_details.id_dhr_red_status = 1;
		this.incident_details.id_dhr_incident_submotivo = 141;
		this.incident_details.createdBy = this.user.id;
		this.incident_details.updatedBy = this.user.id;
		// delete this.incident_details.id;
		console.log(this.incident_details);
		return this.incident_details;
	}
	// success
	responseSaveIncidentDetails(swalWithBootstrapButtons:any,mainTitle:string,message:string,icon:any){
	// console.log(res);
	// this.router.navigateByUrl("/embajador/yo-te-ayudo")
	this.blockUI.stop();
	swalWithBootstrapButtons.fire(
		mainTitle,
		message,
		icon
	);
	}
	// success
	errorIncident(){
		// console.log(err)
		this.blockUI.stop();
		Swal.fire({
			icon:"error",
			text:'Error en crear el detalle del Quiebre'
		})
	
	}
					}
