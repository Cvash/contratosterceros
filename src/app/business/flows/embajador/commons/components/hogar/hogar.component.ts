import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PlanService } from '../yo-te-ayudo/services/plan.service';
import { IMainUser } from 'src/app/business/models/IModel-module';
import {
	FormBuilder,
	FormGroup,
	Validators
} from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { EmbDialogLoquieroComponent } from '../movistar-total/emb-dialog-loquiero/emb-dialog-loquiero.component';
import { EmbDialogEditarPlanHogarComponent } from './emb-dialog-editar-plan-hogar/emb-dialog-editar-plan-hogar.component';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-hogar',
	templateUrl: './hogar.component.html',
	styleUrls: ['./hogar.component.scss']
})
export class HogarComponent implements OnInit {
	PlanForm: FormGroup;

	planMostrado: any = [];

	valoresForm: any = [];

	id: any;
	rolAdministrador: Boolean = false;
	id_emb_type: any;


	constructor(
		private planService: PlanService,
		private _builder: FormBuilder,
		public dialog: MatDialog,
		private ref:ChangeDetectorRef
	) {
		this.PlanForm = this._builder.group({
			id: [0],
			emb_price: ['', Validators.required],
			regular_price: ['', Validators.required],
			cant_mbps: ['', Validators.required],
			plan_type: ['', Validators.required],
			max_descarga: ['', Validators.required],
			max_subida: ['', Validators.required],
			modem: ['', Validators.required],
			bono: ['por defecto', Validators.required],
			tv: ['', Validators.required],
			linea_fija: ['', Validators.required],
			id_emb_type: [2]
		});
	}

	user: IMainUser;
	userId: Number;

	mostrarInformacionPlanes: any = true;
	mostrarInformacionPlanesForm: any = true;

	plansMovistarTotal: any = [];
	plansHogar: any = [];
	plansMovil: any = [];
	eliminarPlanLogico: any;
	plans: any = [];
	@BlockUI() blockUI: NgBlockUI;
	traerPlanes() {
		/* this.blockUI.start("Cargando datos..."); */
		this.planService.getPlans().subscribe(
			(res) => {
				this.plans = res;
				// console.log('Planes obtenidos de la BD', this.plans);
				this.plansMovistarTotal = this.plans.filter((item) => item.id_emb_type.id == 1);
				this.plansHogar = this.plans.filter((item) => item.id_emb_type.id == 2);
				this.plansMovil = this.plans.filter((item) => item.id_emb_type.id == 3);
				this.ref.detectChanges();
				this.blockUI.stop();
			},
			(err) => console.log(err)
		);
	}

	ngOnInit(): void {
		this.user = JSON.parse(localStorage.getItem('user'));
		this.userId = this.user.id;
		// console.log('UserId', this.userId);

		this.traerPlanes();

		for (let i = 0; i <= this.user.role.length - 1; i++) {
			// console.log('Roles encontrados' ,this.user.role[i].id);
			if(this.user.role[i].id == 150) {
				// console.log('Encontre al admin')
				this.rolAdministrador = true;
				// console.log('Es admin?', this.rolAdministrador)
				break;
			} 
	  }

	}

	pasarPlan(plan) {
		this.planMostrado = plan;
		// console.log('PlanMostrado', this.planMostrado);
		// console.log('PlanMostradoId', this.planMostrado.id);
		delete this.planMostrado.createdBy;
		delete this.planMostrado.updatedAt;
		delete this.planMostrado.updatedBy;
		delete this.planMostrado.status;
		delete this.planMostrado.gb_international;
		delete this.planMostrado.wsp_international;

		this.id_emb_type = this.planMostrado.id_emb_type.id;
		this.planMostrado.id_emb_type = this.id_emb_type;


		(<FormGroup>this.PlanForm).setValue(this.planMostrado, { onlySelf: true });
		return this.planMostrado;
	}

	mostrarDetalles() {
		this.mostrarInformacionPlanes = !this.mostrarInformacionPlanes;
	}

	// enviar(values) {
	//   this.valoresForm = values
	//   console.log("ValoresForm", this.valoresForm);
	// }

