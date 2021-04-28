import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { EmbDialogEditarPlanMovilComponent } from './emb-dialog-editar-plan-movil.component';

export class mockSwalMovil{
  fire() { 
    return { 
      then : () => of({
        isConfirmed:true
      })
    }
  }
}

describe('EmbDialogEditarPlanMovilComponent', () => {
  let component: EmbDialogEditarPlanMovilComponent;
  let fixture: ComponentFixture<EmbDialogEditarPlanMovilComponent>;
  const dialogRefPlanMovil  = {
  close : () =>{},
  afterClosed: () => {}
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbDialogEditarPlanMovilComponent ],
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
          useValue:dialogRefPlanMovil
        },
        {
          provide:Swal,
          useClass:mockSwalMovil
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbDialogEditarPlanMovilComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('when execute emb-dialog-editar-plan-movil', fakeAsync(()=>{ 
  //   spyOn(Swal,'fire').and.callThrough();
  //   spyOn(component.dialogRef,'close').and.callThrough();
  //   component.data = { 
  //     plan : { 
  //       cant_mbps: "Usa y Canadá",
  //       createdAt: null,
  //       emb_price: "104.93",
  //       id: 9,
  //       id_emb_type:{ 
  //         createdAt: "2020-12-09T18:34:08",
  //         createdBy: 0,
  //         id: 3,
  //         name: "Movil",
  //         status: true,
  //         updatedAt: "2020-12-10T09:46:17",
  //         updatedBy: 0
  //       },
  //       plan_type:"40",
  //       regular_price:"149.9",
  //       createdBy:null,
  //       updatedAt:null,
  //       updatedBy:null,
  //       status:true,
  //       bono:0,
  //       max_descarga:"",
  //       max_subida:"",
  //       modem:"",
  //       lineas_moviles:"",
  //       tv:"",
  //       linea_fija:"",
  //       gb_international:"",
  //       wsp_international:""
  //     }
  //   }
  //   component.ngOnInit();
  //   flush();
    
  //   // savePlan
  //   let valuePlan = {
  //     id_emb_type:{
  //       id:1
  //     }
  //   }
  //   const swalWithBootstrapButtons = Swal.mixin({
	// 		customClass: {
	// 			confirmButton: 'btn btn-success',
	// 			cancelButton: 'btn btn-danger'
	// 		},
	// 		buttonsStyling: false
	// 	});
  //   /* component.savePlan(valuePlan) */
  //   component.ifConfirmedValidate(true,swalWithBootstrapButtons,false);
  //   component.responsePlanAlert(swalWithBootstrapButtons,"hola","joao","success",true);
  //   expect(Swal.fire).toHaveBeenCalled();
  //   expect(component.dialogRef.close).toHaveBeenCalled();
  //   flush();

  //   valuePlan.id_emb_type.id=2;
  //   /* component.savePlan(valuePlan) */
  //   component.ifConfirmedValidate(true,swalWithBootstrapButtons,false);
  //   component.responsePlanAlert(swalWithBootstrapButtons,"hola","joao","success",true);
  //   expect(Swal.fire).toHaveBeenCalled();
  //   expect(component.dialogRef.close).toHaveBeenCalled();
  //   flush();

  //   valuePlan.id_emb_type.id=3;
  //   /* component.savePlan(valuePlan) */
  //   component.ifConfirmedValidate(true,swalWithBootstrapButtons,false);
  //   component.responsePlanAlert(swalWithBootstrapButtons,"hola","joao","success",true);
  //   expect(Swal.fire).toHaveBeenCalled();
  //   expect(component.dialogRef.close).toHaveBeenCalled();
  //   flush();

  //   component.ifConfirmedValidate(false,swalWithBootstrapButtons,false)
  // }))
});
