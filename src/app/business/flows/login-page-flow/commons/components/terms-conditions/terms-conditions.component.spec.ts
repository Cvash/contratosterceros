import { async, ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { TermsConditionsComponent } from './terms-conditions.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IMainUser } from '../../../../../../business/models/IModel-module';
import { AuthServiceService } from '../../../../../../commons/services/auth-service.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

describe('TermsConditionsComponent', () => {
	let component: TermsConditionsComponent;
	let fixture: ComponentFixture<TermsConditionsComponent>;
	let service:AuthServiceService
	class sweetMock{
		fire(){
			return {
				then:()=>of({
					name:"any value"
				})
			}
		}
	}
	const dialogMock = {
		close: () => { }
		};
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			declarations: [TermsConditionsComponent],
			imports: [HttpClientTestingModule, RouterTestingModule, MatDialogModule],
			providers:[ { provide: MAT_DIALOG_DATA, useValue: {} },
				{ provide: MatDialogRef, useValue: dialogMock },
				{
					provide: Swal,
					useClass: sweetMock //This is the key line
				}]
		}).compileComponents();
	}));

	beforeEach(() => {

		fixture = TestBed.createComponent(TermsConditionsComponent);
		component = fixture.componentInstance;
		service=TestBed.inject(AuthServiceService);
		spyOn(Swal,'fire').and.callThrough();
	});
	afterEach(()=>{
		localStorage.clear();
	})
	it('when init terms condition variables', () => {
		expect(component.acceptTerms).toEqual(false);
		expect(component.acceptTerms).not.toEqual(null);

		expect(component.termsConditionSubTitle).toMatch('');
		expect(component.termsConditionSubTitle).not.toEqual(null);

		expect(component.termsConditionMessage).toMatch('');
		expect(component.termsConditionMessage).not.toEqual(null);

		let user:IMainUser;
		let userId=7699;
		user={
			id:userId,
			href:"",
			token:"",
			pass:"",
			role:[],
			relatedParty:null
		}
		localStorage.setItem("user",JSON.stringify(user));
		fixture.detectChanges();

		expect(component.termsConditionSubTitle).toMatch('');
		expect(component.termsConditionMessage).toMatch('');
		fixture.detectChanges();

		expect(component.termsConditionTitle).toMatch(
			'Términos y condiciones sobre el uso de los datos personales del colaborador'
		);
		fixture.detectChanges();
		expect(component.user).not.toEqual(null);
	});
	it('when init terms and condition',()=>{ 
		let user:IMainUser;
		let userId=7699;
		user={
			id:userId,
			href:"",
			token:"",
			pass:"",
			role:[],
			relatedParty:null
		}
		localStorage.setItem("user",JSON.stringify(user));
		fixture.detectChanges();
		expect(component.user.id).toEqual(userId);
		expect(component.termsConditionTitle).toContain("Términos y condiciones sobre el uso de los datos personales del colaborador");
		
	})
	it('when execute showMessageRestTermsCondition',()=>{ 
		const terms={
			condition:true,
			terms:"El origen de los guardianes, la pelicula",
			subTitle:"El origen de los guardianes"
		}
		component.showMessageRestTermsCondition(terms);
		expect(component.termsConditionMessage).toContain("El origen de los guardianes");
		expect(component.termsConditionMessage).not.toEqual(null);

		expect(component.termsConditionSubTitle).toContain("El origen");
		expect(component.termsConditionSubTitle).not.toEqual(null);
	})
	it('when execute showMessageSaveTermsCondition',()=>{
		let terms:any
		terms={
			condition:true,
			errors:""
		}
		component.showMessageSaveTermsCondition(terms);
		terms={
			condition:false,
			errors:"Error inesperado"
		}
		component.showMessageSaveTermsCondition(terms);
		expect(Swal.fire).toHaveBeenCalled();
		expect(Swal.fire).toHaveBeenCalledTimes(1);
	})

	it('when execute Logout from login component',()=>{ 
		let spy = spyOn(component.dialogRef, 'close').and.callThrough();
		component.logOut();
		expect(component.dialogRef.close).toHaveBeenCalled();
	})

	it('when execute save terms',fakeAsync(()=>{
		let userId=7699;
		let user:IMainUser;
		user={
			id:userId,
			href:"",
			token:"",
			pass:"",
			role:[],
			relatedParty:null
		}
		component.user=user;
		tick(2000);
		component.saveUserTermsCondition(false);
		tick(3000);
		expect(Swal.fire).toHaveBeenCalled();
		flush();
		component.saveUserTermsCondition(true);
		flush();
	}))
});
