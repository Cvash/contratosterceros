import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AfiliadosService } from '../../../services/afiliados.service';
import { IMainUser } from '../../../../../../../business/models/IModel-module';
import Swal from 'sweetalert2';
import {
	FormBuilder,
	FormGroup,
	Validators
} from '@angular/forms';
import { AnonymousSubject } from 'rxjs/internal/Subject';
@Component({
  selector: 'app-emb-dialog-afiliados-reporte',
  templateUrl: './emb-dialog-afiliados-reporte.component.html',
  styleUrls: ['./emb-dialog-afiliados-reporte.component.scss']
})
export class EmbDialogAfiliadosReporteComponent implements OnInit {

  
  afiliadosForm: FormGroup;
	afiliado_form: any;
	user: IMainUser;
	id_tipo: any;
	userId: any;
	selectedValue: string;
	AFILIADOS_DATA: any = [];
	dataSourceEmbajador = new MatTableDataSource(this.AFILIADOS_DATA);
	@ViewChild(MatPaginator) paginator: MatPaginator;
	tiposEmbajador: any = [
    {id: '1', name: 'Retiro'},
    {id: '2', name: 'Aliado'},
    {id: '3', name: 'Admin Planes'},
		{id: '4', name: 'Admin Quiebres'},
    {id: '5', name: 'Influencer'},
    {id: '6', name: 'Admin Influencer'}
  ];
	@BlockUI() blockUI: NgBlockUI;



	 Columns_Emabajador: string[] = [
	 	'Id', 'Documento', 'Nombre', 'Apellido_Paterno', 'Apellido_Materno', 'Mail', 'Empresa', 'Tipo', 'Estado', 'Acciones'];

  constructor(
		private _builder: FormBuilder,
		private ref:ChangeDetectorRef,
		private afiliadosService: AfiliadosService,
	) {
		this.afiliadosForm = this._builder.group({
			documento: ['', Validators.required],
			name: ['', Validators.required],
		  last_name_1: ['', Validators.required],
			last_name_2: ['', Validators.required],
			mail: ['', Validators.compose([Validators.required, Validators.email])],
			empresa: ['', Validators.required],
			tipo: ['', ],
			// status: ['',],
      // createdBy: ['',],
      // updatedAt: ['',],
      // updatedBy: ['',],
      // createdAt: ['',],

		});
	}
  ngOnInit(): void {

		this.user = JSON.parse(localStorage.getItem('user'));
		this.userId = this.user.id;
		this.ref.detectChanges();
		this.initData();

  }

	initData() {
		this.blockUI.start("Procesando...")
		this.afiliadosService.getAfiliados().subscribe(
			(res) => {
				this.responseGetAfiliados(res);
			},
			(err) => console.log(err)
		)
	}

	responseGetAfiliados(res) {
		
		this.ref.detectChanges();

		this.AFILIADOS_DATA = res;
		this.AFILIADOS_DATA = this.AFILIADOS_DATA.reverse();
		this.dataSourceEmbajador = new MatTableDataSource(this.AFILIADOS_DATA);
		this.dataSourceEmbajador.paginator = this.paginator;
		this.blockUI.stop();
	}

	saveAfiliadoForm(values) {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success m-1',
				cancelButton: 'btn btn-danger m-1'
			},
			buttonsStyling: false
		});
		this.onSelectTipo(this.id_tipo);
		this.afiliado_form = values
		this.afiliado_form.estado = "activo"
		this.afiliado_form.tipo = this.id_tipo;
		// this.afiliado_form.createdBy = this.userId
		// this.afiliado_form.updatedBy = this.userId
		// this.afiliado_form.status = 1
		console.log(this.afiliado_form)



		swalWithBootstrapButtons
			.fire({
				title: 'Estas seguro?',
				text: 'Se registrar?? el afiliado',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Si, registrar!',
				cancelButtonText: 'No, cancelar!',
				reverseButtons: true
			})
			.then((result) => {
				this.blockUI.start("Procesando...")
				if (result.isConfirmed) {
					this.afiliadosService.saveAfiliado(this.afiliado_form).subscribe(
						(res) => {
							console.log("RESPONSE SAVE Afiliado")
							console.log(res);
							this.responseSaveIncidentDetails(swalWithBootstrapButtons,'Registrado!',"Se registr?? el afiliado","success")
						},
						(err) => {
							this.errorIncident();
						}
							
					);
					
				} else {
					this.elseDissmissSwal(result.dismiss,Swal.DismissReason.cancel,swalWithBootstrapButtons)
				}
			});
	}

	elseDissmissSwal(conditionDismiss,ButtonCance:any,swalWithBootstrapButtons){
		if (
			/* Read more about handling dismissals below */
			conditionDismiss === ButtonCance
			
		) {
			this.responseSaveIncidentDetails(swalWithBootstrapButtons,'Cancelado!',"No se registr?? el quiebre","error")
			
		}
	}

	responseSaveIncidentDetails(swalWithBootstrapButtons:any,mainTitle:string,message:string,icon:any){
		// this.router.navigateByUrl("/embajador/yo-te-ayudo")
		this.blockUI.stop();
		swalWithBootstrapButtons.fire(
			mainTitle,
			message,
			icon
		);
		}

	
	errorIncident(){
		this.blockUI.stop();
		Swal.fire({
			icon:"error",
			text:'Error en crear el detalle del Quiebre'
		})
	}

	resetearForm() {
		(<FormGroup>this.afiliado_form).setValue(this.afiliado_form, { onlySelf: true });
	}

	onSelectTipo(id: number): number {
		this.id_tipo = id;
		console.log('Id_Tipo->', this.id_tipo);
		return this.id_tipo;
	}

	cambiarEstadoEmbajador() {
		console.log("ahhhhhhhhhhhh")
	}

	applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceEmbajador.filter = filterValue.trim().toLowerCase();
  }

}
