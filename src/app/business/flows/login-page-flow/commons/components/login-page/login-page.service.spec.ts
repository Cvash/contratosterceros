import { TestBed, ComponentFixture } from "@angular/core/testing";
import { LoginPageComponent } from './login-page.component';
import { LoginPageService } from './login-page.service';
import { TDPLocalStorageService } from '@tdp/ng-commons';
import { AuthServiceService } from '../../../../../../commons/services/auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DeviceDetectorService } from 'ngx-device-detector';

describe('LoginPageService', () => {
	let service: LoginPageService;
	let fixture: ComponentFixture<LoginPageComponent>;
	let component: LoginPageComponent;
	beforeEach(() => {
	 	TestBed.configureTestingModule({
	 		schemas: [CUSTOM_ELEMENTS_SCHEMA],
	 		imports: [HttpClientTestingModule, RouterTestingModule],
	 		declarations: [LoginPageComponent],
	 		providers: [
				DeviceDetectorService,
	 			AuthServiceService,
	 			TDPLocalStorageService,
	 			{
	 				provide: MatDialog,
	 				useValue: {}
	 			}
	 		]
		}).compileComponents();
	 	fixture = TestBed.createComponent(LoginPageComponent);
	 	component = fixture.componentInstance;
	 	service = TestBed.inject(LoginPageService);
	 });
	 it('should create service', () => {
		expect(service).toBeTruthy();
	});
});
