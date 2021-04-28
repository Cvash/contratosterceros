import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';
import { PlanService } from '../components/yo-te-ayudo/services/plan.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
	id_emb_type:any;
  @BlockUI() blockUI: NgBlockUI;
  constructor(private planService: PlanService) { }
  
  savePlan(valoresForm, dialogRef) {
		// console.log("Objeto del ReactiveForm",this.valoresForm);

		 this.id_emb_type = valoresForm.id_emb_type.id;
		 valoresForm.id_emb_type = this.id_emb_type;
		 
		console.log('codigo raro', valoresForm)

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
				this.ifConfirmedValidate(valoresForm,result.isConfirmed,swalWithBootstrapButtons,result.dismiss, dialogRef);
			});
  }
  ifConfirmedValidate(valoresForm:any,isConfirmed:any,swalWithBootstrapButtons:any,dismiss:any, dialogRef:any) { 
		if (isConfirmed) {
			console.log('Antes de actualizar', valoresForm);
			this.planService.updatePlan(valoresForm).subscribe(
				(res) => {
					this.responsePlanAlert(swalWithBootstrapButtons,'Actualizado','El plan seleccionado se modificó exitosamente',"success",true, dialogRef);
				},
				(err: HttpErrorResponse) => {
					console.log(err)
					this.responsePlanAlert(swalWithBootstrapButtons,'Cancelado!',err.statusText,"error",false,dialogRef);
				}

			);

		} else {
			this.elseIfPlanAlert(dismiss,Swal.DismissReason.cancel,swalWithBootstrapButtons,dialogRef);
		}
  }
  elseIfPlanAlert(dismiss:any,cancel:any,swalWithBootstrapButtons, dialogRef){ 
		if (
			/* Read mo|re about handling dismissals below */
			dismiss === cancel
		) {
			console.log("elseIfPLanAlert");
			this.responsePlanAlert(swalWithBootstrapButtons,"Cancelado!","No se actualizó el plan seleccionado","error",false,dialogRef);
		}
	}
	responsePlanAlert(swalWithBootstrapButtons, mainTitle, message, icon, condition , dialogRef) {
		this.blockUI.stop();
		swalWithBootstrapButtons.fire(
			mainTitle,
			message,
			icon
		);
		dialogRef.close({
			"result": condition
		})
	}
}
