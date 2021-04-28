import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ɵConsole } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ChangePasswordComponent } from '../../../../../../commons/components/header/change-password/change-password.component';
import Swal from 'sweetalert2';
import {
	IDevice,
	IMainUser,
	IViewMain,
	IViewModule
} from '../../../../../../business/models/IModel-module';
import { AuthServiceService } from '../../../../../../commons/services/auth-service.service';
import { AccessCodeComponent } from '../access-code/access-code.component';
import { TermsConditionsComponent } from '../terms-conditions/terms-conditions.component';
import { LoginPageFormPresenter } from './commons/services/login-page-presenter';
import { LoginPageService } from './login-page.service';
import { element } from 'protractor';
import { RecaptchaErrorParameters } from 'ng-recaptcha';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss'],
	providers: [LoginPageFormPresenter]
})
export class LoginPageComponent implements OnInit {
	termsId = 1;
	@BlockUI() blockUI: NgBlockUI;
	// RESET PASSWORD
	userPass: string;
	logoReset: string;
	// loginDocumentErrors = LoginDocumentErrors;
	message: string;
	device: IDevice;
	// session
	isLoginTerms: any;
	flagReset: any;
	userObject: IMainUser;
	showPassword: any;
	permission: Array<IViewMain>;
	messageResetPassword: string;
	// message http
	messageAlert: string;
	entitlement: Array<IViewModule> = [];
	entitlementnotrepeat: Array<IViewModule> = [];
	logoLogin: string;
	backgroundImage:string;
	titleLogin: string;
	constructor(
		private auth: AuthServiceService,
		public loginFormReactive: LoginPageService,
		public loginPageFormPresenter: LoginPageFormPresenter,
		private router: Router,
		private ref: ChangeDetectorRef,
		private dialog: MatDialog,
		private deviceService: DeviceDetectorService
	) {
		this.device = this.deviceService.getDeviceInfo();
		this.validateHostName(document.location.host);
	}
	validateHostName(host: string) {
		if (host === 'empresascolaboradoras.movistar.com.pe') {
			this.logoLogin = "../../../../../assets/images/logo-movistar-terceros.png"
			this.backgroundImage = "../../../../../assets/images/media/bg/login-ter.png"
			this.titleLogin = "Bienvenidos a la Web de Empresas Colaboradoras";
		}
		else {
			this.logoLogin = "../../../../../../../assets/images/media/logos/logo-movistar.png"
			this.backgroundImage = "../../../../../../../assets/images/bc.png"
			this.titleLogin = "Bienvenido a la Web de Mosvistar Contigo";
		}
	}
	ngOnInit(): void {
		localStorage.clear();
		this.blockUI.stop();
		this.message = "";
		this.messageAlert = '';
		this.permission = [];
		this.loginFormReactive.captcha.setValue("");
		this.isLoginTerms = null;
		this.flagReset = false;
		this.userObject = null;
		this.showPassword = true;
		this.messageResetPassword = "";
		this.loginFormReactive.email.setValue('');
		this.loginFormReactive.password.setValue('');
		this.logoReset = '../../../../../../assets/images/reset.png';
	}
	/*reset password*/
	showResetPassword(point: number) {
		if (point === 0) {
			this.showPassword = true;
		}
		if (point === 1) {
			this.showPassword = false;
		}
	}
	showSweetAlertChangePassword(messageResetPassword: string) {
		Swal.fire({
			icon: 'warning',
			text: messageResetPassword
		}).then((respAlert) => {
			// !respAlert.dismiss
			this.responseSweetAlertChangePassword(!respAlert.dismiss, this.userPass, this.userObject);
		});
	}
	responseSweetAlertChangePassword(response, userPass: string, user: IMainUser) {
		if (response) {
			/* this.userObject.pass = userPass; */
			this.showChangePassword(user, 1);
		}
	}
	showDialogTermsCondition(user: IMainUser) {
		const dialogRef = this.dialog.open(TermsConditionsComponent, {
			disableClose: true,
			maxWidth: '80vw',
			maxHeight: '80vh',
			height: '80%',
			width: '80%',
			hasBackdrop: false
		});
		dialogRef.afterClosed().subscribe(() => {
			this.getAllRolesByUser(user.id);
		})
	}
	showVerifyLogin(mail: any, pass: any) {
		let status = 0;
		if (mail === '' && pass === '') {
			status = 1;
			this.message =
				'Por favor, completar los datos del formulario, caso contrario, no podra ingresar al sistema';
			this.blockUI.stop();
		} else {
			if (mail === '') {
				status = 1;
				this.message =
					'Error, el nombre del usuario es incorrecto o tiene un formato no aceptado por el sistema. Por favor, completar el campo de forma correcta';
				this.blockUI.stop();
			} else {
				if (pass === '') {
					status = 1;
					this.message =
						'Error, la contraseña ingresada es incorrecta o tiene un formato no aceptado por el sistema. Por favor, completar el campo de forma correcta';
					this.blockUI.stop();
				} else {
					if (this.loginFormReactive.captcha.value === "") {
						status = 1;
						this.message = "Necesita seleccionar la opción 'NO SOY UN ROBOT' para poder iniciar sesión";
						this.blockUI.stop();
					}
				}
			}
		}
		return status;
	}

