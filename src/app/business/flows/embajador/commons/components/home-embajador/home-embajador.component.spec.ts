import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEmbajadorComponent } from './home-embajador.component';

describe('HomeEmbajadorComponent', () => {
	let component: HomeEmbajadorComponent;
	let fixture: ComponentFixture<HomeEmbajadorComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [HomeEmbajadorComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HomeEmbajadorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
