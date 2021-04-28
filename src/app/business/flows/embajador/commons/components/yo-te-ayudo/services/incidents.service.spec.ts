import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IncidentsService } from './incidents.service';

describe('IncidentsService', () => {
	let service: IncidentsService;
	let controllerMock : HttpTestingController;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports:[HttpClientTestingModule]
		});
		service = TestBed.inject(IncidentsService);
		controllerMock = TestBed.inject(HttpTestingController);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