	executeTermsAndConditionService(user: IMainUser) {
		this.auth
			.verifyUserTermsCondition(this.termsId, user.id)
			.toPromise().then((terms) => {
				this.subExecuteTermsAndConditionService(terms, user);
			});
	}
	subExecuteTermsAndConditionService(terms: any, user: IMainUser) {
		this.isLoginTerms = terms;
		this.responseSubTermsCondition(this.isLoginTerms.condition, user);

	}
	responseSubTermsCondition(condition: boolean, user: IMainUser) {
		if (condition === false) {
			this.blockUI.stop();
			this.showDialogTermsCondition(user);
		}
		this.flagReset=false;
		if (condition === true) {
			// Main page
			let messageResetPassword = '';
			if (user.token.split('/').length > 1 && user.token.split('/')[1] === 'R35') {
				messageResetPassword =
					"Necesita realizar el cambio de su contraseña ya que han pasado " + user.token.split('/')[2] + " dias desde su ultima actualizacion. Si no realiza el cambio de su contraseña, no podra ingresar al sistema.";
				this.flagReset = true;
			}
			if (user.token.split('/').length > 1 && user.token.split('/')[1] === 'R') {
				messageResetPassword =
					'Necesita realizar el cambio de su contraseña. Si no realiza el cambio, no podra ingresar al sistema.';
				this.flagReset = true;
			}

			this.validateFlagReset(this.flagReset, user, messageResetPassword);
		}
	}
	validateFlagReset(flagReset: boolean, user: IMainUser, messageResetPassword: string) {
		if (flagReset === false) {
			if (user.token.split('/').length > 1 && user.token.split("/")[1] === "BLOCKED") {
				this.blockUI.stop();
				Swal.fire({
					icon: "info",
					text: "Su usuario se encuentra bloqueado por un periodo de " + user.token.split("/")[2] + " minutos. No podrá ingresar a la web hasta que el tiempo establecido se cumpla."
				})
				localStorage.clear();
				this.loginFormReactive.email.setValue("");
				this.loginFormReactive.password.setValue("");
				this.loginFormReactive.captcha.setValue("");
			} else {
				this.getAllRolesByUser(user.id);
				this.userObject = null;
			}
		}
		if (flagReset === true) {
			this.blockUI.stop();
			this.showSweetAlertChangePassword(messageResetPassword);
		}
	}
	executeLogin(json: any): void {
		this.auth.login(json).toPromise().then(
			(resp) => {
				this.userObject = resp;
				if (this.userObject !== null) {
					this.auth.postFakeLogin(json["user"], json["password"]).toPromise().then(
						(fake) => {
							if (fake !== null) {
								this.responseExecuteLogin(this.userObject);
							} else {
								this.blockUI.stop();
							}
						}
					)
				}

			},
			(error) => {
				this.errorExecuteLogin(error);
			}
		);
	}
	errorExecuteLogin(error: any) {
		this.blockUI.stop();
		this.router.navigate(['/login-flow']);
		if (Number(error.status) === Number(500) || Number(error.status) === Number(400)) {
			Swal.fire({
				icon: 'error',
				text: 'Acaba de ocurrir un error. Por favor, verifique que su usuario o contraseña sean los correctos. Caso contrario, no podra ingresar a la web.'
			});
		}
		if (Number(error.status) === Number(404)) {
			Swal.fire({
				icon: 'info',
				text: "Las credenciales ingresadas, no existen en nuestro sistema. Por favor ingresar las correctas."
			});
		}


	}
	responseExecuteLogin(user: IMainUser) {
		localStorage.setItem('user', JSON.stringify(user));
		if (user !== null) {
			this.executeTermsAndConditionService(user);
		}
	}
	login(mail: any, pass: any): void {
		localStorage.clear();
		this.blockUI.start('Verificando cuenta de usuario...');
		this.userPass = this.auth.encrypt(pass);
		const json = {
			device: {
				model: this.device.device === 'unknown' ? 'Desktop' : this.device.device,
				os: this.device.os,
				token: this.device.browser,
				type: 'browser',
				version: this.device.os_version + '/' + this.device.browser_version
			},
			password: this.userPass,
			user: mail
		};
		let status = this.showVerifyLogin(mail, pass);
		if (status === 0) {
			this.executeLogin(json);
		} else {
			Swal.fire({
				icon: 'error',
				text: this.message
			});
		}

	}

