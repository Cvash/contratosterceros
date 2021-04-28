import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TDPDirectivesModule } from '@tdp/ng-commons';
import { BlockUIModule } from 'ng-block-ui';
import { AccessCodeComponent } from './commons/components/access-code/access-code.component';
import { LoginPageComponent } from './commons/components/login-page/login-page.component';
import { TermsConditionsComponent } from './commons/components/terms-conditions/terms-conditions.component';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { LogoutComponent } from './commons/components/logout/logout.component';
import { RecaptchaFormsModule, RecaptchaModule, RECAPTCHA_LANGUAGE } from "ng-recaptcha";
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from "ng-recaptcha";
import * as Env from '../../../../environments/environment'
const DECLARATIONS = [LoginPageComponent];
const globalSettings: RecaptchaSettings = { siteKey : Env.environment.SECRET_KEY , theme:'light', size:'normal', badge:'bottomright'};
@NgModule({
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	declarations: [...DECLARATIONS, AccessCodeComponent, TermsConditionsComponent, LogoutComponent],
	imports: [
		BlockUIModule.forRoot({
			delayStart: 100,
			delayStop: 100
		}),
		MatCheckboxModule,
		MatCardModule,
		MatFormFieldModule,
		MatDialogModule,
		ReactiveFormsModule,
		FormsModule,
		CommonModule,
		TDPDirectivesModule,
		LoginPageRoutingModule,
		RecaptchaModule,RecaptchaFormsModule 
			],
	entryComponents: [AccessCodeComponent, TermsConditionsComponent],
	providers: [
		{
			provide: MatDialogRef,
			useValue: {}
		},
		{
			provide:RECAPTCHA_SETTINGS,
			useValue:globalSettings
		},
		{ 
			provide:RECAPTCHA_LANGUAGE,
			useValue:["es","en-GB","en"]
		}
	],
	exports: [...DECLARATIONS,LogoutComponent]
})
export class LoginPageFlowModule { }
