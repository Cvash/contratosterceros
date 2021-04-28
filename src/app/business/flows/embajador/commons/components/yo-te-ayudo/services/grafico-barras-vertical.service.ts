import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class GraficoBarrasVerticalService {

  chart: [];

  constructor() { }

  initChartVertical(tamano_incident_details_primera, tamano_incident_details_segunda, tamano_incident_details_tercera, primer_label, segundo_label, tercer_label, nombre_grafico, subtitulo_grafico, codigo) {
    this.chart = new Chart(codigo, {
      type: 'bar',
      data: {
        labels: [subtitulo_grafico ],
        datasets: [
          {
            label: primer_label,
            data: [tamano_incident_details_primera],
            backgroundColor:[
              'red',
              'red'
            ],
            fill: false
          },
          {
            label: segundo_label,
            data: [tamano_incident_details_segunda],
            backgroundColor:[
              'green',
            ],
            fill: false
          },
          {
            label: tercer_label,
            data: [tamano_incident_details_tercera],
            backgroundColor:[
              'yellow'
            ],
            fill: false
          }
        ]
      },
      options: {
        title : {
          display: true,
          text: nombre_grafico
        },
        legend: {
          display: true
        },
        scales: {
          xAxes: [
            {
              display: true
            }
          ],
          yAxes: [
            
            {
              display: true,
              stacked: false,
              ticks: {
                beginAtZero: true
              },
            }
          ]
        }
      }
    });

  

  }

  initChartPie(arreglo_cantidad_motivos, labels, nombre_grafico, coloresPie, codigo) {
    this.chart = new Chart(codigo, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: arreglo_cantidad_motivos,
            backgroundColor: coloresPie,
          },
        ]
      },
      options: {
        title: {
          display: true,
          text: nombre_grafico
        },
        responsive: true,
        legend: {
          display: true
        },
      }
    })

  

  }
}