	addPermissionWeb(resp: any) {
		this.permission = resp;
		let entitlementObject: IViewModule;
		this.permission.forEach((element) => {
			element.entitlement.forEach((element2) => {
				if (!this.entitlement.some((item) => item.id === element2.id)) {
					entitlementObject = {
						id: element2.id,
						description: element2.description,
						action: element2.action,
						manageableAsset: [],
						platform: "Web Admin"
					};
					this.entitlement.push(entitlementObject);
					this.ref.detectChanges();
				}
			});
		});

		this.permission.forEach(per => {
			per.entitlement.forEach(entli => {
				this.entitlement.forEach(element => {
					if (entli.id === element.id) {
						entli.manageableAsset.forEach(mana => {
							/* console.log("INCLUDE") */
							if (mana.href !== null) {
								mana.action = "";
								element.manageableAsset.push(mana);
							}
						})
					}
				});
			});
		});
		let repeat = {}
		this.entitlement.forEach(element => {
			element.manageableAsset = element.manageableAsset.filter(o => repeat[o.id] ? false : repeat[o.id] = true);
		})
		// change menu name
		this.entitlement.forEach(entli => {
			entli.manageableAsset.forEach(mng => {
				/* Terceros */
				if (mng.entityType === "3ROS_HOME") {
					mng.entityType = "HOME"
				}
				if (mng.entityType === "3ROS_FORM") {
					mng.entityType = "GENERAR PASE"
				}
				if (mng.entityType === "3ROS_PASS") {
					mng.entityType = "VER PASE"
				}
				if (mng.entityType === "3ROS_SYMP") {
					mng.entityType = "REPORTAR SÍNTOMAS"
				}
				if (mng.entityType === "3ROS_ADMIN") {
					mng.entityType = "ADMINISTRACIÓN"
				}
				if (mng.entityType === "3ROS_REPO") {
					mng.entityType = "REPORTERIA"
				}
				if (mng.entityType === "3ROS_TDPADM") {
					mng.entityType = "ADMINISTRACIÓN"
				}
				if (mng.entityType === "3ROS_SECU") {
					mng.entityType = "REGISTRAR ASISTENCIA"
				}
				/* CORONAVIRUS */
				if (mng.entityType === "CORONA_HOME") {
					mng.entityType = "FORMULARIO DE SALUD"
				}
				if (mng.entityType === "CORONA_ADMIN") {
					mng.entityType = "ADMINISTRACIÓN"
				}
				if (mng.entityType === "CORONA_CHECKING") {
					mng.entityType = "ASISTENCIA"
				}
				/* MENSAJERIA */
				if (mng.entityType === "MSG_SEND") {
					mng.entityType = "MENSAJERIA"
				}
				if (mng.entityType === "MSG_REPO") {
					mng.entityType = "HISTORIAL"
				}
				/* GENERACION DE DOCUMENTO */
				if (mng.entityType === "DOC_GEN") {
					mng.entityType = "DOCUMENTOS"
				}
				if (mng.entityType === "DOC_STATUS") {
					mng.entityType = "HISTORIAL"
				}
				/* EMBAJADOR */
				
				if (mng.entityType === "EMB_HOME") {
					mng.entityType = "HOME"
				}
				if (mng.entityType === "EMB_MANT") {
					mng.entityType = "MANTENIMIENTO"
				}
				if (mng.entityType === "EMB_EST") {
					mng.entityType = "ESTADISTICAS"
				}
				if (mng.entityType === "EMB_MOV_TOTAL") {
					mng.entityType = "MOVISTAR TOTAL"
				}
				if (mng.entityType === "EMB_HOG") {
					mng.entityType = "HOGAR"
				}
				if (mng.entityType === "EMB_HELP") {
					mng.entityType = "YO TE AYUDO"
				}
				if (mng.entityType === "EMB_MOV") {
					mng.entityType = "MOVIL"
				}
				
			})
		})
		this.blockUI.stop();
		if (this.permission !== null) {
			/* console.log("GO HOME") */
			localStorage.setItem('modules', JSON.stringify(this.entitlement));
			this.router.navigate(['']);
		} else {
			this.router.navigate(['/login-flow']);
		}

	}

