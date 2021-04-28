import { HttpClient, HttpHandler } from '@angular/common/http';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

import { UtilService } from './util.service';
export class mockUtilSwal {
  fire() { 
    return { 
      then : () => of({
        isConfirmed : true
      })
    }
  }
}
describe('UtilService', () => {
  let service: UtilService;
  const dialogRefPlanHogar = {
		close : ()=>{},
		afterClosed: () =>{}
	}
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        HttpClient,
        HttpHandler,
        {
          provide:Swal,
          useClass: mockUtilSwal
        },
        { 
          provide:MatDialogRef,
          useValue: dialogRefPlanHogar
        }
      ]
    });
    service = TestBed.inject(UtilService);
  });

});
