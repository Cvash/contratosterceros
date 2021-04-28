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
  selector: 'app-emb-dialog-no-corresponde',
  templateUrl: './emb-dialog-no-corresponde.component.html',
  styleUrls: ['./emb-dialog-no-corresponde.component.scss']
})
export class EmbDialogNoCorrespondeComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  quiebreRegistradoForm: FormGroup;

  lista_quiebres_id_dhr_red_incident:any;
  lista_quiebres_quiebre_id_dhr_red_status:any;
  lista_quiebres_submotivo:any;

  constructor(private incidentsService: IncidentsService,
              private _builder: FormBuilder,
              public dialogRef:MatDialogRef<EmbDialogNoCorrespondeComponent>,
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
  afterClosedNoCorresponde(condition:boolean){ 
    this.blockUI.stop();
        this.dialogRef.close({
          "result":condition
        })
  }
  ngOnInit(): void {

    // delete this.data.lista_quiebres.createdBy;
    // delete this.data.lista_quiebres.updatedAt;
    // delete this.data.lista_quiebres.updatedBy;
    // delete this.data.lista_quiebres.status;
    // delete this.data.lista_quiebres.createdAt;

    // console.log("Lista_quiebres(element) no-corresponde", this.data.lista_quiebres);

    (<FormGroup>this.quiebreRegistradoForm).setValue(this.data.lista_quiebres, { onlySelf: true });
  }


  updateNoCorrespondeQuiebre(values) {

    this.blockUI.start('Guardando comentario No Corresponde');

    this.data.lista_quiebres.comentario_no_corresponde =  values.comentario_no_corresponde

    this.lista_quiebres_id_dhr_red_incident = this.data.lista_quiebres.id_dhr_red_incident.id;
    this.lista_quiebres_submotivo = this.data.lista_quiebres.id_dhr_incident_submotivo.id;
    this.lista_quiebres_quiebre_id_dhr_red_status = this.data.lista_quiebres.id_dhr_red_status.id;

    this.data.lista_quiebres.id_dhr_red_incident = this.lista_quiebres_id_dhr_red_incident
    this.data.lista_quiebres.id_dhr_incident_submotivo = this.lista_quiebres_submotivo;
    this.data.lista_quiebres.id_dhr_red_status = 7

    this.data.lista_quiebres.situacion_quiebre = "Tercera"

    // console.log("Situación quiebre", this.data.lista_quiebres.situacion_quiebre);
    // console.log("Id_red_incident", this.lista_quiebres_id_dhr_red_incident);
    // console.log("Comentario No Corresponde", this.data.lista_quiebres.comentario_no_corresponde);
    // console.log("Lista quiebre -> updateIncident_Details", this.data.lista_quiebres);

    this.incidentsService.updateIncident_Details(this.data.lista_quiebres).subscribe(
      (res) => {
        // console.log('No corresponde', res);
        this.afterClosedNoCorresponde(true);
      },
      (err) => {
        this.afterClosedNoCorresponde(false);
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
