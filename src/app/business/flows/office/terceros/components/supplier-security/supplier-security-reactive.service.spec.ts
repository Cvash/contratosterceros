import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { SupplierSecurityReactiveService } from './supplier-security-reactive.service';

describe('SupplierSecurityReactiveService', () => {
  let service: SupplierSecurityReactiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[MatDialogModule],
      providers:[
        {
          provide:MatDialog,
          userClass:{}
        }
      ]
    });
    service = TestBed.inject(SupplierSecurityReactiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
