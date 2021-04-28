
import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { AccessCodeComponent } from './access-code.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { IMainUser } from '../../../../../../business/models/IModel-module';
import { ViewContainerRef } from '@angular/core';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
describe('AccessCodeComponent', () => {
	let component: AccessCodeComponent;
	let fixture: ComponentFixture<AccessCodeComponent>;
	let dialog:MatDialog;

	class SweetAlertMock{
		fire(){
			return {
				then:()=>of({
					name:"any value"
				})
			}
		}
	}
	class MdDialogMock{
		open() {
			return {
				afterClosed: () => of({ name: 'some object' })
			};
		}
	}
	const dialogMock = {
		close: () => { },
		};
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [AccessCodeComponent],
			imports: [HttpClientTestingModule, RouterTestingModule, MatDialogModule],
			providers: [{ provide: MAT_DIALOG_DATA, useValue: {} },
			{ provide: MatDialogRef, useValue:dialogMock},
			
		
			{
				provide: MatDialog,
				useClass: MdDialogMock //This is the key line
			},
			{
				provide: Swal,
				useClass: SweetAlertMock //This is the key line
			}]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AccessCodeComponent);
		component = fixture.componentInstance;
		dialog=TestBed.inject(MatDialog);
		spyOn(Swal,'fire').and.callThrough();
		spyOn(dialog,'open').and.callThrough();
		spyOn(component.dialogRef,'close').and.callThrough();
	});
	afterEach(()=>{
		localStorage.clear();
	})
	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('when init variable from ngOnInit', () => {
		expect(component.userObject).toEqual(null);
		expect(component.userObject).not.toBeUndefined();

		expect(component.confirmAccessCode).toMatch("");
		expect(component.confirmAccessCode).not.toEqual(null);
		expect(component.accessCodeForm.accessForm.get("code").value).toMatch("");
		component.accessCodeForm.accessForm.get("code").setValue("HOLA");
		expect(component.accessCodeForm.accessForm.get("code").value).toMatch("HOLA");

	})
	it('when execute capture data',()=>{
		component.accessCodeForm.accessForm.get("code").setValue("Prueba");
		expect(component.accessCodeForm.accessForm.get("code").value).toMatch("Prueba");

		component.ngOnInit();
		expect(component.accessCodeForm.accessForm.get("code").value).toMatch("");

		component.accessCodeForm.accessForm.get("code").setValue("Prueba");
		component.captureValue();
		expect(component.accessCodeForm.accessForm.get("code").value).toMatch("Prueba");

	})
	it('when execute showAlertUserNotNull',()=>{
		let user:IMainUser=null;
		user={
			id:2955,
			href:"",
			token:"ASDADADADASDASDADASDA",
			relatedParty:null,
			role:[],
			pass:""
		}
		component.showAlertUserNotNull(user,"Success");
		expect(Swal.fire).toHaveBeenCalled();
		component.showChangePassword(user);
		expect(dialog.open).toHaveBeenCalled();
		expect(component.dialogRef.close).toHaveBeenCalled();
	})

	it('when execute showAlertFalse',()=>{ 
		let condition=false;
		let message="Success";
		let user:IMainUser=null;
		user={
			id:2955,
			href:"",
			token:"ASDADADADASDASDADASDA",
			relatedParty:null,
			role:[],
			pass:""
		}
		component.showAlertFalse(condition,message);
		expect(Swal.fire).toHaveBeenCalled();
		component.onClose();
		expect(component.dialogRef.close).toHaveBeenCalled(); 
	})

	it('when execute submitAccessCode()',fakeAsync(()=>{
		let condition=false;
		let message="Success";
		let user:IMainUser=null;
		user={
			id:2955,
			href:"",
			token:"ASDADADADASDASDADASDA",
			relatedParty:null,
			role:[],
			pass:""
		}
		component.accessCodeForm.accessForm.get("code").setValue("32741");
		component.captureValue();
		let spy2=spyOn(component,'submitAccessCode').and.callThrough();
		component.submitAccessCode();
		expect(spy2).toHaveBeenCalled(); 
		component.showAlertUserNotNull(user,"Success");
		expect(Swal.fire).toHaveBeenCalled();
		component.showChangePassword(user);
		expect(dialog.open).toHaveBeenCalled();
		component.showAlertFalse(condition,message);
		expect(Swal.fire).toHaveBeenCalled();
		component.onClose();
		expect(component.dialogRef.close).toHaveBeenCalled(); 
		flush();
		component.accessCodeForm.accessForm.get("code").setValue("");
		component.submitAccessCode();
		expect(spy2).toHaveBeenCalled(); 
		expect(Swal.fire).toHaveBeenCalled();
		flush();
	}))
});
