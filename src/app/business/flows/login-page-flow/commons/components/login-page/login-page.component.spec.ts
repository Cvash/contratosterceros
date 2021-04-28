import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import {
	MatDialog,
	MatDialogModule,
	MatDialogRef,
	MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { TDPLocalStorageService } from '@tdp/ng-commons';
import { DeviceDetectorService } from 'ngx-device-detector';
import { of } from 'rxjs';
import { LoaderSubjectService } from '../../../../../../commons/components/loader/commons/services/loader-subject.service';
import { LoginPageFormPresenter } from './commons/services/login-page-presenter';
import { LoginPageComponent } from './login-page.component';
import { LoginPageService } from './login-page.service';
import { BlockUIModule } from 'ng-block-ui';
import { IMainUser } from '../../../../../../business/models/IModel-module';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { RecaptchaErrorParameters } from 'ng-recaptcha';
describe(LoginPageComponent.name, () => {
	let component: LoginPageComponent;
	const routerMock = {
		navigate: jasmine.createSpy("navigate")
	}
	let fixture: ComponentFixture<LoginPageComponent>;
	let dialog: MatDialog;
	let router: Router;
	class MdDialogMock {
		open() {
			return {
				afterClosed: () => of({ condition: true, name: 'some object' })
			};
		}
	}
	class sweetMock {
		fire() {
			return {
				then: () => of({ name: "any value" })
			}
		}
	}
	beforeEach(() => {
		TestBed.configureTestingModule({
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			imports: [HttpClientTestingModule, RouterTestingModule, MatDialogModule],
			providers: [
				BlockUIModule,
				TDPLocalStorageService,
				LoaderSubjectService,
				LoginPageFormPresenter,
				LoginPageService,
				DeviceDetectorService,
				{ provide: MAT_DIALOG_DATA, useValue: {} },
				{ provide: MatDialogRef, useValue: {} },
				{
					provide: MatDialog,
					useClass: MdDialogMock //This is the key line
				},
				{
					provide: Swal,
					useClass: sweetMock //This is the key line
				}, 
				{
					provide: Router,
					useValue: routerMock
				}
			],
			declarations: [LoginPageComponent]
		});
	});
	beforeEach(() => {
		fixture = TestBed.createComponent(LoginPageComponent);
		component = fixture.componentInstance;
		dialog = TestBed.inject(MatDialog);
		router = TestBed.inject(Router);
		spyOn(dialog, 'open').and.callThrough();
		spyOn(Swal, "fire").and.callThrough();
	});
	afterEach(() => {
		localStorage.clear();
	})
	it('component created', () => {
		expect(component).toBeTruthy();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('when logoReset and messageResetPassword is not null', () => {
		component.ngOnInit();
		expect(component.logoReset).toEqual('../../../../../../assets/images/reset.png');
		expect(component.messageResetPassword).toEqual("");
	});
	it('when init variable and no execute ngOnInit', () => {
		expect(component.userPass).toBeUndefined();
		expect(component.logoReset).toBeUndefined();
		expect(component.message).toBeUndefined();
		expect(component.device).not.toEqual(null);
		expect(component.isLoginTerms).toBeUndefined();
		expect(component.flagReset).toBeUndefined();
		expect(component.userObject).toBeUndefined();
		expect(component.showPassword).toBeUndefined();
		expect(component.messageResetPassword).toBeUndefined();
	})
	it('when size logoReset is greater 0, is not null, is not ""', () => {
		component.ngOnInit();
		expect(String(component.logoReset).length).toBeGreaterThan(0);
		expect(String(component.logoReset).length).not.toEqual(0);
		expect(String(component.logoReset).length).not.toEqual(null);
	});
	it('when showPassword is true, is not null, is not ""', () => {
		component.ngOnInit();
		expect(component.showPassword).not.toEqual('');
		expect(component.showPassword).not.toEqual(null);
		expect(component.showPassword).toEqual(true);
	});

	it('when showPassword is not null, is true, is different false', () => {
		component.ngOnInit();
		expect(component.showPassword).toEqual(true);
		expect(component.showPassword).not.toEqual(false);
		expect(component.showPassword).not.toEqual(null);
	});

	it('when isLoginTerms is null, is not null, is not true or false', () => {
		component.ngOnInit();
		expect(component.isLoginTerms).toEqual(null);
		expect(component.isLoginTerms).not.toEqual(false);
		expect(component.isLoginTerms).not.toEqual(true);
	});

	it('when userObject is not null', async(() => {
		console.log('*********');
		component.getAllRolesByUser("2955");
		expect(component.permission).toBeUndefined();
	}));
	it('when open dialog and return afterClose', () => {
		component.showAccessCode();
		expect(dialog.open).toHaveBeenCalled();
	});

	it('when execute dialog showChangePassword', () => {
		let user: IMainUser;
		user = { "id": "2955", "href": "/user/2955", "token": "abb4d410-b92d-4157-ad52-0b307be20e48", "pass": "sdasdasda", "relatedParty": { "id": "3027", "href": "/employee/3027", "name": "JOAO JOSUE / HERNANDEZ / GODOY", "email": "joao.hernandezgo@telefonica.com", "description": "Employee", "legalId": [{ "country": "49", "legalEntity": "0055", "nationalIDType": "DNI", "nationalID": "73078273" }] }, "role": [{ "id": "11", "href": "/role/7046", "description": "ELE2_USER" }, { "id": "17", "href": "/role/14482", "description": "CORONA_USER" }, { "id": "18", "href": "/role/20551", "description": "CORONA_READ_QR" }, { "id": "16", "href": "/role/21178", "description": "CORONA_ADMIN" }, { "id": "40", "href": "/role/21192", "description": "CORONA_ADMIN_VNZ" }, { "id": "26", "href": "/role/24370", "description": "TER_TDPMNG" }, { "id": "52", "href": "/role/24381", "description": "TER_ADMIN" }, { "id": "65", "href": "/role/28596", "description": "USER_CAM" }, { "id": "60", "href": "/role/28597", "description": "USER_TDP" }, { "id": "62", "href": "/role/42933", "description": "USER_PERU" }, { "id": "65", "href": "/role/42934", "description": "USER_CAM" }, { "id": "60", "href": "/role/42935", "description": "USER_TDP" }, { "id": "65", "href": "/role/59766", "description": "USER_CAM" }, { "id": "62", "href": "/role/59767", "description": "USER_PERU" }, { "id": "60", "href": "/role/59768", "description": "USER_TDP" }, { "id": "65", "href": "/role/76599", "description": "USER_CAM" }, { "id": "62", "href": "/role/76600", "description": "USER_PERU" }, { "id": "60", "href": "/role/76601", "description": "USER_TDP" }, { "id": "62", "href": "/role/91330", "description": "USER_PERU" }, { "id": "60", "href": "/role/91331", "description": "USER_TDP" }, { "id": "68", "href": "/role/99604", "description": "SURVEY_ADMIN" }, { "id": "68", "href": "/role/99605", "description": "SURVEY_ADMIN" }, { "id": "66", "href": "/role/99606", "description": "BEN_ADMIN" }] }

		component.showChangePassword(user, 1);
		expect(dialog.open).toHaveBeenCalled();
		expect(dialog.open).toHaveBeenCalledTimes(1);

	})

	it('when execute dialog showDialogTermsCondition', () => {
		let user: IMainUser;
		user = { "id": "2955", "href": "/user/2955", "token": "abb4d410-b92d-4157-ad52-0b307be20e48", "pass": "sdasdasda", "relatedParty": { "id": "3027", "href": "/employee/3027", "name": "JOAO JOSUE / HERNANDEZ / GODOY", "email": "joao.hernandezgo@telefonica.com", "description": "Employee", "legalId": [{ "country": "49", "legalEntity": "0055", "nationalIDType": "DNI", "nationalID": "73078273" }] }, "role": [{ "id": "11", "href": "/role/7046", "description": "ELE2_USER" }, { "id": "17", "href": "/role/14482", "description": "CORONA_USER" }, { "id": "18", "href": "/role/20551", "description": "CORONA_READ_QR" }, { "id": "16", "href": "/role/21178", "description": "CORONA_ADMIN" }, { "id": "40", "href": "/role/21192", "description": "CORONA_ADMIN_VNZ" }, { "id": "26", "href": "/role/24370", "description": "TER_TDPMNG" }, { "id": "52", "href": "/role/24381", "description": "TER_ADMIN" }, { "id": "65", "href": "/role/28596", "description": "USER_CAM" }, { "id": "60", "href": "/role/28597", "description": "USER_TDP" }, { "id": "62", "href": "/role/42933", "description": "USER_PERU" }, { "id": "65", "href": "/role/42934", "description": "USER_CAM" }, { "id": "60", "href": "/role/42935", "description": "USER_TDP" }, { "id": "65", "href": "/role/59766", "description": "USER_CAM" }, { "id": "62", "href": "/role/59767", "description": "USER_PERU" }, { "id": "60", "href": "/role/59768", "description": "USER_TDP" }, { "id": "65", "href": "/role/76599", "description": "USER_CAM" }, { "id": "62", "href": "/role/76600", "description": "USER_PERU" }, { "id": "60", "href": "/role/76601", "description": "USER_TDP" }, { "id": "62", "href": "/role/91330", "description": "USER_PERU" }, { "id": "60", "href": "/role/91331", "description": "USER_TDP" }, { "id": "68", "href": "/role/99604", "description": "SURVEY_ADMIN" }, { "id": "68", "href": "/role/99605", "description": "SURVEY_ADMIN" }, { "id": "66", "href": "/role/99606", "description": "BEN_ADMIN" }] }

		component.showDialogTermsCondition(user);
		expect(dialog.open).toHaveBeenCalled();
		expect(dialog.open).toHaveBeenCalledTimes(1);
	})

	it('when execute httpMessage by http status', () => {
		component.ngOnInit();
		expect(component.httpMessage(400)).toContain('La operación fue cancelada.');
		component.ngOnInit();
		expect(component.httpMessage(404)).toContain('La operación fue cancelada.');
		component.ngOnInit();
		expect(component.httpMessage(500)).toContain('Por favor comunicar al area encargada');
	});

	it('when execute showVerifyLogin and response status,message and conditions', () => {
		let user = "HOLA";
		let password: "HOLA2";
		let status = 0;
		component.loginFormReactive.captcha.setValue("dasdasdasdasd");
		status = component.showVerifyLogin(user, password);
		expect(status).toEqual(0);
		expect(status).not.toBeUndefined();
		expect(status).not.toEqual(null);
		expect(component.message).toMatch("")

		status = component.showVerifyLogin("", "");
		expect(status).toEqual(1);
		expect(status).not.toBeUndefined();
		expect(status).not.toEqual(null);
		expect(component.message).toContain("Por favor, completar los datos del formulario");

		status = component.showVerifyLogin(user, "");
		expect(status).toEqual(1);
		expect(status).not.toBeUndefined();
		expect(status).not.toEqual(null);
		expect(component.message).toContain("Error, la contraseña ingresada es incorrecta");

		status = component.showVerifyLogin("", password);
		expect(status).toEqual(1);
		expect(status).not.toBeUndefined();
		expect(status).not.toEqual(null);
		expect(component.message).toContain("Error, el nombre del usuario es incorrecto");
	})

	it('when execute Swal Fire and show change password', fakeAsync(() => {
		component.showSweetAlertChangePassword("test");
		expect(Swal.fire).toHaveBeenCalled();
		expect(Swal.fire).toHaveBeenCalledTimes(1);
		flush();
		fixture.detectChanges();
	}))

	it('when execute executeTermsAndConditionService() and include getAllRolesByUser or showSweetAlertChangePassword', fakeAsync(() => {
		let spyTerms = spyOn(component, "executeTermsAndConditionService").and.callThrough();
		let spyPermission = spyOn(component, "getAllRolesByUser").withArgs("2955").and.callThrough();
		let user: IMainUser;
		user = { "id": "2955", "href": "/user/2955", "token": "abb4d410-b92d-4157-ad52-0b307be20e48", "pass": "sdasdasda", "relatedParty": { "id": "3027", "href": "/employee/3027", "name": "JOAO JOSUE / HERNANDEZ / GODOY", "email": "joao.hernandezgo@telefonica.com", "description": "Employee", "legalId": [{ "country": "49", "legalEntity": "0055", "nationalIDType": "DNI", "nationalID": "73078273" }] }, "role": [{ "id": "11", "href": "/role/7046", "description": "ELE2_USER" }, { "id": "17", "href": "/role/14482", "description": "CORONA_USER" }, { "id": "18", "href": "/role/20551", "description": "CORONA_READ_QR" }, { "id": "16", "href": "/role/21178", "description": "CORONA_ADMIN" }, { "id": "40", "href": "/role/21192", "description": "CORONA_ADMIN_VNZ" }, { "id": "26", "href": "/role/24370", "description": "TER_TDPMNG" }, { "id": "52", "href": "/role/24381", "description": "TER_ADMIN" }, { "id": "65", "href": "/role/28596", "description": "USER_CAM" }, { "id": "60", "href": "/role/28597", "description": "USER_TDP" }, { "id": "62", "href": "/role/42933", "description": "USER_PERU" }, { "id": "65", "href": "/role/42934", "description": "USER_CAM" }, { "id": "60", "href": "/role/42935", "description": "USER_TDP" }, { "id": "65", "href": "/role/59766", "description": "USER_CAM" }, { "id": "62", "href": "/role/59767", "description": "USER_PERU" }, { "id": "60", "href": "/role/59768", "description": "USER_TDP" }, { "id": "65", "href": "/role/76599", "description": "USER_CAM" }, { "id": "62", "href": "/role/76600", "description": "USER_PERU" }, { "id": "60", "href": "/role/76601", "description": "USER_TDP" }, { "id": "62", "href": "/role/91330", "description": "USER_PERU" }, { "id": "60", "href": "/role/91331", "description": "USER_TDP" }, { "id": "68", "href": "/role/99604", "description": "SURVEY_ADMIN" }, { "id": "68", "href": "/role/99605", "description": "SURVEY_ADMIN" }, { "id": "66", "href": "/role/99606", "description": "BEN_ADMIN" }] }

		component.termsId = 1;
		component.userObject = user;
		component.executeTermsAndConditionService(user);
		expect(spyTerms).toHaveBeenCalled()
		flush();
		component.getAllRolesByUser("2955");
		expect(spyPermission).toHaveBeenCalled();
		flush();
		component.showDialogTermsCondition(user);
		expect(dialog.open).toHaveBeenCalled();
		flush();
	}))


	it('when execute addPermissionWeb', () => {
		const module: any = [
			{
				"id": "17",
				"href": "/HRManagement/usersandroles/v1/role/17",
				"involvementRole": "CORONA_USER",
				"relatedEntity": [],
				"entitlement": [
					{
						"id": "7",
						"description": "CORONAVIRUS",
						"platform": "App Web",
						"action": "coronavirus$fa fa-user-md",
						"manageableAsset": [
							{
								"id": "28",
								"href": "/coronavirus/home",
								"reference": null,
								"entityType": "CORONA_HOME",
								"action": "R",
								"startDate": "2020-10-21T18:11:35",
								"endDate": null
							}
						]
					}
				]
			},
			{
				"id": "18",
				"href": "/HRManagement/usersandroles/v1/role/18",
				"involvementRole": "CORONA_READ_QR",
				"relatedEntity": [],
				"entitlement": [
					{
						"id": "7",
						"description": "CORONAVIRUS",
						"platform": "App Web",
						"action": "coronavirus$fa fa-user-md",
						"manageableAsset": [
							{
								"id": "33",
								"href": "/coronavirus/readingQr",
								"reference": null,
								"entityType": "CORONA_QR",
								"action": "R",
								"startDate": "2020-10-21T18:11:35",
								"endDate": null
							}
						]
					}
				]
			},
			{
				"id": "16",
				"href": "/HRManagement/usersandroles/v1/role/16",
				"involvementRole": "CORONA_ADMIN",
				"relatedEntity": [],
				"entitlement": [
					{
						"id": "7",
						"description": "CORONAVIRUS",
						"platform": "App Web",
						"action": "coronavirus$fa fa-user-md",
						"manageableAsset": [
							{
								"id": "29",
								"href": "/coronavirus/teams",
								"reference": null,
								"entityType": "CORONA_TEAM",
								"action": "R&W",
								"startDate": "2020-10-21T18:11:35",
								"endDate": null
							},
							{
								"id": "31",
								"href": "/coronavirus/admin",
								"reference": null,
								"entityType": "CORONA_ADMIN",
								"action": "R&W",
								"startDate": "2020-10-21T18:11:35",
								"endDate": null
							},
							{
								"id": "32",
								"href": "/coronavirus/checking",
								"reference": null,
								"entityType": "CORONA_CHECKING",
								"action": "R&W",
								"startDate": "2020-10-21T18:11:35",
								"endDate": null
							}
						]
					}
				]
			},
			{
				"id": "26",
				"href": "/HRManagement/usersandroles/v1/role/26",
				"involvementRole": "TER_TDPMNG",
				"relatedEntity": [],
				"entitlement": [
					{
						"id": "8",
						"description": "TERCEROS",
						"platform": "App Web",
						"action": "terceros$fa fa-users",
						"manageableAsset": [
							{
								"id": "42",
								"href": "/terceros/empresas",
								"reference": null,
								"entityType": "3ROS_TDPADM",
								"action": "R&W",
								"startDate": "2020-10-21T18:11:35",
								"endDate": null
							},
							{
								"id": "43",
								"href": "/terceros/report",
								"reference": null,
								"entityType": "3ROS_REPO",
								"action": "R&W",
								"startDate": "2020-10-21T18:11:35",
								"endDate": null
							}
						]
					}
				]
			},
			{
				"id": "52",
				"href": "/HRManagement/usersandroles/v1/role/52",
				"involvementRole": "TER_ADMIN",
				"relatedEntity": [],
				"entitlement": [
					{
						"id": "8",
						"description": "TERCEROS",
						"platform": "App Web",
						"action": "terceros$fa fa-users",
						"manageableAsset": [
							{
								"id": "43",
								"href": "/terceros/report",
								"reference": null,
								"entityType": "3ROS_REPO",
								"action": "R&W",
								"startDate": "2020-10-21T18:11:35",
								"endDate": null
							}
						]
					}
				]
			},
			{
				"id": "68",
				"href": "/HRManagement/usersandroles/v1/role/68",
				"involvementRole": "SURVEY_ADMIN",
				"relatedEntity": [],
				"entitlement": [
					{
						"id": "10",
						"description": "ENCUESTAS",
						"platform": "App Web",
						"action": "survey$far fa-address-book",
						"manageableAsset": [
							{
								"id": "49",
								"href": "/survey/home",
								"reference": null,
								"entityType": "Generar Encuesta",
								"action": "R&W",
								"startDate": "2020-10-22T14:21:51",
								"endDate": null
							},
							{
								"id": "50",
								"href": "/survey/config",
								"reference": null,
								"entityType": "Configurar Encuesta",
								"action": "R&W",
								"startDate": "2020-10-22T14:21:51",
								"endDate": null
							}
						]
					}
				]
			},
			{
				"id": "68",
				"href": "/HRManagement/usersandroles/v1/role/68",
				"involvementRole": "SURVEY_ADMIN",
				"relatedEntity": [],
				"entitlement": [
					{
						"id": "10",
						"description": "ENCUESTAS",
						"platform": "App Web",
						"action": "survey$far fa-address-book",
						"manageableAsset": [
							{
								"id": "49",
								"href": "/survey/home",
								"reference": null,
								"entityType": "Generar Encuesta",
								"action": "R&W",
								"startDate": "2020-10-22T14:21:51",
								"endDate": null
							},
							{
								"id": "50",
								"href": "/survey/config",
								"reference": null,
								"entityType": "Configurar Encuesta",
								"action": "R&W",
								"startDate": "2020-10-22T14:21:51",
								"endDate": null
							}
						]
					}
				]
			},
			{
				"id": "66",
				"href": "/HRManagement/usersandroles/v1/role/66",
				"involvementRole": "BEN_ADMIN",
				"relatedEntity": [],
				"entitlement": [
					{
						"id": "9",
						"description": "BENEFICIOS",
						"platform": "App Web",
						"action": "benefits$fas fa-gifts",
						"manageableAsset": [
							{
								"id": "45",
								"href": "/benefits/home",
								"reference": null,
								"entityType": "Beneficios",
								"action": "R",
								"startDate": "2020-10-21T18:11:35",
								"endDate": null
							},
							{
								"id": "46",
								"href": "/benefits/partner",
								"reference": null,
								"entityType": "Socios",
								"action": "R",
								"startDate": "2020-10-21T18:11:35",
								"endDate": null
							},
							{
								"id": "47",
								"href": "/benefits/analytics",
								"reference": null,
								"entityType": "Estadisticas",
								"action": "R",
								"startDate": "2020-10-21T18:11:35",
								"endDate": null
							},
							{
								"id": "48",
								"href": "/benefits/profile-partner",
								"reference": null,
								"entityType": "Empresa",
								"action": "R",
								"startDate": "2020-10-21T18:11:35",
								"endDate": null
							}
						]
					}
				]
			}
		];
		// load permission
		component.addPermissionWeb(module);
		expect(component.permission).not.toEqual(null);
		expect(component.permission.length).toBeGreaterThanOrEqual(0);

		expect(component.entitlement).not.toEqual(null);
		expect(component.entitlement.length).toBeGreaterThanOrEqual(0);

		let localStoragaModulo: any = JSON.parse(localStorage.getItem("modules"));
		expect(localStoragaModulo.length).not.toBeUndefined();

	})

	it('when execute example method', fakeAsync(() => {
		let user: IMainUser;
		user = { "id": "2955", "href": "/user/2955", "token": "abb4d410-b92d-4157-ad52-0b307be20e48", "pass": "sdasdasda", "relatedParty": { "id": "3027", "href": "/employee/3027", "name": "JOAO JOSUE / HERNANDEZ / GODOY", "email": "joao.hernandezgo@telefonica.com", "description": "Employee", "legalId": [{ "country": "49", "legalEntity": "0055", "nationalIDType": "DNI", "nationalID": "73078273" }] }, "role": [{ "id": "11", "href": "/role/7046", "description": "ELE2_USER" }, { "id": "17", "href": "/role/14482", "description": "CORONA_USER" }, { "id": "18", "href": "/role/20551", "description": "CORONA_READ_QR" }, { "id": "16", "href": "/role/21178", "description": "CORONA_ADMIN" }, { "id": "40", "href": "/role/21192", "description": "CORONA_ADMIN_VNZ" }, { "id": "26", "href": "/role/24370", "description": "TER_TDPMNG" }, { "id": "52", "href": "/role/24381", "description": "TER_ADMIN" }, { "id": "65", "href": "/role/28596", "description": "USER_CAM" }, { "id": "60", "href": "/role/28597", "description": "USER_TDP" }, { "id": "62", "href": "/role/42933", "description": "USER_PERU" }, { "id": "65", "href": "/role/42934", "description": "USER_CAM" }, { "id": "60", "href": "/role/42935", "description": "USER_TDP" }, { "id": "65", "href": "/role/59766", "description": "USER_CAM" }, { "id": "62", "href": "/role/59767", "description": "USER_PERU" }, { "id": "60", "href": "/role/59768", "description": "USER_TDP" }, { "id": "65", "href": "/role/76599", "description": "USER_CAM" }, { "id": "62", "href": "/role/76600", "description": "USER_PERU" }, { "id": "60", "href": "/role/76601", "description": "USER_TDP" }, { "id": "62", "href": "/role/91330", "description": "USER_PERU" }, { "id": "60", "href": "/role/91331", "description": "USER_TDP" }, { "id": "68", "href": "/role/99604", "description": "SURVEY_ADMIN" }, { "id": "68", "href": "/role/99605", "description": "SURVEY_ADMIN" }, { "id": "66", "href": "/role/99606", "description": "BEN_ADMIN" }] }
		let spyTermsCondition = spyOn(component, 'executeTermsAndConditionService').and.callThrough();
		component.termsId = 1;
		component.userObject = user;
		component.executeTermsAndConditionService(user);
		tick(3000);
		expect(spyTermsCondition).toHaveBeenCalled();

		user = { "id": "7727", "href": "/user/7727", "token": "abb4d410-b92d-4157-ad52-0b307be20e48", "pass": "sdasdasda", "relatedParty": { "id": "3027", "href": "", "name": "", "email": "joao.hernandezgo@telefonica.com", "description": "Employee", "legalId": [{ "country": "49", "legalEntity": "0055", "nationalIDType": "DNI", "nationalID": "73078273" }] }, "role": [{ "id": "11", "href": "/role/7046", "description": "ELE2_USER" }, { "id": "17", "href": "/role/14482", "description": "CORONA_USER" }, { "id": "18", "href": "/role/20551", "description": "CORONA_READ_QR" }, { "id": "16", "href": "/role/21178", "description": "CORONA_ADMIN" }, { "id": "40", "href": "/role/21192", "description": "CORONA_ADMIN_VNZ" }, { "id": "26", "href": "/role/24370", "description": "TER_TDPMNG" }, { "id": "52", "href": "/role/24381", "description": "TER_ADMIN" }, { "id": "65", "href": "/role/28596", "description": "USER_CAM" }, { "id": "60", "href": "/role/28597", "description": "USER_TDP" }, { "id": "62", "href": "/role/42933", "description": "USER_PERU" }, { "id": "65", "href": "/role/42934", "description": "USER_CAM" }, { "id": "60", "href": "/role/42935", "description": "USER_TDP" }, { "id": "65", "href": "/role/59766", "description": "USER_CAM" }, { "id": "62", "href": "/role/59767", "description": "USER_PERU" }, { "id": "60", "href": "/role/59768", "description": "USER_TDP" }, { "id": "65", "href": "/role/76599", "description": "USER_CAM" }, { "id": "62", "href": "/role/76600", "description": "USER_PERU" }, { "id": "60", "href": "/role/76601", "description": "USER_TDP" }, { "id": "62", "href": "/role/91330", "description": "USER_PERU" }, { "id": "60", "href": "/role/91331", "description": "USER_TDP" }, { "id": "68", "href": "/role/99604", "description": "SURVEY_ADMIN" }, { "id": "68", "href": "/role/99605", "description": "SURVEY_ADMIN" }, { "id": "66", "href": "/role/99606", "description": "BEN_ADMIN" }] }
		component.termsId = 1;
		component.userObject = user;
		component.executeTermsAndConditionService(user);
		tick(3000);
		expect(spyTermsCondition).toHaveBeenCalled();
		flush();
	}))

	it('when logoReset and messageResetPassword is not null', () => {
		component.ngOnInit();
		expect(component.logoReset).toEqual('../../../../../../assets/images/reset.png');
		expect(component.messageResetPassword).toEqual("");
	});
	it('when init variable and no execute ngOnInit', () => {
		expect(component.userPass).toBeUndefined();
		expect(component.logoReset).toBeUndefined();
		expect(component.message).toBeUndefined();
		expect(component.device).not.toEqual(null);
		expect(component.isLoginTerms).toBeUndefined();
		expect(component.flagReset).toBeUndefined();
		expect(component.userObject).toBeUndefined();
		expect(component.showPassword).toBeUndefined();
		expect(component.messageResetPassword).toBeUndefined();
	})
	it('when size logoReset is greater 0, is not null, is not ""', () => {
		let user: IMainUser;
		user = { "id": "2955", "href": "/user/2955", "token": "abb4d410-b92d-4157-ad52-0b307be20e48", "pass": "sdasdasda", "relatedParty": { "id": "3027", "href": "/employee/3027", "name": "JOAO JOSUE / HERNANDEZ / GODOY", "email": "joao.hernandezgo@telefonica.com", "description": "Employee", "legalId": [{ "country": "49", "legalEntity": "0055", "nationalIDType": "DNI", "nationalID": "73078273" }] }, "role": [{ "id": "11", "href": "/role/7046", "description": "ELE2_USER" }, { "id": "17", "href": "/role/14482", "description": "CORONA_USER" }, { "id": "18", "href": "/role/20551", "description": "CORONA_READ_QR" }, { "id": "16", "href": "/role/21178", "description": "CORONA_ADMIN" }, { "id": "40", "href": "/role/21192", "description": "CORONA_ADMIN_VNZ" }, { "id": "26", "href": "/role/24370", "description": "TER_TDPMNG" }, { "id": "52", "href": "/role/24381", "description": "TER_ADMIN" }, { "id": "65", "href": "/role/28596", "description": "USER_CAM" }, { "id": "60", "href": "/role/28597", "description": "USER_TDP" }, { "id": "62", "href": "/role/42933", "description": "USER_PERU" }, { "id": "65", "href": "/role/42934", "description": "USER_CAM" }, { "id": "60", "href": "/role/42935", "description": "USER_TDP" }, { "id": "65", "href": "/role/59766", "description": "USER_CAM" }, { "id": "62", "href": "/role/59767", "description": "USER_PERU" }, { "id": "60", "href": "/role/59768", "description": "USER_TDP" }, { "id": "65", "href": "/role/76599", "description": "USER_CAM" }, { "id": "62", "href": "/role/76600", "description": "USER_PERU" }, { "id": "60", "href": "/role/76601", "description": "USER_TDP" }, { "id": "62", "href": "/role/91330", "description": "USER_PERU" }, { "id": "60", "href": "/role/91331", "description": "USER_TDP" }, { "id": "68", "href": "/role/99604", "description": "SURVEY_ADMIN" }, { "id": "68", "href": "/role/99605", "description": "SURVEY_ADMIN" }, { "id": "66", "href": "/role/99606", "description": "BEN_ADMIN" }] }
		component.userObject = user;
		component.ngOnInit();
		expect(String(component.logoReset).length).toBeGreaterThan(0);
		expect(String(component.logoReset).length).not.toEqual(0);
		expect(String(component.logoReset).length).not.toEqual(null);
	});
	it('when showPassword is true, is not null, is not ""', () => {
		component.ngOnInit();
		expect(component.showPassword).not.toEqual('');
		expect(component.showPassword).not.toEqual(null);
		expect(component.showPassword).toEqual(true);
	});

	it('when showPassword is not null, is true, is different false', () => {
		component.ngOnInit();
		expect(component.showPassword).toEqual(true);
		expect(component.showPassword).not.toEqual(false);
		expect(component.showPassword).not.toEqual(null);
	});

	it('when isLoginTerms is null, is not null, is not true or false', () => {
		component.ngOnInit();
		expect(component.isLoginTerms).toEqual(null);
		expect(component.isLoginTerms).not.toEqual(false);
		expect(component.isLoginTerms).not.toEqual(true);
	});

	it('when userObject is not null', async(() => {
		console.log('*********');
		component.getAllRolesByUser("2955");
		expect(component.permission).toBeUndefined();
	}));
	it('when open dialog and return afterClose', () => {
		component.showAccessCode();
		expect(dialog.open).toHaveBeenCalled();
	});

	it('when execute dialog showChangePassword', () => {
		let user: IMainUser;
		user = { "id": "2955", "href": "/user/2955", "token": "abb4d410-b92d-4157-ad52-0b307be20e48", "pass": "sdasdasda", "relatedParty": { "id": "3027", "href": "/employee/3027", "name": "JOAO JOSUE / HERNANDEZ / GODOY", "email": "joao.hernandezgo@telefonica.com", "description": "Employee", "legalId": [{ "country": "49", "legalEntity": "0055", "nationalIDType": "DNI", "nationalID": "73078273" }] }, "role": [{ "id": "11", "href": "/role/7046", "description": "ELE2_USER" }, { "id": "17", "href": "/role/14482", "description": "CORONA_USER" }, { "id": "18", "href": "/role/20551", "description": "CORONA_READ_QR" }, { "id": "16", "href": "/role/21178", "description": "CORONA_ADMIN" }, { "id": "40", "href": "/role/21192", "description": "CORONA_ADMIN_VNZ" }, { "id": "26", "href": "/role/24370", "description": "TER_TDPMNG" }, { "id": "52", "href": "/role/24381", "description": "TER_ADMIN" }, { "id": "65", "href": "/role/28596", "description": "USER_CAM" }, { "id": "60", "href": "/role/28597", "description": "USER_TDP" }, { "id": "62", "href": "/role/42933", "description": "USER_PERU" }, { "id": "65", "href": "/role/42934", "description": "USER_CAM" }, { "id": "60", "href": "/role/42935", "description": "USER_TDP" }, { "id": "65", "href": "/role/59766", "description": "USER_CAM" }, { "id": "62", "href": "/role/59767", "description": "USER_PERU" }, { "id": "60", "href": "/role/59768", "description": "USER_TDP" }, { "id": "65", "href": "/role/76599", "description": "USER_CAM" }, { "id": "62", "href": "/role/76600", "description": "USER_PERU" }, { "id": "60", "href": "/role/76601", "description": "USER_TDP" }, { "id": "62", "href": "/role/91330", "description": "USER_PERU" }, { "id": "60", "href": "/role/91331", "description": "USER_TDP" }, { "id": "68", "href": "/role/99604", "description": "SURVEY_ADMIN" }, { "id": "68", "href": "/role/99605", "description": "SURVEY_ADMIN" }, { "id": "66", "href": "/role/99606", "description": "BEN_ADMIN" }] }

		component.showChangePassword(user, 1);
		expect(dialog.open).toHaveBeenCalled();
		expect(dialog.open).toHaveBeenCalledTimes(1);

	})

	it('when execute dialog showDialogTermsCondition', () => {
		let user: IMainUser;
		user = { "id": "2955", "href": "/user/2955", "token": "abb4d410-b92d-4157-ad52-0b307be20e48", "pass": "sdasdasda", "relatedParty": { "id": "3027", "href": "/employee/3027", "name": "JOAO JOSUE / HERNANDEZ / GODOY", "email": "joao.hernandezgo@telefonica.com", "description": "Employee", "legalId": [{ "country": "49", "legalEntity": "0055", "nationalIDType": "DNI", "nationalID": "73078273" }] }, "role": [{ "id": "11", "href": "/role/7046", "description": "ELE2_USER" }, { "id": "17", "href": "/role/14482", "description": "CORONA_USER" }, { "id": "18", "href": "/role/20551", "description": "CORONA_READ_QR" }, { "id": "16", "href": "/role/21178", "description": "CORONA_ADMIN" }, { "id": "40", "href": "/role/21192", "description": "CORONA_ADMIN_VNZ" }, { "id": "26", "href": "/role/24370", "description": "TER_TDPMNG" }, { "id": "52", "href": "/role/24381", "description": "TER_ADMIN" }, { "id": "65", "href": "/role/28596", "description": "USER_CAM" }, { "id": "60", "href": "/role/28597", "description": "USER_TDP" }, { "id": "62", "href": "/role/42933", "description": "USER_PERU" }, { "id": "65", "href": "/role/42934", "description": "USER_CAM" }, { "id": "60", "href": "/role/42935", "description": "USER_TDP" }, { "id": "65", "href": "/role/59766", "description": "USER_CAM" }, { "id": "62", "href": "/role/59767", "description": "USER_PERU" }, { "id": "60", "href": "/role/59768", "description": "USER_TDP" }, { "id": "65", "href": "/role/76599", "description": "USER_CAM" }, { "id": "62", "href": "/role/76600", "description": "USER_PERU" }, { "id": "60", "href": "/role/76601", "description": "USER_TDP" }, { "id": "62", "href": "/role/91330", "description": "USER_PERU" }, { "id": "60", "href": "/role/91331", "description": "USER_TDP" }, { "id": "68", "href": "/role/99604", "description": "SURVEY_ADMIN" }, { "id": "68", "href": "/role/99605", "description": "SURVEY_ADMIN" }, { "id": "66", "href": "/role/99606", "description": "BEN_ADMIN" }] }
		component.showDialogTermsCondition(user);
		expect(dialog.open).toHaveBeenCalled();
		expect(dialog.open).toHaveBeenCalledTimes(1);
	})

	it('when execute httpMessage by http status', () => {
		component.ngOnInit();
		expect(component.httpMessage(400)).toContain('La operación fue cancelada.');
		component.ngOnInit();
		expect(component.httpMessage(404)).toContain('La operación fue cancelada.');
		component.ngOnInit();
		expect(component.httpMessage(500)).toContain('Por favor comunicar al area encargada');
	});

	it('when execute showVerifyLogin and response status,message and conditions', () => {
		let user = "HOLA";
		let password: "HOLA2";
		component.loginFormReactive.captcha.setValue("asdasdasdas");
		let status = 0;
		status = component.showVerifyLogin(user, password);
		expect(status).toEqual(0);
		expect(status).not.toBeUndefined();
		expect(status).not.toEqual(null);
		expect(component.message).toMatch("")

		status = component.showVerifyLogin("", "");
		expect(status).toEqual(1);
		expect(status).not.toBeUndefined();
		expect(status).not.toEqual(null);
		expect(component.message).toContain("Por favor, completar los datos del formulario");

		status = component.showVerifyLogin(user, "");
		expect(status).toEqual(1);
		expect(status).not.toBeUndefined();
		expect(status).not.toEqual(null);
		expect(component.message).toContain("Error, la contraseña ingresada es incorrecta");

		status = component.showVerifyLogin("", password);
		expect(status).toEqual(1);
		expect(status).not.toBeUndefined();
		expect(status).not.toEqual(null);
		expect(component.message).toContain("Error, el nombre del usuario es incorrecto");
	})

	it('when execute Swal Fire and show change password', () => {
		component.showSweetAlertChangePassword("test");
		expect(Swal.fire).toHaveBeenCalled();
		expect(Swal.fire).toHaveBeenCalledTimes(1);
		fixture.detectChanges();
	})

	it('when execute executeTermsAndConditionService() and include getAllRolesByUser or showSweetAlertChangePassword', fakeAsync(() => {
		let spyTerms = spyOn(component, "executeTermsAndConditionService").and.callThrough();
		let spyPermission = spyOn(component, "getAllRolesByUser").withArgs("2955").and.callThrough();
		let user: IMainUser;
		user = { "id": "2955", "href": "/user/2955", "token": "abb4d410-b92d-4157-ad52-0b307be20e48", "pass": "sdasdasda", "relatedParty": { "id": "3027", "href": "/employee/3027", "name": "JOAO JOSUE / HERNANDEZ / GODOY", "email": "joao.hernandezgo@telefonica.com", "description": "Employee", "legalId": [{ "country": "49", "legalEntity": "0055", "nationalIDType": "DNI", "nationalID": "73078273" }] }, "role": [{ "id": "11", "href": "/role/7046", "description": "ELE2_USER" }, { "id": "17", "href": "/role/14482", "description": "CORONA_USER" }, { "id": "18", "href": "/role/20551", "description": "CORONA_READ_QR" }, { "id": "16", "href": "/role/21178", "description": "CORONA_ADMIN" }, { "id": "40", "href": "/role/21192", "description": "CORONA_ADMIN_VNZ" }, { "id": "26", "href": "/role/24370", "description": "TER_TDPMNG" }, { "id": "52", "href": "/role/24381", "description": "TER_ADMIN" }, { "id": "65", "href": "/role/28596", "description": "USER_CAM" }, { "id": "60", "href": "/role/28597", "description": "USER_TDP" }, { "id": "62", "href": "/role/42933", "description": "USER_PERU" }, { "id": "65", "href": "/role/42934", "description": "USER_CAM" }, { "id": "60", "href": "/role/42935", "description": "USER_TDP" }, { "id": "65", "href": "/role/59766", "description": "USER_CAM" }, { "id": "62", "href": "/role/59767", "description": "USER_PERU" }, { "id": "60", "href": "/role/59768", "description": "USER_TDP" }, { "id": "65", "href": "/role/76599", "description": "USER_CAM" }, { "id": "62", "href": "/role/76600", "description": "USER_PERU" }, { "id": "60", "href": "/role/76601", "description": "USER_TDP" }, { "id": "62", "href": "/role/91330", "description": "USER_PERU" }, { "id": "60", "href": "/role/91331", "description": "USER_TDP" }, { "id": "68", "href": "/role/99604", "description": "SURVEY_ADMIN" }, { "id": "68", "href": "/role/99605", "description": "SURVEY_ADMIN" }, { "id": "66", "href": "/role/99606", "description": "BEN_ADMIN" }] }
		component.termsId = 1;
		component.ngOnInit();
		component.executeTermsAndConditionService(user);
		expect(spyTerms).toHaveBeenCalled()
		flush();
		component.getAllRolesByUser("2955");
		expect(spyPermission).toHaveBeenCalled();
		flush();
		component.showDialogTermsCondition(user);
		expect(dialog.open).toHaveBeenCalled();
		flush();
	}))


	it('when execute addPermissionWeb', () => {
		const module: any = [
			{
				"id": "17",
				"href": "/HRManagement/usersandroles/v1/role/17",
				"involvementRole": "CORONA_USER",
				"relatedEntity": [],
				"entitlement": [
					{
						"id": "7",
						"description": "CORONAVIRUS",
						"platform": "App Web",
						"action": "coronavirus$fa fa-user-md",
						"manageableAsset": [
							{
								"id": "28",
								"href": "/coronavirus/home",
								"reference": null,
								"entityType": "CORONA_HOME",
								"action": "R",
								"startDate": "2020-10-21T18:11:35",
								"endDate": null
							}
						]
					}
				]
			},
			{
				"id": "18",
				"href": "/HRManagement/usersandroles/v1/role/18",
				"involvementRole": "CORONA_READ_QR",
				"relatedEntity": [],
				"entitlement": [
					{
						"id": "7",
						"description": "CORONAVIRUS",
						"platform": "App Web",
						"action": "coronavirus$fa fa-user-md",
						"manageableAsset": [
							{
								"id": "33",
								"href": "/coronavirus/readingQr",
								"reference": null,
								"entityType": "CORONA_QR",
								"action": "R",
								"startDate": "2020-10-21T18:11:35",
								"endDate": null
							}
						]
					}
				]
			},
			{
				"id": "16",
				"href": "/HRManagement/usersandroles/v1/role/16",
				"involvementRole": "CORONA_ADMIN",
				"relatedEntity": [],
				"entitlement": [
					{
						"id": "7",
						"description": "CORONAVIRUS",
						"platform": "App Web",
						"action": "coronavirus$fa fa-user-md",
						"manageableAsset": [
							{
								"id": "29",
								"href": "/coronavirus/teams",
								"reference": null,
								"entityType": "CORONA_TEAM",
								"action": "R&W",
								"startDate": "2020-10-21T18:11:35",
								"endDate": null
							},
							{
								"id": "31",
								"href": "/coronavirus/admin",
								"reference": null,
								"entityType": "CORONA_ADMIN",
								"action": "R&W",
								"startDate": "2020-10-21T18:11:35",
								"endDate": null
							},
							{
								"id": "32",
								"href": "/coronavirus/checking",
								"reference": null,
								"entityType": "CORONA_CHECKING",
								"action": "R&W",
								"startDate": "2020-10-21T18:11:35",
								"endDate": null
							}
						]
					}
				]
			},
			{
				"id": "26",
				"href": "/HRManagement/usersandroles/v1/role/26",
				"involvementRole": "TER_TDPMNG",
				"relatedEntity": [],
				"entitlement": [
					{
						"id": "8",
						"description": "TERCEROS",
						"platform": "App Web",
						"action": "terceros$fa fa-users",
						"manageableAsset": [
							{
								"id": "42",
								"href": "/terceros/empresas",
								"reference": null,
								"entityType": "3ROS_TDPADM",
								"action": "R&W",
								"startDate": "2020-10-21T18:11:35",
								"endDate": null
							},
							{
								"id": "43",
								"href": "/terceros/report",
								"reference": null,
								"entityType": "3ROS_REPO",
								"action": "R&W",
								"startDate": "2020-10-21T18:11:35",
								"endDate": null
							}
						]
					}
				]
			},
			{
				"id": "52",
				"href": "/HRManagement/usersandroles/v1/role/52",
				"involvementRole": "TER_ADMIN",
				"relatedEntity": [],
				"entitlement": [
					{
						"id": "8",
						"description": "TERCEROS",
						"platform": "App Web",
						"action": "terceros$fa fa-users",
						"manageableAsset": [
							{
								"id": "43",
								"href": "/terceros/report",
								"reference": null,
								"entityType": "3ROS_REPO",
								"action": "R&W",
								"startDate": "2020-10-21T18:11:35",
								"endDate": null
							}
						]
					}
				]
			},
			{
				"id": "68",
				"href": "/HRManagement/usersandroles/v1/role/68",
				"involvementRole": "SURVEY_ADMIN",
				"relatedEntity": [],
				"entitlement": [
					{
						"id": "10",
						"description": "ENCUESTAS",
						"platform": "App Web",
						"action": "survey$far fa-address-book",
						"manageableAsset": [
							{
								"id": "49",
								"href": "/survey/home",
								"reference": null,
								"entityType": "Generar Encuesta",
								"action": "R&W",
								"startDate": "2020-10-22T14:21:51",
								"endDate": null
							},
							{
								"id": "50",
								"href": "/survey/config",
								"reference": null,
								"entityType": "Configurar Encuesta",
								"action": "R&W",
								"startDate": "2020-10-22T14:21:51",
								"endDate": null
							}
						]
					}
				]
			},
			{
				"id": "68",
				"href": "/HRManagement/usersandroles/v1/role/68",
				"involvementRole": "SURVEY_ADMIN",
				"relatedEntity": [],
				"entitlement": [
					{
						"id": "10",
						"description": "ENCUESTAS",
						"platform": "App Web",
						"action": "survey$far fa-address-book",
						"manageableAsset": [
							{
								"id": "49",
								"href": "/survey/home",
								"reference": null,
								"entityType": "Generar Encuesta",
								"action": "R&W",
								"startDate": "2020-10-22T14:21:51",
								"endDate": null
							},
							{
								"id": "50",
								"href": "/survey/config",
								"reference": null,
								"entityType": "Configurar Encuesta",
								"action": "R&W",
								"startDate": "2020-10-22T14:21:51",
								"endDate": null
							}
						]
					}
				]
			},
			{
				"id": "66",
				"href": "/HRManagement/usersandroles/v1/role/66",
				"involvementRole": "BEN_ADMIN",
				"relatedEntity": [],
				"entitlement": [
					{
						"id": "9",
						"description": "BENEFICIOS",
						"platform": "App Web",
						"action": "benefits$fas fa-gifts",
						"manageableAsset": [
							{
								"id": "45",
								"href": "/benefits/home",
								"reference": null,
								"entityType": "Beneficios",
								"action": "R",
								"startDate": "2020-10-21T18:11:35",
								"endDate": null
							},
							{
								"id": "46",
								"href": "/benefits/partner",
								"reference": null,
								"entityType": "Socios",
								"action": "R",
								"startDate": "2020-10-21T18:11:35",
								"endDate": null
							},
							{
								"id": "47",
								"href": "/benefits/analytics",
								"reference": null,
								"entityType": "Estadisticas",
								"action": "R",
								"startDate": "2020-10-21T18:11:35",
								"endDate": null
							},
							{
								"id": "48",
								"href": "/benefits/profile-partner",
								"reference": null,
								"entityType": "Empresa",
								"action": "R",
								"startDate": "2020-10-21T18:11:35",
								"endDate": null
							}
						]
					}
				]
			}
		];
		// load permission
		component.addPermissionWeb(module);
		expect(component.permission).not.toEqual(null);
		expect(component.permission.length).toBeGreaterThanOrEqual(0);

		expect(component.entitlement).not.toEqual(null);
		expect(component.entitlement.length).toBeGreaterThanOrEqual(0);

		let localStoragaModulo: any = JSON.parse(localStorage.getItem("modules"));
		expect(localStoragaModulo.length).not.toBeUndefined();

	})

	it('when execute example method', fakeAsync(() => {
		let user: IMainUser;
		user = { "id": "2955", "href": "/user/2955", "token": "abb4d410-b92d-4157-ad52-0b307be20e48", "pass": "sdasdasda", "relatedParty": { "id": "3027", "href": "/employee/3027", "name": "JOAO JOSUE / HERNANDEZ / GODOY", "email": "joao.hernandezgo@telefonica.com", "description": "Employee", "legalId": [{ "country": "49", "legalEntity": "0055", "nationalIDType": "DNI", "nationalID": "73078273" }] }, "role": [{ "id": "11", "href": "/role/7046", "description": "ELE2_USER" }, { "id": "17", "href": "/role/14482", "description": "CORONA_USER" }, { "id": "18", "href": "/role/20551", "description": "CORONA_READ_QR" }, { "id": "16", "href": "/role/21178", "description": "CORONA_ADMIN" }, { "id": "40", "href": "/role/21192", "description": "CORONA_ADMIN_VNZ" }, { "id": "26", "href": "/role/24370", "description": "TER_TDPMNG" }, { "id": "52", "href": "/role/24381", "description": "TER_ADMIN" }, { "id": "65", "href": "/role/28596", "description": "USER_CAM" }, { "id": "60", "href": "/role/28597", "description": "USER_TDP" }, { "id": "62", "href": "/role/42933", "description": "USER_PERU" }, { "id": "65", "href": "/role/42934", "description": "USER_CAM" }, { "id": "60", "href": "/role/42935", "description": "USER_TDP" }, { "id": "65", "href": "/role/59766", "description": "USER_CAM" }, { "id": "62", "href": "/role/59767", "description": "USER_PERU" }, { "id": "60", "href": "/role/59768", "description": "USER_TDP" }, { "id": "65", "href": "/role/76599", "description": "USER_CAM" }, { "id": "62", "href": "/role/76600", "description": "USER_PERU" }, { "id": "60", "href": "/role/76601", "description": "USER_TDP" }, { "id": "62", "href": "/role/91330", "description": "USER_PERU" }, { "id": "60", "href": "/role/91331", "description": "USER_TDP" }, { "id": "68", "href": "/role/99604", "description": "SURVEY_ADMIN" }, { "id": "68", "href": "/role/99605", "description": "SURVEY_ADMIN" }, { "id": "66", "href": "/role/99606", "description": "BEN_ADMIN" }] }
		let spyTermsCondition = spyOn(component, 'executeTermsAndConditionService').and.callThrough();
		component.termsId = 1;
		component.userObject = user;
		component.executeTermsAndConditionService(user);
		tick(3000);
		expect(spyTermsCondition).toHaveBeenCalled();

		user = { "id": "7727", "href": "/user/7727", "token": "abb4d410-b92d-4157-ad52-0b307be20e48", "pass": "sdasdasda", "relatedParty": { "id": "3027", "href": "", "name": "", "email": "joao.hernandezgo@telefonica.com", "description": "Employee", "legalId": [{ "country": "49", "legalEntity": "0055", "nationalIDType": "DNI", "nationalID": "73078273" }] }, "role": [{ "id": "11", "href": "/role/7046", "description": "ELE2_USER" }, { "id": "17", "href": "/role/14482", "description": "CORONA_USER" }, { "id": "18", "href": "/role/20551", "description": "CORONA_READ_QR" }, { "id": "16", "href": "/role/21178", "description": "CORONA_ADMIN" }, { "id": "40", "href": "/role/21192", "description": "CORONA_ADMIN_VNZ" }, { "id": "26", "href": "/role/24370", "description": "TER_TDPMNG" }, { "id": "52", "href": "/role/24381", "description": "TER_ADMIN" }, { "id": "65", "href": "/role/28596", "description": "USER_CAM" }, { "id": "60", "href": "/role/28597", "description": "USER_TDP" }, { "id": "62", "href": "/role/42933", "description": "USER_PERU" }, { "id": "65", "href": "/role/42934", "description": "USER_CAM" }, { "id": "60", "href": "/role/42935", "description": "USER_TDP" }, { "id": "65", "href": "/role/59766", "description": "USER_CAM" }, { "id": "62", "href": "/role/59767", "description": "USER_PERU" }, { "id": "60", "href": "/role/59768", "description": "USER_TDP" }, { "id": "65", "href": "/role/76599", "description": "USER_CAM" }, { "id": "62", "href": "/role/76600", "description": "USER_PERU" }, { "id": "60", "href": "/role/76601", "description": "USER_TDP" }, { "id": "62", "href": "/role/91330", "description": "USER_PERU" }, { "id": "60", "href": "/role/91331", "description": "USER_TDP" }, { "id": "68", "href": "/role/99604", "description": "SURVEY_ADMIN" }, { "id": "68", "href": "/role/99605", "description": "SURVEY_ADMIN" }, { "id": "66", "href": "/role/99606", "description": "BEN_ADMIN" }] }
		component.termsId = 1;
		component.userObject = user;
		component.executeTermsAndConditionService(user);
		tick(3000);
		expect(spyTermsCondition).toHaveBeenCalled();
		flush();
	}))

	it('when execute showResetPassword', () => {
		component.showResetPassword(1);
		expect(component.showPassword).toEqual(false);
	})
	it('when exeucte responseSweetAlertChangePassword', fakeAsync(() => {
		let user: IMainUser;
		user = { "id": "2955", "href": "/user/2955", "token": "abb4d410-b92d-4157-ad52-0b307be20e48", "pass": "sdasdasda", "relatedParty": { "id": "3027", "href": "/employee/3027", "name": "JOAO JOSUE / HERNANDEZ / GODOY", "email": "joao.hernandezgo@telefonica.com", "description": "Employee", "legalId": [{ "country": "49", "legalEntity": "0055", "nationalIDType": "DNI", "nationalID": "73078273" }] }, "role": [{ "id": "11", "href": "/role/7046", "description": "ELE2_USER" }, { "id": "17", "href": "/role/14482", "description": "CORONA_USER" }, { "id": "18", "href": "/role/20551", "description": "CORONA_READ_QR" }, { "id": "16", "href": "/role/21178", "description": "CORONA_ADMIN" }, { "id": "40", "href": "/role/21192", "description": "CORONA_ADMIN_VNZ" }, { "id": "26", "href": "/role/24370", "description": "TER_TDPMNG" }, { "id": "52", "href": "/role/24381", "description": "TER_ADMIN" }, { "id": "65", "href": "/role/28596", "description": "USER_CAM" }, { "id": "60", "href": "/role/28597", "description": "USER_TDP" }, { "id": "62", "href": "/role/42933", "description": "USER_PERU" }, { "id": "65", "href": "/role/42934", "description": "USER_CAM" }, { "id": "60", "href": "/role/42935", "description": "USER_TDP" }, { "id": "65", "href": "/role/59766", "description": "USER_CAM" }, { "id": "62", "href": "/role/59767", "description": "USER_PERU" }, { "id": "60", "href": "/role/59768", "description": "USER_TDP" }, { "id": "65", "href": "/role/76599", "description": "USER_CAM" }, { "id": "62", "href": "/role/76600", "description": "USER_PERU" }, { "id": "60", "href": "/role/76601", "description": "USER_TDP" }, { "id": "62", "href": "/role/91330", "description": "USER_PERU" }, { "id": "60", "href": "/role/91331", "description": "USER_TDP" }, { "id": "68", "href": "/role/99604", "description": "SURVEY_ADMIN" }, { "id": "68", "href": "/role/99605", "description": "SURVEY_ADMIN" }, { "id": "66", "href": "/role/99606", "description": "BEN_ADMIN" }] }
		component.responseSweetAlertChangePassword(true, "", user);
		expect(dialog.open).toHaveBeenCalled();
	}))

	it('when execute responseSubTermsCondition', fakeAsync(() => {
		spyOn(component, 'getAllRolesByUser');
		let user: IMainUser;
		user = { "id": "2955", "href": "/user/2955", "token": "abb4d410-b92d-4157-ad52-0b307be20e48/R35", "pass": "sdasdasda", "relatedParty": { "id": "3027", "href": "/employee/3027", "name": "JOAO JOSUE / HERNANDEZ / GODOY", "email": "joao.hernandezgo@telefonica.com", "description": "Employee", "legalId": [{ "country": "49", "legalEntity": "0055", "nationalIDType": "DNI", "nationalID": "73078273" }] }, "role": [{ "id": "11", "href": "/role/7046", "description": "ELE2_USER" }, { "id": "17", "href": "/role/14482", "description": "CORONA_USER" }, { "id": "18", "href": "/role/20551", "description": "CORONA_READ_QR" }, { "id": "16", "href": "/role/21178", "description": "CORONA_ADMIN" }, { "id": "40", "href": "/role/21192", "description": "CORONA_ADMIN_VNZ" }, { "id": "26", "href": "/role/24370", "description": "TER_TDPMNG" }, { "id": "52", "href": "/role/24381", "description": "TER_ADMIN" }, { "id": "65", "href": "/role/28596", "description": "USER_CAM" }, { "id": "60", "href": "/role/28597", "description": "USER_TDP" }, { "id": "62", "href": "/role/42933", "description": "USER_PERU" }, { "id": "65", "href": "/role/42934", "description": "USER_CAM" }, { "id": "60", "href": "/role/42935", "description": "USER_TDP" }, { "id": "65", "href": "/role/59766", "description": "USER_CAM" }, { "id": "62", "href": "/role/59767", "description": "USER_PERU" }, { "id": "60", "href": "/role/59768", "description": "USER_TDP" }, { "id": "65", "href": "/role/76599", "description": "USER_CAM" }, { "id": "62", "href": "/role/76600", "description": "USER_PERU" }, { "id": "60", "href": "/role/76601", "description": "USER_TDP" }, { "id": "62", "href": "/role/91330", "description": "USER_PERU" }, { "id": "60", "href": "/role/91331", "description": "USER_TDP" }, { "id": "68", "href": "/role/99604", "description": "SURVEY_ADMIN" }, { "id": "68", "href": "/role/99605", "description": "SURVEY_ADMIN" }, { "id": "66", "href": "/role/99606", "description": "BEN_ADMIN" }] }
		component.responseSubTermsCondition(false, user);
		expect(dialog.open).toHaveBeenCalled();

		component.responseSubTermsCondition(true, user);
		expect(Swal.fire).toHaveBeenCalled();

		flush();
	}))
	it('when execute validateFlagReset', fakeAsync(() => {
		spyOn(component, 'getAllRolesByUser');
		let user: IMainUser;
		user = { "id": "2955", "href": "/user/2955", "token": "abb4d410-b92d-4157-ad52-0b307be20e48/R35", "pass": "sdasdasda", "relatedParty": { "id": "3027", "href": "/employee/3027", "name": "JOAO JOSUE / HERNANDEZ / GODOY", "email": "joao.hernandezgo@telefonica.com", "description": "Employee", "legalId": [{ "country": "49", "legalEntity": "0055", "nationalIDType": "DNI", "nationalID": "73078273" }] }, "role": [{ "id": "11", "href": "/role/7046", "description": "ELE2_USER" }, { "id": "17", "href": "/role/14482", "description": "CORONA_USER" }, { "id": "18", "href": "/role/20551", "description": "CORONA_READ_QR" }, { "id": "16", "href": "/role/21178", "description": "CORONA_ADMIN" }, { "id": "40", "href": "/role/21192", "description": "CORONA_ADMIN_VNZ" }, { "id": "26", "href": "/role/24370", "description": "TER_TDPMNG" }, { "id": "52", "href": "/role/24381", "description": "TER_ADMIN" }, { "id": "65", "href": "/role/28596", "description": "USER_CAM" }, { "id": "60", "href": "/role/28597", "description": "USER_TDP" }, { "id": "62", "href": "/role/42933", "description": "USER_PERU" }, { "id": "65", "href": "/role/42934", "description": "USER_CAM" }, { "id": "60", "href": "/role/42935", "description": "USER_TDP" }, { "id": "65", "href": "/role/59766", "description": "USER_CAM" }, { "id": "62", "href": "/role/59767", "description": "USER_PERU" }, { "id": "60", "href": "/role/59768", "description": "USER_TDP" }, { "id": "65", "href": "/role/76599", "description": "USER_CAM" }, { "id": "62", "href": "/role/76600", "description": "USER_PERU" }, { "id": "60", "href": "/role/76601", "description": "USER_TDP" }, { "id": "62", "href": "/role/91330", "description": "USER_PERU" }, { "id": "60", "href": "/role/91331", "description": "USER_TDP" }, { "id": "68", "href": "/role/99604", "description": "SURVEY_ADMIN" }, { "id": "68", "href": "/role/99605", "description": "SURVEY_ADMIN" }, { "id": "66", "href": "/role/99606", "description": "BEN_ADMIN" }] }

		component.validateFlagReset(false, user, "hola mundo");
		expect(component.userObject).toEqual(null);

		component.validateFlagReset(true, user, "iafsdfogbdof");
		expect(Swal.fire).toHaveBeenCalled();
		flush();
		// host name
		component.validateHostName("empresascolaboradoras.movistar.com.pe");
		expect(component.titleLogin).toContain("Empresas Colaboradoras");

		// errorExecuteLogin
		let error = {
			error: {
				"httpStatus": 500,
				"wildcards": ["HOLA"]
			},

		}
		component.errorExecuteLogin(error);
		expect(router.navigate).toHaveBeenCalled();
		expect(Swal.fire).toHaveBeenCalled();
		flush();
		error = {
			error: {
				"httpStatus": 400,
				"wildcards": ["HOLA"]
			},

		}
		component.errorExecuteLogin(error);
		expect(Swal.fire).toHaveBeenCalled();
		flush();
		error = {
			error: {
				"httpStatus": 404,
				"wildcards": ["HOLA"]
			},

		}
		component.errorExecuteLogin(error);
		expect(Swal.fire).toHaveBeenCalled();
		flush();
		// executeGetCodeGenerate()
		component.loginFormReactive.email.setValue("");
		tick(1000);
		component.executeGetCodeGenerate();
		expect(Swal.fire).toHaveBeenCalled();
		flush();
		const rpt = {
			"message": "OK"
		}
		component.responseGetCodeGenerate(rpt);
		expect(Swal.fire).toHaveBeenCalled();
		flush();

		component.errorGetCodeGenerate(404, "hola");
		expect(Swal.fire).toHaveBeenCalled();
		flush();

		let errorDetails: RecaptchaErrorParameters;
		component.onError(errorDetails);
		expect(Swal.fire).toHaveBeenCalled();
		flush();

		component.resolved("CODIGO CAPTCHA");
		expect(component.loginFormReactive.captcha.value).toContain("CODIGO");
	}));

	it('when execute errorExecuteLogin',fakeAsync(()=>{ 
		component.errorGetCodeGenerate(404,"");
		expect(Swal.fire).toHaveBeenCalled();
		flush();
	}))

	//lo dee abajo no se descomenta

	/* it('when execute errorExecuteLogin',fakeAsync(()=>{
		component.errorExecuteLogin();
		expect(router.navigate).toHaveBeenCalled();
		expect(Swal.fire).toHaveBeenCalled();
		flush();
	})) */

	/* it('when execute responseExecuteLogin',fakeAsync(()=>{
		let user:IMainUser;
		user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48/R35","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
		component.responseExecuteLogin(user);
	})) */
	/* it('when execute login',fakeAsync(()=>{
		spyOn(component,'executeLogin');
		const user="joao.hernandezgo@telefonica.com";
		const pass="Prueba01@";
		component.login(user,pass);
		expect(component.userPass).toMatch("asd");
	})) */
});
