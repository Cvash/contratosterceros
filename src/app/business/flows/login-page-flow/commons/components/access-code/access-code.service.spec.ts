import { TestBed } from '@angular/core/testing';

import { AccessCodeService } from './access-code.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AccessCodeService', () => {
	let service: AccessCodeService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule]
		});
		service = TestBed.inject(AccessCodeService);
	});
	
});
