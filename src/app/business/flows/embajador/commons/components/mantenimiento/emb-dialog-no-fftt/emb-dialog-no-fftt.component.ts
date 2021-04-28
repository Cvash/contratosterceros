import { Component, OnInit, Inject } from '@angular/core';

import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
	FormBuilder,
	FormGroup,

} from '@angular/forms';
import { IncidentsService } from '../../../components/yo-te-ayudo/services/incidents.service';

@Component({
  selector: 'app-emb-dialog-no-fftt',
  templateUrl: './emb-dialog-no-fftt.component.html',
  styleUrls: ['./emb-dialog-no-fftt.component.scss']
})
export class EmbDialogNoFFTTComponent implements OnInit {

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
              public dialogRef:MatDialogRef<EmbDialogNoFFTTComponent>,
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

    // console.log("Lista_quiebres(element) no-fftt", this.data.lista_quiebres);

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
  // success
  responseGetIncidentMotivos(res){
    console.log(res)
    this.lista_motivos = res;
  }
  // success
  responsegetIncidentSubMotivos(res){
    console.log(res)
    this.lista_submotivos = res;
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

  afterCloseDialogNoFFTT(condition:boolean){ 
    this.blockUI.stop();
        this.dialogRef.close({
          "result":condition
        })
  }

  updateNoFFTT(values) {

    this.blockUI.start('Guardando No FFTT');
    // console.log(this.data.lista_quiebres)
    this.onSelectMotivo(this.id_submotivo);

    this.lista_quiebres_id_dhr_incident_submotivo = this.id_submotivo;

    this.data.lista_quiebres.comentario_no_fftt =  values.comentario_no_fftt

    this.lista_quiebres_id_dhr_red_incident = this.data.lista_quiebres.id_dhr_red_incident.id;
    this.lista_quiebres_quiebre_id_dhr_red_status = this.data.lista_quiebres.id_dhr_red_status.id;

    this.data.lista_quiebres.id_dhr_red_incident = this.lista_quiebres_id_dhr_red_incident
    this.data.lista_quiebres.id_dhr_incident_submotivo = this.lista_quiebres_id_dhr_incident_submotivo;
    this.data.lista_quiebres.id_dhr_red_status = 4

    this.data.lista_quiebres.situacion_quiebre = "Tercera"

    // console.log("Situación quiebre", this.data.lista_quiebres.situacion_quiebre);
    // console.log("Id_red_incident", this.lista_quiebres_id_dhr_red_incident);
    // console.log("Comentario No FFTT", this.data.lista_quiebres.comentario_no_corresponde);
    // console.log("Lista quiebre", this.data.lista_quiebres);

    this.incidentsService.updateIncident_Details(this.data.lista_quiebres).subscribe(
      (res) => {
        // console.log('No FFTT', res);
        this.afterCloseDialogNoFFTT(true);
      },
      (err) => {
        this.afterCloseDialogNoFFTT(false);
        console.log(err)}
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