	savePlan(values) {
		this.valoresForm = values;

		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success',
				cancelButton: 'btn btn-danger'
			},
			buttonsStyling: false
		});

		swalWithBootstrapButtons
			.fire({
				title: 'Estas seguro?',
				text: 'Se actualizará el plan seleccionado',
				icon: 'warning',
				allowOutsideClick: false,
				showCancelButton: true,
				confirmButtonText: 'Si, actualízar!',
				cancelButtonText: 'No, cancelar!',
				reverseButtons: true
			})
			.then((result) => {
				this.blockUI.start("Procesando...");
				if (result.isConfirmed) {
					this.planService.updatePlan(this.valoresForm).subscribe(
						(res) => {
							// console.log('Plan actualizado', res);
							this.blockUI.stop();
							swalWithBootstrapButtons.fire(
								'Actualizado!',
								'El plan seleccionado se modificó exitosamentee',
								'success'
							);
							this.traerPlanes();
						},
						(err:HttpErrorResponse) => {
							this.blockUI.stop();
							swalWithBootstrapButtons.fire(
								'Error!',
								err.statusText,
								'error'
							);
							}
					);
					
				} else if (
					/* Read more about handling dismissals below */
					result.dismiss === Swal.DismissReason.cancel
				) {
					this.blockUI.stop();
					swalWithBootstrapButtons.fire(
						'Cancelado',
						'No se actualizó el plan seleccionado',
						'error'
					);
				}
			});
	}

	showEditarPlanHogar(plan: any, userId: any) {
		const dialogRef = this.dialog.open(EmbDialogEditarPlanHogarComponent, {
			width:"500px",
			height:"600px",
			maxHeight:"90vh",
			maxWidth:"90vw",
			data: {
				plan: plan,
				userId: userId
			}
		});
		dialogRef.afterClosed().subscribe((result) => {
			// console.log(`Dialog result: ${result}`);
			try {
				if (result["result"] === true) {
					this.traerPlanes();
				}
			} catch (error) {
				
			}
		});
	}

	showForm(plan: any, userId: any) {
		const dialogRef = this.dialog.open(EmbDialogLoquieroComponent, {
			// maxWidth: '95vw',
			// width: '75%',
			// disableClose: true,
			data: {
				plan: plan,
				planId: plan.id,
				userId: userId
			}
		});
		dialogRef.afterClosed().subscribe((result) => {
			// console.log(`Dialog result: ${result}`);
		});
	}

	eliminarLogico(plan) {
		this.eliminarPlanLogico = plan;
		this.eliminarPlanLogico.id_emb_type = 4;
		// this.planService.updatePlan(this.eliminarPlanLogico).subscribe(
		// 	(res) => {
		// 		console.log('Se eliminó logicamente');
		// 	},
		// 	(err) => console.log('error', err)
		// )

	const swalWithBootstrapButtons = Swal.mixin({
		customClass: {
			confirmButton: 'btn btn-success',
			cancelButton: 'btn btn-danger'
		},
		buttonsStyling: false
	});

	swalWithBootstrapButtons
		.fire({
			title: 'Estas seguro?',
			text: 'Se eliminará el plan',
			icon: 'warning',
			allowOutsideClick: false,
			showCancelButton: true,
			confirmButtonText: 'Si, eliminar!',
			cancelButtonText: 'No, cancelar!',
			reverseButtons: true
		})
		.then((result) => {
			this.blockUI.start("Procesando...");
			if (result.isConfirmed) {
				this.planService.updatePlan(this.eliminarPlanLogico).subscribe(
					(res) => {
						// console.log('Plan actualizado', res);
						this.blockUI.stop();
						swalWithBootstrapButtons.fire(
							'Eliminado!',
							'El plan seleccionado se eliminó exitosamentee',
							'success'
						);
						this.traerPlanes();
					},
					(err:HttpErrorResponse) => {
						this.blockUI.stop();
						swalWithBootstrapButtons.fire(
							'Error!',
							err.statusText,
							'error'
						);
						}
				);
				
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) {
				this.blockUI.stop();
				swalWithBootstrapButtons.fire(
					'Cancelado',
					'No se actualizó el plan seleccionado',
					'error'
				);
			}
		});


	}

	
}
