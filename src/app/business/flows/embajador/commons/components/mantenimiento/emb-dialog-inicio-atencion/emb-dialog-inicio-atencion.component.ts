import { Component, OnInit, Inject } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
	FormBuilder,
	FormGroup
} from '@angular/forms';
import { IncidentsService } from '../../../components/yo-te-ayudo/services/incidents.service';

@Component({
  selector: 'app-emb-dialog-inicio-atencion',
  templateUrl: './emb-dialog-inicio-atencion.component.html',
  styleUrls: ['./emb-dialog-inicio-atencion.component.scss']
})
export class EmbDialogInicioAtencionComponent implements OnInit {

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
              public dialogRef:MatDialogRef<EmbDialogInicioAtencionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) 
    {
                this.quiebreForm = this._builder.group({
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
                  updatedBy: ['',],
                  createdAt: ['',],
                  

                });
              } 
  // success
  ngOnInit(): void {
    // this.blockUI.start('Cargando motivos y submotivos...');
    // this.initData();
    /* (<FormGroup>this.quiebreForm).setValue(this.data.lista_quiebres, { onlySelf: true }); */
    
  }
  // success
  // initData(){
  //   this.incidentsService.getIncident_Motivos().subscribe(
	// 		(res) => {
  //       console.log("MOTIVOS");
	// 			this.responseGetIncidentMotivos(res);
	// 			// console.log('Obtener Motivos', this.lista_motivos);
	// 		},
	// 		(err) => console.log(err)
	// 	);

	// 	this.incidentsService.getIncident_Submotivos().subscribe(
	// 		(res) => {
  //       console.log("SUB MOTIVOS")
	// 			this.responsegetIncidentSubMotivos(res);
  //     },
	// 		(err) => console.log(err)
  //   );
  // }

  // success
  // responseGetIncidentMotivos(res){
  //   console.log(res)
  //   this.lista_motivos = res;
  // }

  // success
  // responsegetIncidentSubMotivos(res){
  //   console.log(res)
  //   this.lista_submotivos = res;
  //   this.blockUI.stop();
  // }

  // success
    // onSelectMotivo(id: number): void {
    //   // console.log('idMotivo', id)
    //   this.lista_submotivos2 = this.lista_submotivos.filter((item) => item.id_dhr_incident_motivo.id == id)
    //   console.log("lista_submotivos2", this.lista_submotivos2)
    // }

    // success
    // onSelectSubMotivo(id: number): number {
    //   this.id_submotivo = id;
    //   // console.log('IdSubMotivo->', this.id_submotivo);
    //   return this.id_submotivo;
    // }

  // success
  afterCloseInicioAten(condition:boolean){ 
    this.blockUI.stop();
        this.dialogRef.close({ 
          "result":condition
        })
  }

  // success
  updateComentarioQuiebre(values) {

    
    this.blockUI.start('Iniciando atención del quiebre...');
    // this.onSelectSubMotivo(this.id_submotivo);
    
    // this.lista_quiebres_id_dhr_incident_submotivo = this.id_submotivo;
    this.lista_quiebres_submotivo = this.data.lista_quiebres.id_dhr_incident_submotivo.id;

    this.data.lista_quiebres.comentario_inicio_atencion =  values.comentario_inicio_atencion

    this.lista_quiebres_id_dhr_red_incident = this.data.lista_quiebres.id_dhr_red_incident.id;
    this.lista_quiebres_quiebre_id_dhr_red_status = this.data.lista_quiebres.id_dhr_red_status.id;

    this.data.lista_quiebres.id_dhr_red_incident = this.lista_quiebres_id_dhr_red_incident
    this.data.lista_quiebres.id_dhr_incident_submotivo = this.lista_quiebres_submotivo;
    this.data.lista_quiebres.id_dhr_red_status = 2;

    this.data.lista_quiebres.situacion_quiebre = "Segunda"
    
    const json = {
      redIncidentPrueba: this.data.lista_quiebres,
      section: this.data.section,
      type: this.data.type
    }

    console.log("Json", json);
    this.incidentsService.updateIncident_Details(json).subscribe(
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
