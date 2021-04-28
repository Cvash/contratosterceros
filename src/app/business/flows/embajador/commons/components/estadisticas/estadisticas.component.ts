import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { IncidentsService } from '../yo-te-ayudo/services/incidents.service';
import { GraficoBarrasVerticalService } from '../yo-te-ayudo/services/grafico-barras-vertical.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {

  constructor(private incidentsService: IncidentsService,private graficoBarrasVerticalService : GraficoBarrasVerticalService,) { }

  incidents_details: any = [];
  incidents_details_primera: any = [];
  incidents_details_segunda: any = [];
  incidents_details_tercera: any = [];
  labelsPrueba: any = [];

  labels_pie: any = [];
  colores_pie: any = [];

  incidents_details_1: any;
  incidents_details_2: any;
  incidents_details_3: any;
  incidents_details_4: any;
  incidents_details_5: any;
  incidents_details_6: any;
  incidents_details_7: any;
  incidents_details_8: any;
  incidents_details_9: any;
  incidents_details_10: any;
  incidents_details_11: any;
  incidents_details_12: any;
  incidents_details_13: any;
  incidents_details_14: any;
  incidents_details_15: any;
  incidents_details_16: any;
  incidents_details_17: any;
  incidents_details_18: any;
  incidents_details_19: any;

  arreglo_cantidad_motivos_fake: any

  arreglo_cantidad_motivos: any = [];
  labels_arreglo_cantidad_motivos: any = [];


  arreglo_cantidad_motivos_ordenado: any = [];

  tamano_incident_details_primera: any;
  tamano_incident_details_segunda: any;
  tamano_incident_details_tercera: any;
  
  user: any;
  chart: [];

  ngOnInit(): void {
  
    this.traerQuiebres();
    
    
    
  }

  traerQuiebres() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.incidentsService.getIncidents_Details(this.user.id).subscribe(
      (res) => {  
        this.responseTraerQuiebres(res);
        
        console.log('Incidents', this.incidents_details);
        // console.log('Tamaño motivos ordenado', this.arreglo_cantidad_motivos_ordenado)
        console.log('Tamaño motivos', this.arreglo_cantidad_motivos)

        

        this.initChartQuiebres();
        this.utilizarPie();
        this.utilizarBarVertical();
        this.utilizarBarVertical1();

        
      },
      (err) => console.log(err)
    );
  }

  utilizarPie() {
    this.labels_pie = ['a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c' ];
    this.colores_pie = ['Green', 'Blue', 'Black', 'Yellow', 'Brown', 'Pink', 'Green', 'Blue', 'Black', 'Yellow', 'Brown', 'Pink', 'Green', 'Blue', 'Black', 'Yellow', 'Brown', 'Pink'];

    //  this.graficoBarrasVerticalService.initChartPie(this.arreglo_cantidad_motivos, this.labels_pie, "Total Motivos", this.colores_pie, 'canvas4');
  }

  utilizarBarVertical() {
     this.graficoBarrasVerticalService.initChartVertical(this.arreglo_cantidad_motivos_ordenado[1], this.arreglo_cantidad_motivos_ordenado[2], this.arreglo_cantidad_motivos_ordenado[3], "No atendidos", "En proceso", "Finalizados", "Motivos", "Motivos" ,'canvas2');
  }

  utilizarBarVertical1() {
    this.graficoBarrasVerticalService.initChartVertical(this.tamano_incident_details_primera, this.tamano_incident_details_segunda, this.tamano_incident_details_tercera, "No atendidos", "En proceso", "Finalizados", "Total Quiebres", "Quiebres" ,'canvas');
  }

   initChartQuiebres() {
     this.chart = new Chart('canvas3', {
       type: 'doughnut',
       data: {
         labels: this.labels_arreglo_cantidad_motivos,
         datasets: [
           {
             data: this.arreglo_cantidad_motivos,
             backgroundColor:[
               'red',
               'blue',
               'green',
               'gray',
               '#16ba21',
               'rgba(126, 223, 43, 0.4)',
               'rgba(126, 223, 43, 0.4)',
               'rgba(107, 151, 60, 0.5)',
               'rgba(174, 125, 84, 0.9)',
               'rgba(80, 47, 176, 0.5)',
               'rgba(103, 2, 122, 0.1)',
               'rgba(250, 214, 4, 0.3)',
               'rgba(149, 225, 110, 0.6)',
               'rgba(55, 117, 108, 0.9)',
               'rgba(241, 62, 183, 1)',
               'rgba(186, 77, 41, 0.3)',
               'rgba(45, 250, 93, 0.7)',
               'rgba(240, 172, 49, 0.7)',


               
             ],
           },
         ]
       },
       options: {
         title: {
           display: true,
           text: 'Motivos'
         },
         responsive: true,
         legend: {
           display: true
         },
       }
     })
   }
    
  

  responseTraerQuiebres(res) {
    this.incidents_details = res;

    this.incidents_details_primera = this.incidents_details.filter((item) => item.situacion_quiebre == "Primera")
    this.incidents_details_segunda = this.incidents_details.filter((item) => item.situacion_quiebre == "Segunda")
    this.incidents_details_tercera = this.incidents_details.filter((item) => item.situacion_quiebre == "Tercera")

    this.tamano_incident_details_primera = this.incidents_details_primera.length;
    this.tamano_incident_details_segunda = this.incidents_details_segunda.length;
    this.tamano_incident_details_tercera = this.incidents_details_tercera.length;

    this.incidents_details_1 = this.incidents_details.filter((item) => item.id_dhr_incident_submotivo.id_dhr_incident_motivo.name == "Incremento de precio").length; 
    this.incidents_details_2 = this.incidents_details.filter((item) => item.id_dhr_incident_submotivo.id_dhr_incident_motivo.name == "Facturación").length;
    this.incidents_details_3 = this.incidents_details.filter((item) => item.id_dhr_incident_submotivo.id_dhr_incident_motivo.name == "Internet - Configuraciones").length;
    this.incidents_details_4 = this.incidents_details.filter((item) => item.id_dhr_incident_submotivo.id_dhr_incident_motivo.name == "Internet - Intermitencia / Lentitud").length;
    this.incidents_details_5 = this.incidents_details.filter((item) => item.id_dhr_incident_submotivo.id_dhr_incident_motivo.name == "Internet - No navega").length;
    this.incidents_details_6 = this.incidents_details.filter((item) => item.id_dhr_incident_submotivo.id_dhr_incident_motivo.name == "Equipamiento").length;
    this.incidents_details_7 = this.incidents_details.filter((item) => item.id_dhr_incident_submotivo.id_dhr_incident_motivo.name == "Voz - Problemas").length;
    this.incidents_details_8 = this.incidents_details.filter((item) => item.id_dhr_incident_submotivo.id_dhr_incident_motivo.name == "TV - Problema con audio").length;
    this.incidents_details_9 = this.incidents_details.filter((item) => item.id_dhr_incident_submotivo.id_dhr_incident_motivo.name == "TV - Mala señal").length;
    this.incidents_details_10 = this.incidents_details.filter((item) => item.id_dhr_incident_submotivo.id_dhr_incident_motivo.name == "TV - Sin señal").length;
    this.incidents_details_11 = this.incidents_details.filter((item) => item.id_dhr_incident_submotivo.id_dhr_incident_motivo.name == "Averias Masivas / TTPP").length;
    this.incidents_details_12 = this.incidents_details.filter((item) => item.id_dhr_incident_submotivo.id_dhr_incident_motivo.name == "Problemas técnicos").length;
    this.incidents_details_13 = this.incidents_details.filter((item) => item.id_dhr_incident_submotivo.id_dhr_incident_motivo.name == "Consultas").length;
    this.incidents_details_14 = this.incidents_details.filter((item) => item.id_dhr_incident_submotivo.id_dhr_incident_motivo.name == "Solicitudes / Pedidos").length;
    this.incidents_details_15 = this.incidents_details.filter((item) => item.id_dhr_incident_submotivo.id_dhr_incident_motivo.name == "Baja / Migra Down").length;
    this.incidents_details_16 = this.incidents_details.filter((item) => item.id_dhr_incident_submotivo.id_dhr_incident_motivo.name == "Otras llamadas / Atenciones").length;
    this.incidents_details_17 = this.incidents_details.filter((item) => item.id_dhr_incident_submotivo.id_dhr_incident_motivo.name == "Estado de pedido").length;
    this.incidents_details_18 = this.incidents_details.filter((item) => item.id_dhr_incident_submotivo.id_dhr_incident_motivo.name == "Sin motivo").length;
    this.incidents_details_19 = this.incidents_details.filter((item) => item.id_dhr_incident_submotivo.id_dhr_incident_motivo.name == "Sin asignar").length;
 
    this.arreglo_cantidad_motivos.push(this.incidents_details_1);
    this.arreglo_cantidad_motivos.push(this.incidents_details_2);
    this.arreglo_cantidad_motivos.push(this.incidents_details_3);
    this.arreglo_cantidad_motivos.push(this.incidents_details_4);
    this.arreglo_cantidad_motivos.push(this.incidents_details_5);
    this.arreglo_cantidad_motivos.push(this.incidents_details_6);
    this.arreglo_cantidad_motivos.push(this.incidents_details_7);
    this.arreglo_cantidad_motivos.push(this.incidents_details_8);
    this.arreglo_cantidad_motivos.push(this.incidents_details_9);
    this.arreglo_cantidad_motivos.push(this.incidents_details_10);
    this.arreglo_cantidad_motivos.push(this.incidents_details_11);
    this.arreglo_cantidad_motivos.push(this.incidents_details_12);
    this.arreglo_cantidad_motivos.push(this.incidents_details_13);
    this.arreglo_cantidad_motivos.push(this.incidents_details_14);
    this.arreglo_cantidad_motivos.push(this.incidents_details_15);
    this.arreglo_cantidad_motivos.push(this.incidents_details_16);
    this.arreglo_cantidad_motivos.push(this.incidents_details_17);
    this.arreglo_cantidad_motivos.push(this.incidents_details_18);
    // this.arreglo_cantidad_motivos.push(this.incidents_details_19);


    this.labels_arreglo_cantidad_motivos.push("Incremento de precio");
    this.labels_arreglo_cantidad_motivos.push("Facturación");
    this.labels_arreglo_cantidad_motivos.push("Internet - Configuraciones");
    this.labels_arreglo_cantidad_motivos.push("Internet - Intermitencia / Lentitud");
    this.labels_arreglo_cantidad_motivos.push("Internet - No navega");
    this.labels_arreglo_cantidad_motivos.push("Equipamiento");
    this.labels_arreglo_cantidad_motivos.push("Voz - Problemas");
    this.labels_arreglo_cantidad_motivos.push("TV - Problema con audio");
    this.labels_arreglo_cantidad_motivos.push("TV - Mala señal");
    this.labels_arreglo_cantidad_motivos.push("TV - Sin señal");
    this.labels_arreglo_cantidad_motivos.push("Averias Masivas / TTPP");
    this.labels_arreglo_cantidad_motivos.push("Problemas técnicos");
    this.labels_arreglo_cantidad_motivos.push("Consultas");
    this.labels_arreglo_cantidad_motivos.push("Solicitudes / Pedidos");
    this.labels_arreglo_cantidad_motivos.push("Baja / Migra Down");
    this.labels_arreglo_cantidad_motivos.push("Otras llamadas / Atenciones");
    this.labels_arreglo_cantidad_motivos.push("Estado de pedido");
    this.labels_arreglo_cantidad_motivos.push("Sin motivo");
    // this.labels_arreglo_cantidad_motivos.push("Sin asignar");

    this.arreglo_cantidad_motivos_fake = this.labels_arreglo_cantidad_motivos
    // this.arreglo_cantidad_motivos_ordenado = this.arreglo_cantidad_motivos_fake.sort(function(a,b){return a - b;}).reverse();
  }








  

  

}
