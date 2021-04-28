import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { IMainUser } from '../../../../../../business/models/IModel-module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthServiceService } from '../../../../../../commons/services/auth-service.service';
import { Router } from '@angular/router';
import { TermsConditionReactiveService } from './terms-condition-reactive.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
const IDTERMS = 1;
export interface IUserTerms {
	idUser: any;
	idTerms: any;
}
@Component({
	selector: 'app-terms-conditions',
	templateUrl: './terms-conditions.component.html',
	styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit {
	@BlockUI() blockUI: NgBlockUI;
	termsConditionMessage = '';
	termsConditionTitle = '';
	termsConditionSubTitle = '';
	acceptTerms = false;
	userToken: any;
	user: IMainUser;
	constructor(
		public termsFormReactive: TermsConditionReactiveService,
		private router: Router,
		private auth: AuthServiceService,
		@Inject(MAT_DIALOG_DATA) private data: any,
		public dialogRef: MatDialogRef<TermsConditionsComponent>,
		private ref: ChangeDetectorRef
	) {
	}

	ngOnInit() {
		this.user = JSON.parse(localStorage.getItem('user'));
		this.termsConditionTitle =
			'Términos y condiciones sobre el uso de los datos personales del colaborador';
		this.initTermsConditionValue(this.user.id);
	}
	showMessageRestTermsCondition(terms){ 
		if (terms.condition) {
			this.termsConditionMessage = terms.terms;
			this.termsConditionSubTitle = terms.subTitle;
			this.ref.detectChanges();
		}
	}
	showMessageSaveTermsCondition(terms){ 
		this.dialogRef.close();
		if (terms.condition) {
			this.router.navigate(['']);
		} else {
			Swal.fire({
				icon: 'error',
				text: terms.errors
			});
			this.router.navigate(['/login-flow']);
		}
	}
	initTermsConditionValue(userId: any) {
		setTimeout(() => {
			this.auth.getTemrAndCondition(userId).subscribe((resp) => {
				this.showMessageRestTermsCondition(resp);
			});
			this.blockUI.stop()
		}
		, 200);
	}

	saveUserTermsCondition(terms: any) {
		if (terms === false) {
			Swal.fire({
				icon: 'info',
				text: 'Necesita aceptar los términos y condiciones para ingresar al sistema.'
			});
		} else {
			let request: IUserTerms;
			request = { idUser: this.user.id, idTerms: IDTERMS };
			const json = {
				request: request
			};
			this.blockUI.start('Procesando..');

			this.auth.saveTermsAndConditionByUser(json).subscribe((resp) => {
				this.blockUI.stop();
				this.showMessageSaveTermsCondition(resp);
				
			});
		}
	}
	logOut() {
		this.dialogRef.close();
		this.auth.executeLogOut(this.user);
		localStorage.clear();
	}
}
