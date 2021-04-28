import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { PlanService } from '../yo-te-ayudo/services/plan.service';
import {
	FormBuilder,
	FormGroup,
	Validators
} from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { IMainUser } from 'src/app/business/models/IModel-module';
import { EmbDialogLoquieroComponent } from '../movistar-total/emb-dialog-loquiero/emb-dialog-loquiero.component';
import { EmbDialogEditarPlanMovilComponent } from './emb-dialog-editar-plan-movil/emb-dialog-editar-plan-movil.component';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-movil',
	templateUrl: './movil.component.html',
	styleUrls: ['./movil.component.scss']
})
export class MovilComponent implements OnInit {
	PlanForm: FormGroup;

	planMostrado: any = [];

	valoresForm: any = [];
	rolAdministrador: Boolean = false;
	arregloroles: any = [];
	eliminarPlanLogico: any;

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
			id_emb_type: [3]
		});
	}

	user: IMainUser;
	userId: Number;

	mostrarInformacionPlanes: any = true;
	mostrarInformacionPlanesForm: any = true;

	plansMovistarTotal: any = [];
	plansHogar: any = [];
	plansMovil: any = [];
	plans: any = [];
	id:any;
	@BlockUI() blockUI: NgBlockUI;

	traerPlanes() {
		this.planService.getPlans().subscribe(
			(res) => {
				this.responseGetPlans(res);
				
			},
			(err) => console.log(err)
		);
	}

	// success
	responseGetPlans(resp){
		this.plans = resp;
		console.log("planes", this.plans)
		this.ref.detectChanges();

		// console.log('Planes obtenidos de la BD', this.plans);
		this.plansMovistarTotal = this.plans.filter((item) => item.id_emb_type.id == 1);
		this.plansHogar = this.plans.filter((item) => item.id_emb_type.id == 2);
		this.plansMovil = this.plans.filter((item) => item.id_emb_type.id == 3);
		this.ref.detectChanges();
		this.blockUI.stop();
	}




	ngOnInit(): void {

		this.user = JSON.parse(localStorage.getItem('user'));
		this.userId = this.user.id;
		console.log('User', this.user);

		for (let i = 0; i <= this.user.role.length - 1; i++) {
			// console.log('Roles encontrados' ,this.user.role[i].id);
			if(this.user.role[i].id == 150) {
				// console.log('Encontre al admin')
				this.rolAdministrador = true;
				// console.log('Es admin?', this.rolAdministrador)
				break;
			} 
	  }

		// console.log("Admin final", this.rolAdministrador);

		this.traerPlanes();
	}

	// pasarPlan(plan) {
	// 	this.planMostrado = plan;
	// 	// console.log('PlanMostrado', this.planMostrado);
	// 	// console.log('PlanMostradoId', this.planMostrado.id);
	// 	delete this.planMostrado.createdBy;
	// 	delete this.planMostrado.updatedAt;
	// 	delete this.planMostrado.updatedBy;
	// 	delete this.planMostrado.status;
	// 	delete this.planMostrado.bono;
	// 	delete this.planMostrado.max_descarga;
	// 	delete this.planMostrado.max_subida;
	// 	delete this.planMostrado.modem;
	// 	delete this.planMostrado.lineas_moviles;
	// 	delete this.planMostrado.tv;
	// 	delete this.planMostrado.linea_fija;
	// 	delete this.planMostrado.gb_international;
	// 	delete this.planMostrado.wsp_international;
	// 	if (this.planMostrado.id_emb_type.id == 1) {
	// 		this.planMostrado.id_emb_type = 1;
	// 	} else if (this.planMostrado.id_emb_type.id == 2) {
	// 		this.planMostrado.id_emb_type = 2;
	// 	} else if (this.planMostrado.id_emb_type.id == 3) {
	// 		this.planMostrado.id_emb_type = 3;
	// 	}

	// 	(<FormGroup>this.PlanForm).setValue(this.planMostrado, { onlySelf: true });
	// 	return this.planMostrado;
	// }

	mostrarDetalles() {
		this.mostrarInformacionPlanes = !this.mostrarInformacionPlanes;
	}


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
							this.blockUI.stop();
							// console.log('Plan actualizado', res);
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

	showForm(plan: any, userId: any) {
		const dialogRef = this.dialog.open(EmbDialogLoquieroComponent, {
			// maxWidth: '95vw',
			// width: '75%',
			// disableClose: true,
			data: {
				planId: plan.id,
				plan: plan,
				userId: userId
			}
		});
		dialogRef.afterClosed().subscribe((result) => {
			// console.log(`Dialog result: ${result}`);
		});
	}

	showEditarPlanHogar(plan: any, userId: any) {
		console.log('PlanMovil', plan);
		const dialogRef = this.dialog.open(EmbDialogEditarPlanMovilComponent, {
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
			if (result == 'true') {
			}
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
