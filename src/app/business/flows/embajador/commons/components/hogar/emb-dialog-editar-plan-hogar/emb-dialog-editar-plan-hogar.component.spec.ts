import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UtilService } from '../../../services/util.service';
import { EmbDialogEditarPlanHogarComponent } from './emb-dialog-editar-plan-hogar.component';

describe('EmbDialogEditarPlanHogarComponent', () => {
	let component: EmbDialogEditarPlanHogarComponent;
	let fixture: ComponentFixture<EmbDialogEditarPlanHogarComponent>;
	let service : UtilService;
	const dialogRefPlanHogar = {
		close : ()=>{},
		afterClosed: () =>{}
	}
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [EmbDialogEditarPlanHogarComponent],
			providers:[ 
				HttpClient,
				HttpHandler,
				FormBuilder,
				UtilService,
				{ 
					provide:MatDialogRef,
					useValue:dialogRefPlanHogar
				},
				{ 
					provide:MAT_DIALOG_DATA,
					useValue:{}
				}
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EmbDialogEditarPlanHogarComponent);
		component = fixture.componentInstance;
		service = TestBed.inject(UtilService);
	});

	it('should create', fakeAsync(() => {
		spyOn(Swal,'fire').and.callThrough();
		spyOn(component.dialogRef,'close').and.callThrough();
		const data = { 
			plan : { 
			  cant_mbps: "Usa y Canadá",
			  createdAt: null,
			  emb_price: "104.93",
			  id: 9,
			  id_emb_type:{ 
				createdAt: "2020-12-09T18:34:08",
				createdBy: 0,
				id: 3,
				name: "Movil",
				status: true,
				updatedAt: "2020-12-10T09:46:17",
				updatedBy: 0
			  },
			  plan_type:"40",
			  regular_price:"149.9",
			  createdBy:null,
			  updatedAt:null,
			  updatedBy:null,
			  status:true,
			  bono:0,
			  max_descarga:"",
			  max_subida:"",
			  modem:"",
			  lineas_moviles:"",
			  tv:"",
			  linea_fija:"",
			  gb_international:"",
			  wsp_international:""
			}
		  }
		  const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success m-1',
				cancelButton: 'btn btn-danger m-1'
			},
			buttonsStyling: false
		});
		  component.data=data;
		  component.ngOnInit();
		  component.savePlan(data.plan);
		  flush();

		  service.ifConfirmedValidate(data.plan,false,swalWithBootstrapButtons,false,component.dialogRef);
		  expect(Swal.fire).toHaveBeenCalled();
		  service.elseIfPlanAlert(false,false,swalWithBootstrapButtons,component.dialogRef); 
		  service.responsePlanAlert(swalWithBootstrapButtons,"hola","hola","success",false,component.dialogRef);
		  expect(Swal.fire).toHaveBeenCalled(); 
		  expect(component.dialogRef.close).toHaveBeenCalled();	
		  flush();
		}));
});
