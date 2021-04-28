import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlanService } from '../../yo-te-ayudo/services/plan.service';
import {
	FormBuilder,
	FormGroup,
	Validators
} from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
	selector: 'app-emb-dialog-editarplan',
	templateUrl: './emb-dialog-editarplan.component.html',
	styleUrls: ['./emb-dialog-editarplan.component.scss']
})
export class EmbDialogEditarplanComponent implements OnInit {
	PlanForm: FormGroup;
	valoresForm: any = [];
	id_emb_type: any;
	@BlockUI() blockUI: NgBlockUI;
	constructor(
		private planService: PlanService,
		private _builder: FormBuilder,
		public dialogRef:MatDialogRef<EmbDialogEditarplanComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
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
			id_emb_type: [1],
			createdAt: ['',],
		});
	}
	// success
	ngOnInit(): void {
		delete this.data.plan.createdBy;
		delete this.data.plan.updatedAt;
		delete this.data.plan.updatedBy;
		delete this.data.plan.status;

		(<FormGroup>this.PlanForm).setValue(this.data.plan, { onlySelf: true });
	}
    // success
	savePlan(values) {
		this.valoresForm = values;
		console.log('valuesForm', this.valoresForm);

		this.id_emb_type = this.valoresForm.id_emb_type.id;
		this.valoresForm.id_emb_type = this.id_emb_type;

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
				text: 'Se actualizará el plan seleccionado',
				icon: 'warning',
				allowOutsideClick: false,
				showCancelButton: true,
				confirmButtonText: 'Si, actualízar!',
				cancelButtonText: 'No, cancelar!',
				reverseButtons: true
			})
			.then((result) => {
				this.blockUI.start("Procesando...")
				if (result.isConfirmed) {
					this.planService.updatePlan(this.valoresForm).subscribe(
						(res) => {
							this.swalWithBootstrapDialog(swalWithBootstrapButtons,"Actualizado!","El plan seleccionado se modificó exitosamente","success",true);
						},
						(err:HttpErrorResponse) =>{
							this.swalWithBootstrapDialog(swalWithBootstrapButtons,"Error!",err.statusText,"error",false);
						}
					);
					
				} else{
				    this.elseEditPlan(swalWithBootstrapButtons,result.dismiss,Swal.DismissReason.cancel);
				}
			});
	}
	// success
	elseEditPlan(swalWithBootstrapButtons,dismiss:any,button:any){
		if (
			/* Read more about handling dismissals below */
			dismiss===button
		) {
			this.swalWithBootstrapDialog(swalWithBootstrapButtons,"Cancelado!","No se actualizó el plan seleccionado","error",false);
		}
	}
	// success
	swalWithBootstrapDialog(swalWithBootstrapButtons,mainTitle:string,message:string,icon:any,afterClose:boolean){
		this.blockUI.stop();
		swalWithBootstrapButtons.fire(
		mainTitle,
		message,
		icon);
		this.dialogRef.close(
		{"result":afterClose}
		)
	}
}