	getAllRolesByUser(userId: string): void {
		this.auth.getRolesByUser(userId).toPromise().then(
			(resp) => {
				localStorage.setItem("permission", JSON.stringify(resp));
				this.addPermissionWeb(resp);
			},
			(error) => {
				this.router.navigate(['/login-flow']);
				this.blockUI.stop();
			}
		);
	}

	showChangePassword(user: IMainUser, condition: any) {
		const dialogRef = this.dialog.open(ChangePasswordComponent, {
			maxWidth: '70vw',
			maxHeight: '75vh',
			height: '50%',
			width: '75%',
			disableClose: true,
			data: {
				userData: user,
				condition: condition
			}
		});
		dialogRef.afterClosed().subscribe(() => {
			this.flagReset = false;
			localStorage.clear();
		})
	}

	httpMessage(status: number) {
		if (Number(status) === Number(404)) {
			return 'El usuario ingresado no existe. La operación fue cancelada.';
		}
		if (Number(status) === Number(400)) {
			return 'El usuario ingresado es incorrecto. La operación fue cancelada.';
		}
		if (Number(status) === Number(500)) {
			return 'Error. Se presentaron problemas al ejecutar la su petición. Por favor comunicar al area encargada sobre el problema presentado.';
		}
	}

	executeGetCodeGenerate() {
		if (this.loginFormReactive.email.value === '') {
			Swal.fire({
				icon: 'info',
				text:
					'Necesita colocar su usuario para poder solicitar el reseteo de su contraseña.'
			});
		} else {
			const json = {
				sendToEmail: true,
				typeValidate: 'email',
				user: this.loginFormReactive.email.value
			};
			this.auth.getCodeGenerate(json).toPromise().then(
				(resp) => {
					this.responseGetCodeGenerate(resp);
				},
				(error: HttpErrorResponse) => {

					this.errorGetCodeGenerate(error.status, error.statusText);
				}
			);
		}
	}
	errorGetCodeGenerate(errorStatus, errorMessage) {
		this.blockUI.stop();
		Swal.fire({
			icon: 'error',
			text: this.httpMessage(errorStatus)
		});
	}
	responseGetCodeGenerate(resp: any) {
		if (resp['message'] === 'OK') {
			this.blockUI.stop();
		}
		Swal.fire({
			icon: 'success',
			text: "Se envió un mensaje de confirmación a tu correo electrónico. Por favor, revisa tu bandeja."
		}).then(resp => {
			if (!resp.dismiss) {
				this.showAccessCode();
			}
		});
	}
	showAccessCode() {
		const dialogRef = this.dialog.open(AccessCodeComponent, {
			minWidth: '190px',
			maxHeight: '75vh',
			width: '400px',
			disableClose: true
		});
		dialogRef.afterClosed().subscribe((resp) => {
			this.loginFormReactive.email.reset();
			this.loginFormReactive.password.reset();
			this.loginFormReactive.captcha.setValue("");
			this.showResetPassword(0);
		});
	}

	// probando codigo captcha
	public resolved(captchaResponse: string): void {
		this.loginFormReactive.captcha.setValue(captchaResponse);
	  }
	
	  public onError(errorDetails: RecaptchaErrorParameters): void {
		console.log(`reCAPTCHA error encountered; details:`, errorDetails);
		Swal.fire({ 
			icon:"error",
			text: "" + errorDetails		})
	  }
}
