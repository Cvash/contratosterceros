import { Component, OnInit, Inject } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
	FormBuilder,
	FormGroup,
} from '@angular/forms';
import { IncidentsService } from '../../../components/yo-te-ayudo/services/incidents.service';

@Component({
  selector: 'app-emb-dialog-motivo-submotivo',
  templateUrl: './emb-dialog-motivo-submotivo.component.html',
  styleUrls: ['./emb-dialog-motivo-submotivo.component.scss']
})
export class EmbDialogMotivoSubmotivoComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  motivoSubmotivoForm: FormGroup;

  lista_quiebres_id_dhr_red_incident:any;
  lista_quiebres_id_dhr_incident_submotivo: number;
  lista_quiebres_quiebre_id_dhr_red_status:any;
  lista_quiebres_submotivo:any;

  lista_motivos: any;
  lista_submotivos: any;
  lista_submotivos2: any;
  id_submotivo: number;

  constructor(private incidentsService: IncidentsService,
              private _builder: FormBuilder,
              public dialogRef:MatDialogRef<EmbDialogMotivoSubmotivoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.motivoSubmotivoForm = this._builder.group({
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

    //  delete this.data.lista_quiebres.createdBy;
    //  delete this.data.lista_quiebres.updatedAt;
    //  delete this.data.lista_quiebres.updatedBy;
    //  delete this.data.lista_quiebres.status;
    //  delete this.data.lista_quiebres.createdAt;

    // console.log("Lista_quiebres(element) motivo-submotivo", this.data.lista_quiebres);

    (<FormGroup>this.motivoSubmotivoForm).setValue(this.data.lista_quiebres, { onlySelf: true });

    this.incidentsService.getIncident_Motivos().subscribe(
			(res) => {
				this.lista_motivos = res;
				// console.log('Obtener Motivos', this.lista_motivos);
			},
			(err) => console.log(err)
		);

		this.incidentsService.getIncident_Submotivos().subscribe(
			(res) => {
				this.lista_submotivos = res;
        // console.log('Obtener Submotivos', this.lista_submotivos);
        this.blockUI.stop();
      },
      
			(err) => console.log(err)
    );
    
    
  }


  onSelectMotivo(id: number): void {
    // console.log('idMotivo', id)
    this.lista_submotivos2 = this.lista_submotivos.filter((item) => item.id_dhr_incident_motivo.id == id)
    // console.log("lista_submotivos2", this.lista_submotivos2)
  }

  onSelectSubMotivo(id: number): number {
		this.id_submotivo = id;
		// console.log('IdSubMotivo->', this.id_submotivo);
		return this.id_submotivo;
	}
  afterClosedMotiboSub(condition:boolean){
    this.blockUI.stop();
    this.dialogRef.close({
      "result":condition
    })
  }
// VER LA FUNCION updateMotivoSubmotivo(VALUES)!!!!!!!!!!! 
  updateMotivoSubmotivo(values) {
    this.blockUI.start("Procesando...")
    this.onSelectSubMotivo(this.id_submotivo);
    this.lista_quiebres_id_dhr_incident_submotivo = this.id_submotivo;
    // console.log('UpdateMotivoSubmotivo con el Id', this.lista_quiebres_id_dhr_incident_submotivo)
    // this.data.lista_quiebres.motivo =  values.comentario_no_corresponde

    this.lista_quiebres_id_dhr_red_incident = this.data.lista_quiebres.id_dhr_red_incident.id;
    this.lista_quiebres_quiebre_id_dhr_red_status = this.data.lista_quiebres.id_dhr_red_status.id;

    this.data.lista_quiebres.id_dhr_red_incident = this.lista_quiebres_id_dhr_red_incident
    this.data.lista_quiebres.id_dhr_incident_submotivo =  this.lista_quiebres_id_dhr_incident_submotivo;
    this.data.lista_quiebres.id_dhr_red_status = this.lista_quiebres_quiebre_id_dhr_red_status

    // this.data.lista_quiebres.situacion_quiebre = "Tercera"

    // console.log("Situación quiebre", this.data.lista_quiebres.situacion_quiebre);
    // console.log("Id_red_incident", this.lista_quiebres_id_dhr_red_incident);
    // console.log("IdSubmotivo", this.data.lista_quiebres.id_dhr_incident_submotivo);
    // console.log("Lista quiebre MotivoSubmotivo", this.data.lista_quiebres);

    this.incidentsService.updateIncident_Details(this.data.lista_quiebres).subscribe(
      (res) => {
        // console.log('Motivo Submotivo', res);
        this.afterClosedMotiboSub(true);
      },  
      (err) => {
        this.afterClosedMotiboSub(false);
      }
    )

    
		

  }

 
  
}
