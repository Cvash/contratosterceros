import { HttpClient, HttpHandler } from '@angular/common/http';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

import { AfiliadosService } from './afiliados.service';
export class mockUtilSwal {
  fire() { 
    return { 
      then : () => of({
        isConfirmed : true
      })
    }
  }
}

describe('AfiliadosService', () => {
  let service: AfiliadosService;

  beforeEach(() => {
    service = TestBed.inject(AfiliadosService);
    TestBed.configureTestingModule({
      providers:[
        HttpClient,
        HttpHandler,
        {
          provide:Swal,
          useClass: mockUtilSwal
        },
      ]
    });
    service = TestBed.inject(AfiliadosService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
