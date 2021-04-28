import { Component, OnInit } from '@angular/core';
import { IMainUser } from '../../../../../../business/models/IModel-module';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AuthServiceService } from '../../../../../../commons/services/auth-service.service';
import { AccessCodeService } from '../access-code/access-code.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangePasswordComponent } from '../../../../../../commons/components/header/change-password/change-password.component';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
	selector: 'app-access-code',
	templateUrl: './access-code.component.html',
	styleUrls: ['./access-code.component.scss']
})
export class AccessCodeComponent implements OnInit {
	userObject: IMainUser = null;
	confirmAccessCode = '';
	messageAlert: string;
	@BlockUI() blockUI: NgBlockUI;
	constructor(
		private auth: AuthServiceService,
		public dialogRef: MatDialogRef<AccessCodeComponent>,
		private dialog: MatDialog,
		public accessCodeForm: AccessCodeService
	) { }
	ngOnInit() {
		this.messageAlert = "";
		this.accessCodeForm.accessForm.get('code').setValue('');
	}
	captureValue() {
		this.confirmAccessCode = this.accessCodeForm.accessForm.get('code').value;
	}

	showAlertFalse(condition: boolean, message: string) {
		this.messageAlert = message;
		if (condition === false) {
			Swal.fire({
				icon: 'error',
				text: message
			});
		}
	}
	showAlertUserNotNull(user: IMainUser, message: string) {
		this.messageAlert = message;
		if (user != null) {
			Swal.fire({
				icon: 'success',
				text: message
			}).then((respAlert) => {
				if (!respAlert.dismiss) {
					this.showChangePassword(user);
				}
			});
		}
	}
	submitAccessCode() {
		this.captureValue();
		if (this.confirmAccessCode === '') {
			Swal.fire({
				icon: 'warning',
				text:
					'Necesita ingresar el código que se le envió por mensaje para seguir con el proceso de cambio de contraseña.'
			});
		} else {
			this.blockUI.start("Validando código de accesso..")
			this.auth.getDataBycodeGenerate(this.confirmAccessCode).subscribe((user) => {
				this.blockUI.stop()
				this.showAlertUserNotNull(user, 'El codigo ingresado es correcto. Proceda a ingresar su nueva contraseña.')
			},
			(error:HttpErrorResponse)=>{
				if(error.status!=200){
					this.blockUI.stop()
					this.showAlertFalse(false, "El código ingresado es incorrecto. Por favor, ingrese el código vigente o solicite otro. Gracias.")
			
				}	
			});

		}
	}

	showChangePassword(user: IMainUser) {
		const dialogRef = this.dialog.open(ChangePasswordComponent, {
			maxWidth: '95vw',
			width: '75%',
			disableClose: true,
			data: {
				userData: user,
				condition: 1
			}
		});
		dialogRef.afterClosed().subscribe((resp) => {
			this.onClose();
		});
	}

	onClose() {
		this.dialogRef.close();
	}

}
