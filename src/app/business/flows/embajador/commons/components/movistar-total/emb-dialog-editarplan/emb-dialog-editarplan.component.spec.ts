import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { mockSwal } from 'src/app/business/flows/office/terceros/components/mypass/mypass.component.spec';
import Swal from 'sweetalert2';
import { EmbDialogEditarplanComponent } from './emb-dialog-editarplan.component';

export class mockDialogEditarPlan {
	open(){
		return {
			afterClosed: () => of({
             "result":true
			})
		}
	}
}
describe('EmbDialogEditarplanComponent', () => {
	let component: EmbDialogEditarplanComponent;
	let fixture: ComponentFixture<EmbDialogEditarplanComponent>;
	const dialogRefRelationshipMock = {
		close: ()=>{} ,
		afterClosed: ()=>{}
	  }
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [EmbDialogEditarplanComponent],
			providers:[
				HttpClient,
				HttpHandler,
				FormBuilder,
				{
					provide:MAT_DIALOG_DATA,
					useValue:{}
				},
				{
					provide:MatDialogRef,
					useValue:dialogRefRelationshipMock
				},
				{
					provide:Swal,
					useClass:mockSwal
				}
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EmbDialogEditarplanComponent);
		component = fixture.componentInstance;
	});

	// it('should create', fakeAsync(() => { 	
	// 	expect(component.PlanForm).toBeDefined();
	// 	expect(component.valoresForm.length).toEqual(0);
	// 	expect(component.blockUI).toBeDefined();
	// 	component.ngOnInit();
	// 	tick(1000);
  //       const requestValue = {
	// 					bono: "0",
  //           cant_mbps: "1000",
  //           createdAt: null,
  //           emb_price: "525",
  //           gb_international: "Zona América y Europa",
  //           id: 4,
  //           id_emb_type: 1,
  //           linea_fija: "Llamadas ilimitadas a fijos Movistar",
  //           lineas_moviles: "13",
  //           max_descarga: "1000",
  //           max_subida: "1000",
  //           modem: "WiFi 2.4 y 5 GHz",
  //           plan_type: "Pro",
  //           regular_price: "6251",
  //           tv: "108 canales SD + 64 canales HD",
  //           wsp_international: "Solo texto",
	// 	}
	// 	spyOn(Swal,'fire').and.callThrough();
	// 	const swalWithBootstrapButtons = Swal.mixin({
	// 		customClass: {
	// 			confirmButton: 'btn btn-success m-1',
	// 			cancelButton: 'btn btn-danger m-1'
	// 		},
	// 		buttonsStyling: false
	// 	});
	// 	component.savePlan(requestValue);
	// 	component.swalWithBootstrapDialog(swalWithBootstrapButtons,"A","A","success",true);
	// 	expect(Swal.fire).toHaveBeenCalled();
	// 	flush();
	// 	component.elseEditPlan(swalWithBootstrapButtons,true,true);
	// 	expect(Swal.fire).toHaveBeenCalled();
	// 	flush();
	// }));
});
