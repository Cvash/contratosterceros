import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IMainUser } from 'src/app/business/models/IModel-module';
import { MatDialog } from '@angular/material/dialog';
import { PlanService } from '../yo-te-ayudo/services/plan.service';
import {
	FormBuilder,
	FormGroup,
	Validators
} from '@angular/forms';
import Swal from 'sweetalert2';
import { EmbDialogEditarplanComponent } from './emb-dialog-editarplan/emb-dialog-editarplan.component';
import { EmbDialogLoquieroComponent } from './emb-dialog-loquiero/emb-dialog-loquiero.component';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-movistar-total',
	templateUrl: './movistar-total.component.html',
	styleUrls: ['./movistar-total.component.scss']
})
export class MovistarTotalComponent implements OnInit {
	PlanForm: FormGroup;
	planMostrado: any = [];
	valoresForm: any = [];
	rolAdministrador: Boolean = false;


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
			lineas_moviles: ['', Validators.required],
			bono: ['por defecto', Validators.required],
			tv: ['', Validators.required],
			linea_fija: ['', Validators.required],
			gb_international: ['', Validators.required],
			wsp_international: ['', Validators.required],
			id_emb_type: [1]
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
	eliminarPlanLogico: any;
	@BlockUI() blockUI: NgBlockUI;
	// success
	traerPlanes() {
		this.planService.getPlans().toPromise().then(
			(res) => {
				console.log("GET PLANES")
				console.log(res)
				this.responseGetPlanes(res);
			},
			(err) => console.log(err)
		);
	}
	// success
	responseGetPlanes(res){
		this.plans = res;
		this.ref.detectChanges();
		// console.log('Planes obtenidos de la BD', this.plans);
		this.plansMovistarTotal = this.plans.filter((item) => item.id_emb_type.id == 1);
		this.plansHogar = this.plans.filter((item) => item.id_emb_type.id == 2);
		this.plansMovil = this.plans.filter((item) => item.id_emb_type.id == 3);
		this.ref.detectChanges();
	}
	// success
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
	// succeess
	showForm(plan: any, userId: any) {
		this.dialog.open(EmbDialogLoquieroComponent, {
			// maxWidth: '95vw',
			// width: '75%',
			width:"500px",
			height:"600px",
			maxHeight:"90vh",
			maxWidth:"90vw",
			disableClose: false,
			data: {
				planId: plan.id,
				userId: userId
			}
		});
		
	}
	// success
	showEditarPlan(plan: any, userId: any) {
		const dialogRef = this.dialog.open(EmbDialogEditarplanComponent, {
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
			this.responseAfterClosedEmbEdit(result);
		});
	}
	// success
	responseAfterClosedEmbEdit(result:any){
		try {
			console.log(result)
			if(result["result"]){
				this.traerPlanes();
			}
			} catch (error) {
				
			}
	}
	/* pasarPlan(plan: Plan) {
		console.log("PASAR PLAN")
		console.log(plan)
		this.planMostrado = plan;
		console.log('PlanMostrado', this.planMostrado);
		console.log('PlanMostradoId', this.planMostrado.id);
		delete this.planMostrado.createdBy;
		delete this.planMostrado.updatedAt;
		delete this.planMostrado.updatedBy;
		delete this.planMostrado.status;
		if (this.planMostrado.id_emb_type.id == 1) {
			this.planMostrado.id_emb_type = 1;
		} else if (this.planMostrado.id_emb_type.id == 2) {
			this.planMostrado.id_emb_type = 2;
		} else if (this.planMostrado.id_emb_type.id == 3) {
			this.planMostrado.id_emb_type = 3;
		}

		(<FormGroup>this.PlanForm).setValue(this.planMostrado, { onlySelf: true });
		return this.planMostrado;
	} */

	// success
	mostrarDetalles() {
		this.mostrarInformacionPlanes = !this.mostrarInformacionPlanes;
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

	// enviar(values) {
	//   this.valoresForm = values
	//   console.log("ValoresForm", this.valoresForm);
	// }

	/* savePlan(values) {
		console.log("SAVE PLAM")
		console.log(values);
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
				showCancelButton: true,
				confirmButtonText: 'Si, actualízar!',
				cancelButtonText: 'No, cancelar!',
				reverseButtons: true
			})
			.then((result) => {
				if (result.isConfirmed) {
					this.planService.updatePlan(this.valoresForm).subscribe(
						(res) => {
							this.responseUpdatePlan(swalWithBootstrapButtons);
						},
						(err) =>{
							this.showSwalMessageMovTotal(swalWithBootstrapButtons,"Cancelado!","No se actualizó el plan seleccionado","error")
						} 
					);
				} else {
					this.elseSavePlan(result.dismiss,Swal.DismissReason.cancel,swalWithBootstrapButtons);
				}
			});
	} */
	/* responseUpdatePlan(swalWithBootstrapButtons:any){
		this.traerPlanes();
		this.showSwalMessageMovTotal(swalWithBootstrapButtons,"Actualizado!","El plan seleccionado se modificó exitosamente","success");
	}
	elseSavePlan(swalWithBootstrapButtons:any,dismiss:any,buttonCancel:any){
		if (
			dismiss===buttonCancel
		) {
			this.showSwalMessageMovTotal(swalWithBootstrapButtons,'Cancelado!','No se actualizó el plan seleccionado',"error")
		}
	} */

	/* showSwalMessageMovTotal(swalWithBootstrapButtons:any,mainTitle:string,message:string,icon:any){
		this.blockUI.stop();
		swalWithBootstrapButtons.fire(
			mainTitle,
			message,
			icon
		);
	} */
}
