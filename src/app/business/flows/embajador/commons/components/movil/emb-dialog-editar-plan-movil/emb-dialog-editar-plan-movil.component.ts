import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PlanService } from '../../yo-te-ayudo/services/plan.service';
import {
	FormBuilder,
	FormGroup,
	Validators
} from '@angular/forms';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilService } from '../../../services/util.service';

@Component({
	selector: 'app-emb-dialog-editar-plan-movil',
	templateUrl: './emb-dialog-editar-plan-movil.component.html',
	styleUrls: ['./emb-dialog-editar-plan-movil.component.scss']
})
export class EmbDialogEditarPlanMovilComponent implements OnInit {

	PlanFormMovil: FormGroup;
  	valoresForm: any = [];
	id_emb_type: any;
	@BlockUI() blockUI: NgBlockUI;

	constructor(private planService: PlanService,
		private serviceUtil : UtilService,
		private _builder: FormBuilder,
		
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<EmbDialogEditarPlanMovilComponent>) {

		this.PlanFormMovil = this._builder.group({
			id: [0],
			emb_price: ['', Validators.required],
			regular_price: ['', Validators.required],
			cant_mbps: ['', Validators.required],
			plan_type: ['', Validators.required],
			// max_descarga: ['',],
			// max_subida: ['',],
			// modem: ['',],
			// lineas_moviles: ['',],
			// bono: ['por defecto',],
			// tv: ['', ],
			// linea_fija: ['',],
			// gb_international: ['',],
			// wsp_international: ['',],
			id_emb_type: [3],
			createdAt: ['',],
		});
	}
	// test success
	ngOnInit(): void {

		delete this.data.plan.createdBy;
		delete this.data.plan.updatedAt;
		delete this.data.plan.updatedBy;
		delete this.data.plan.status;
		delete this.data.plan.bono;
		delete this.data.plan.max_descarga;
		delete this.data.plan.max_subida;
		delete this.data.plan.modem;
		delete this.data.plan.lineas_moviles;
		delete this.data.plan.tv;
		delete this.data.plan.linea_fija;
		delete this.data.plan.gb_international;
		delete this.data.plan.wsp_international;
		console.log("PASE POR ACA");
		(<FormGroup>this.PlanFormMovil).setValue(this.data.plan, { onlySelf: true });

	}

	savePlan(values) {
		this.valoresForm = values;
		this.serviceUtil.savePlan(this.valoresForm,this.dialogRef)

	}
}
