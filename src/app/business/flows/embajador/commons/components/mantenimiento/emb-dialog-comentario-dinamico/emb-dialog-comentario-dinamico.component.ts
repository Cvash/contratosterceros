import { Component, OnInit, Inject } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
	FormBuilder,
	FormGroup,
  Validators
} from '@angular/forms';
import { IncidentsService } from '../../../components/yo-te-ayudo/services/incidents.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

@Component({
  selector: 'app-emb-dialog-comentario-dinamico',
  templateUrl: './emb-dialog-comentario-dinamico.component.html',
  styleUrls: ['./emb-dialog-comentario-dinamico.component.scss']
})
export class EmbDialogComentarioDinamicoComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  Incident_details: any = [];

  quiebreForm: FormGroup;

  lista_motivos: any;
  lista_submotivos: any;
  lista_submotivos2: any;
  id_submotivo: number;

  lista_quiebres_id_dhr_incident_submotivo: number;

  lista_quiebres_id_dhr_red_incident:any;
  lista_quiebres_quiebre_id_dhr_red_status:any;
  lista_quiebres_submotivo:any;

  constructor(private incidentsService: IncidentsService,
              private _builder: FormBuilder,
              public dialogRef:MatDialogRef<EmbDialogComentarioDinamicoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) 
    {
                this.quiebreForm = this._builder.group({
                  id: [0, ],
                  cause: ['', ],
                  comentario_inicio_atencion: ['', ],
                  comentario_no_contacto: ['', ],
                  comentario_no_corresponde: ['', ],
                  comentario_no_fftt: ['', ],
                  comment: ['', Validators.required],
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
                  updatedBy: ['',],
                  createdAt: ['',],
                  

                });
              } 

  ngOnInit(): void {
    // this.blockUI.start('Cargando motivos y submotivos...');
    // this.initData();
    (<FormGroup>this.quiebreForm).setValue(this.data.lista_quiebres, { onlySelf: true });
    
  }
  
  afterCloseInicioAten(condition:boolean){ 
    this.blockUI.stop();
        this.dialogRef.close({ 
          "result":condition
        })
  }

  // success
  updateComentarioDinamico(values) {
    this.blockUI.start('Guardando el comentario dinámico...');
    // this.onSelectSubMotivo(this.id_submotivo);
    
    // this.lista_quiebres_id_dhr_incident_submotivo = this.id_submotivo;
    this.lista_quiebres_submotivo = this.data.lista_quiebres.id_dhr_incident_submotivo.id;

    this.data.lista_quiebres.comment =  values.comment;

    this.lista_quiebres_id_dhr_red_incident = this.data.lista_quiebres.id_dhr_red_incident.id;
    this.lista_quiebres_quiebre_id_dhr_red_status = this.data.lista_quiebres.id_dhr_red_status.id;

    this.data.lista_quiebres.id_dhr_red_incident = this.lista_quiebres_id_dhr_red_incident
    this.data.lista_quiebres.id_dhr_incident_submotivo = this.lista_quiebres_submotivo;
    this.data.lista_quiebres.id_dhr_red_status = 2;

    this.data.lista_quiebres.situacion_quiebre = "Segunda"
    
    this.incidentsService.updateIncident_Details(this.data.lista_quiebres).subscribe(
      (res) => {
        // console.log('Inicio de atención', res);
       this.afterCloseInicioAten(true);
      },
       (err) => {
         this.afterCloseInicioAten(false);
       }
    );
  }


}
