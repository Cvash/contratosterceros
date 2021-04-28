import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
	FormBuilder,
	FormGroup,
	Validators
} from '@angular/forms';
import { RequestService } from '../../../components/yo-te-ayudo/services/request.service';

@Component({
	selector: 'app-emb-dialog-loquiero',
	templateUrl: './emb-dialog-loquiero.component.html',
	styleUrls: ['./emb-dialog-loquiero.component.scss']
})
export class EmbDialogLoquieroComponent implements OnInit {
	checked = true;
	requestForm: FormGroup;

	emb_request: any = {
		dni: '',
		cel_contacto: '',
		mail: '',
		tratamiento_datos: '',
		id_dhr_user: 0,
		id_dhr_emb_plan: 0
	};

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private _builder: FormBuilder,
		private requestService: RequestService
	) {
		this.requestForm = this._builder.group({
			dni: ['', Validators.required],
			cel_contacto: ['', Validators.required],
			mail: ['', Validators.required],
			tratamiento_datos: ['', Validators.required]
		});
	}

	ngOnInit(): void {}

	saveRequest(values) {
		console.log("LO QUIERO");
		console.log(values);
		this.emb_request = values;
		this.emb_request.id_dhr_user = this.data.userId;
		this.emb_request.id_dhr_emb_plan = this.data.planId;

		// console.log('UserId', this.data.userId);
		// console.log('PlanId', this.data.planId);
		// console.log('ObjetoRequest', this.emb_request);
		// console.log('Data', this.data);

		this.requestService.saveRequest(this.emb_request).subscribe(
			(res) => {
				this.emb_request = res;
				// console.log('Request guardado', this.emb_request);
			},
			(err) => console.log(err)
		);
	}
}
