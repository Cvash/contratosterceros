import { Component, OnInit, Inject } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
	FormBuilder,
	FormGroup,

} from '@angular/forms';
import { IncidentsService } from '../../../components/yo-te-ayudo/services/incidents.service';

@Component({
  selector: 'app-emb-dialog-fin-atencion',
  templateUrl: './emb-dialog-fin-atencion.component.html',
  styleUrls: ['./emb-dialog-fin-atencion.component.scss']
})
export class EmbDialogFinAtencionComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  ajuste:any;
  remedy:any;
  doit:any;
  lista_quiebres_submotivo:any;
  quiebreRegistradoForm: FormGroup;

  condicional_ajuste:any;
  condicional_remedy:any;
  condicional_doit:any;

  lista_quiebres_id_dhr_red_incident:any;
  lista_quiebres_quiebre_id_dhr_red_status:any;

  lista_motivos: any;
  lista_submotivos: any;
  lista_submotivos2: any;
  id_submotivo: number;

  lista_quiebres_id_dhr_incident_submotivo: number;

  constructor(private incidentsService: IncidentsService,
              private _builder: FormBuilder,
              public dialogRef:MatDialogRef<EmbDialogFinAtencionComponent>,
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
      id_dhr_incident_submotivo: [0,],
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
    this.blockUI.start('Cargando...');
    this.initData();
    console.log(this.data);
/*     (<FormGroup>this.quiebreRegistradoForm).setValue(this.data.lista_quiebres, { onlySelf: true });
 */  
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



  onSelectAjuste(id: number){
		// console.log('IdAjuste->', id);
    this.ajuste = id;
    return this.ajuste;
  }
  
  onSelectRemedy(id: number) {
		// console.log('IdRemedy->', id);
    this.remedy = id;
    return this.remedy;
  }
  // success
  onSelectDoit(id: number) {
		// console.log('IdDoit->', id);
    this.doit = id;
    return this.doit;
  }
  // success
  afterCloseDialogFin(condition:boolean){ 
    this.blockUI.stop();
        this.dialogRef.close({
          "result":condition
        })
  }
  // success
  updateFinAtencion(values) {
    this.blockUI.start('Finalizando atención del quiebre...');

    this.onSelectMotivo(this.id_submotivo);
    console.log("updateFinAtencion");
    console.log(values);
    console.log("DATA SOLUTION");
    console.log(this.data)
    this.onSelectAjuste(this.ajuste);
    this.onSelectRemedy(this.remedy);
    this.onSelectDoit(this.doit);
    // console.log("Ajuste", this.ajuste)
    this.data.lista_quiebres.se_hizo_ajuste = this.ajuste;
    // console.log("Remedy", this.remedy)
    this.data.lista_quiebres.se_atendio_remedy = this.remedy;
    // console.log("Doit", this.doit)
    this.data.lista_quiebres.se_realizo_doit = this.doit;
    this.data.lista_quiebres.comentario_final = values.comentario_final
    this.data.lista_quiebres.observacion_ajuste = values.observacion_ajuste
    this.data.lista_quiebres.importe_ajuste =  values.importe_ajuste
    this.data.lista_quiebres.codigo_remedy =  values.codigo_remedy
    this.data.lista_quiebres.codigo_doit =  values.codigo_doit
    console.log("A1")
    this.lista_quiebres_id_dhr_red_incident = this.data.lista_quiebres.id_dhr_red_incident.id;
    console.log("A2")
    console.log("A3")

    this.lista_quiebres_id_dhr_incident_submotivo = this.id_submotivo;

    this.lista_quiebres_quiebre_id_dhr_red_status = this.data.lista_quiebres.id_dhr_red_status.id;
    this.data.lista_quiebres.id_dhr_red_incident = this.lista_quiebres_id_dhr_red_incident;
    this.data.lista_quiebres.id_dhr_incident_submotivo = this.lista_quiebres_id_dhr_incident_submotivo;
    this.data.lista_quiebres.id_dhr_red_status = 3

    this.data.lista_quiebres.situacion_quiebre = "Tercera"

    this.incidentsService.updateIncident_Details(this.data.lista_quiebres).subscribe(
      (res) => {
        // console.log('Fin de Atención', res);
        this.afterCloseDialogFin(true);
      },
      (err) => {
        this.afterCloseDialogFin(false);
        console.log(err)}
    );
  }
}
