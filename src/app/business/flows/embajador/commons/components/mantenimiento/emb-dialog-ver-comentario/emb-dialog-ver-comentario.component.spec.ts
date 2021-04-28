import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EmbDialogVerComentarioComponent } from './emb-dialog-ver-comentario.component';

describe('EmbDialogVerComentarioComponent', () => {
	let component: EmbDialogVerComentarioComponent;
	let fixture: ComponentFixture<EmbDialogVerComentarioComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [EmbDialogVerComentarioComponent],
			providers:[
				{
					provide:MAT_DIALOG_DATA,
					useValue:{}
				}
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EmbDialogVerComentarioComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
		component.ngOnInit();
	});
});
