import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlanService } from '../../yo-te-ayudo/services/plan.service';
import {
	FormBuilder,
	FormGroup,
	Validators
} from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { EmbDialogEditarPlanMovilComponent } from '../../../components/movil/emb-dialog-editar-plan-movil/emb-dialog-editar-plan-movil.component'
import { UtilService } from '../../../services/util.service';
@Component({
	selector: 'app-emb-dialog-editar-plan-hogar',
	templateUrl: './emb-dialog-editar-plan-hogar.component.html',
	styleUrls: ['./emb-dialog-editar-plan-hogar.component.scss']
})
export class EmbDialogEditarPlanHogarComponent implements OnInit {
	PlanFormHogar: FormGroup;
	valoresForm: any = [];
	id_emb_type: any;
	@BlockUI() blockUI: NgBlockUI;
	constructor(
		private serviceUtil : UtilService,
		private planService: PlanService,
		private _builder: FormBuilder,
		
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef:MatDialogRef<EmbDialogEditarPlanHogarComponent>
	) {
		this.PlanFormHogar = this._builder.group({
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
			gb_international: [''],
			wsp_international: [''],
			id_emb_type: [2],
			createdAt: ['']
		});
	}

	ngOnInit(): void {
		delete this.data.plan.createdBy;
		delete this.data.plan.updatedAt;
		delete this.data.plan.updatedBy;
		delete this.data.plan.status;
		(<FormGroup>this.PlanFormHogar).setValue(this.data.plan, { onlySelf: true });
	}

	savePlan(values) {
		this.valoresForm = values;
		this.serviceUtil.savePlan(this.valoresForm,this.dialogRef)	
		
	}
}
