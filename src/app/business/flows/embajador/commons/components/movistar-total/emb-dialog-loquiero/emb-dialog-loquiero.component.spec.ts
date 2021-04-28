import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { executionAsyncId } from 'async_hooks';

import { EmbDialogLoquieroComponent } from './emb-dialog-loquiero.component';

describe('EmbDialogLoquieroComponent', () => {
	let component: EmbDialogLoquieroComponent;
	let fixture: ComponentFixture<EmbDialogLoquieroComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [EmbDialogLoquieroComponent],
			providers: [{
				provide: MAT_DIALOG_DATA,
				useValue: {}
			},
				FormBuilder,
				HttpClient,
				HttpHandler]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EmbDialogLoquieroComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
		expect(component.checked).toEqual(true);
		expect(component.requestForm).toBeDefined();
		expect(component.emb_request.dni).toMatch('');
		expect(component.emb_request.cel_contacto).toMatch('');
		expect(component.emb_request.mail).toMatch('');
		expect(component.emb_request.tratamiento_datos).toMatch('');
		expect(component.emb_request.id_dhr_user).toEqual(0);
		expect(component.emb_request.id_dhr_emb_plan).toEqual(0);
		component.ngOnInit();
	});
	it('when execute script dialog lo quiero', fakeAsync(() => {
		const requestLoQuiero = {
			cel_contacto: "936555023",
			dni: "73078273",
			id_dhr_emb_plan: 4,
			id_dhr_user: "2955",
			mail: "joao.hernandezgo@telefonica.com",
			tratamiento_datos: true
		}
        component.saveRequest(requestLoQuiero);
	}))
});
