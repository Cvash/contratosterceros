import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { RequestService } from './request.service';

describe('RequestService', () => {
	let service: RequestService;
	let controllerMock : HttpTestingController;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports:[HttpClientTestingModule]
		});
		service = TestBed.inject(RequestService);
		controllerMock = TestBed.inject(HttpTestingController);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
