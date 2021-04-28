import { Component, OnInit, Inject } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	FormsModule,
	Validators
} from '@angular/forms';
import { IncidentsService } from '../../../components/yo-te-ayudo/services/incidents.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

@Component({
  selector: 'app-emb-dialog-no-contacto',
  templateUrl: './emb-dialog-no-contacto.component.html',
  styleUrls: ['./emb-dialog-no-contacto.component.scss']
})
export class EmbDialogNoContactoComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  quiebreRegistradoForm: FormGroup;

  lista_quiebres_id_dhr_red_incident:any;
  lista_quiebres_quiebre_id_dhr_red_status:any;
  lista_quiebres_submotivo:any;

  lista_motivos: any;
  lista_submotivos: any;
  lista_submotivos2: any;
  id_submotivo: number;

  lista_quiebres_id_dhr_incident_submotivo: number;

  constructor(private incidentsService: IncidentsService,
              private _builder: FormBuilder,
              public dialogRef:MatDialogRef<EmbDialogNoContactoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.quiebreRegistradoForm = this._builder.group({
      id: [0, ],
      cause: ['', ],
      comentario_inicio_atencion: ['', ],
      comentario_no_contacto: ['', ],
      comentario_no_corresponde: ['', ],
      comentario_no_fftt: ['', ],
      comment: ['',],
      id_dhr_red_incident: [0, ],
      id_dhr_red_status: [0, ],
      id_dhr_incident_submotivo: [0, ],
      se_atendio_remedy: ['', ],
      se_hizo_ajuste: ['', ],
      se_realizo_doit: ['', ],
      situacion_quiebre: ['', ],
      importe_ajuste: ['', ],
      observacion_ajuste: ['', ],
      comentario_final: ['', ],
      codigo_remedy: ['', ],
      codigo_doit: ['', ],
      status: ['',],
      createdBy: ['',],
      updatedAt: ['',],
      updatedBy: [''],
      createdAt: ['',],

    });



  }

  ngOnInit(): void {
    this.blockUI.start('Cargando motivos y submotivos...');
    this.initData();
    // console.log("Lista_quiebres(element) no-contacto", this.data.lista_quiebres);

    (<FormGroup>this.quiebreRegistradoForm).setValue(this.data.lista_quiebres, { onlySelf: true });
  }

  initData(){
    this.incidentsService.getIncident_Motivos().subscribe(
			(res) => {
        console.log("MOTIVOS");
				this.responseGetIncidentMotivos(res);
				// console.log('Obtener Motivos', this.lista_motivos);
			},
			(err) => console.log(err)
		);
      
		this.incidentsService.getIncident_Submotivos().subscribe(
			(res) => {
        console.log("SUB MOTIVOS")
				this.responsegetIncidentSubMotivos(res);
      },
			(err) => console.log(err)
    );
  }

  responseGetIncidentMotivos(res){
    this.lista_motivos = res;
    console.log("MOTIVOS", this.lista_motivos);
  }

  // success
  responsegetIncidentSubMotivos(res){
    this.lista_submotivos = res;
    console.log("SUBMOTIVOS", this.lista_submotivos);
    this.blockUI.stop();
  }

  // success
  onSelectMotivo(id: number): void {
    // console.log('idMotivo', id)
    this.lista_submotivos2 = this.lista_submotivos.filter((item) => item.id_dhr_incident_motivo.id == id)
    console.log("lista_submotivos2", this.lista_submotivos2)
  }

  // success
  onSelectSubMotivo(id: number): number {
    this.id_submotivo = id;
    // console.log('IdSubMotivo->', this.id_submotivo);
    return this.id_submotivo;
  }

  afterClosedNoContacto(condition:boolean){ 
    this.blockUI.stop();
        this.dialogRef.close({
          "result":condition
        })
  }

  updateComentarioNoContacto(values) {

    this.blockUI.start('Guardando comentario No Contacto...');
    this.onSelectSubMotivo(this.id_submotivo);

    this.lista_quiebres_id_dhr_incident_submotivo = this.id_submotivo;

    this.data.lista_quiebres.comentario_no_contacto =  values.comentario_no_contacto

    this.lista_quiebres_id_dhr_red_incident = this.data.lista_quiebres.id_dhr_red_incident.id;
    this.lista_quiebres_quiebre_id_dhr_red_status = this.data.lista_quiebres.id_dhr_red_status.id;

    this.data.lista_quiebres.id_dhr_red_incident = this.lista_quiebres_id_dhr_red_incident
    this.data.lista_quiebres.id_dhr_incident_submotivo = this.lista_quiebres_id_dhr_incident_submotivo;
    this.data.lista_quiebres.id_dhr_red_status = 5;

    this.data.lista_quiebres.situacion_quiebre = "Tercera"

    this.incidentsService.updateIncident_Details(this.data.lista_quiebres).subscribe(
      (res) => {
        // console.log('No contacto', res);
        this.afterClosedNoContacto(true);
      },
      (err) => {
        this.afterClosedNoContacto(false);
      }
    );

    // // const swalWithBootstrapButtons = Swal.mixin({
    //   customClass: {
    //     confirmButton: 'btn btn-success',
    //     cancelButton: 'btn btn-danger'
    //   },
    //   buttonsStyling: false
    // });
    
    //  swalWithBootstrapButtons
    //    .fire({
    //      title: 'Estas seguro de iniciar atención?',
    //      text: 'Se iniciará la atención al quiebre',
    //      icon: 'warning',
    //      showCancelButton: true,
    //      confirmButtonText: 'Si, iniciar!',
    //      cancelButtonText: 'No, cancelar!',
    //      reverseButtons: true
    //    })
    //     .then((result) => {
    //       if (result.isConfirmed) {
    //         this.incidentsService.updateIncident_Details(this.data.lista_quiebres).subscribe(
    //           (res) => {
    //             console.log('No corresponde', res);
    //           },
    //           (err) => console.log(err)
    //         );
    //         swalWithBootstrapButtons.fire(
    //           'Correcto!',
    //           'Se inició la atención del quiebre',
    //           'success'
    //         );
    //       } else if (
    //         /* Read more about handling dismissals below */
    //         result.dismiss === Swal.DismissReason.cancel
    //       ) {
    //         swalWithBootstrapButtons.fire(
    //           'Cancelado',
    //           'No se inició el quiebre',
    //           'error'
    //         );
    //       }
    //     });
  }

}
