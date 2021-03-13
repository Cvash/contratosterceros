import  {Component, ViewEncapsulation } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';



export interface PeriodicElement {
  position: number;
  name: string;
  subActividad: string;
  descripcion: string;
  editar: string;
  numContrato: string;
  gestor: string;
  fechaInicio: string;
  fechaFin: string;
  ftes: string;
  estado: string;
  costoTerceros: string;
  comentarios: string;
  contactar: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', subActividad: 'ejemplo', descripcion: 'H', editar:'Hola', numContrato: '1', gestor: 'hola', fechaInicio:'01/01/21', fechaFin: '01/02/21', ftes: '132456', estado: 'solido', costoTerceros: '15', comentarios:'mensaje', contactar: 123456},
  {position: 2, name: 'Helium', subActividad: 'ejemplo', descripcion: 'He', editar:'Hola', numContrato: '1', gestor: 'hola', fechaInicio:'01/01/21', fechaFin: '01/02/21', ftes: '132456', estado: 'solido', costoTerceros: '15', comentarios:'mensaje', contactar: 123456},
  {position: 3, name: 'Lithium', subActividad: 'ejemplo', descripcion: 'Li', editar:'Hola', numContrato: '1', gestor: 'hola', fechaInicio:'01/01/21', fechaFin: '01/02/21', ftes: '132456', estado: 'solido', costoTerceros: '15', comentarios:'mensaje', contactar: 123456},
  {position: 4, name: 'Beryllium', subActividad: 'ejemplo', descripcion: 'Be', editar:'Hola', numContrato: '1', gestor: 'hola', fechaInicio:'01/01/21', fechaFin: '01/02/21', ftes: '132456', estado: 'solido', costoTerceros: '15', comentarios:'mensaje', contactar: 123456},
  {position: 5, name: 'Boron', subActividad: 'ejemplo', descripcion: 'B', editar:'Hola', numContrato: '1', gestor: 'hola', fechaInicio:'01/01/21', fechaFin: '01/02/21', ftes: '132456', estado: 'solido', costoTerceros: '15', comentarios:'mensaje', contactar: 123456},
  {position: 6, name: 'Carbon', subActividad: 'ejemplo', descripcion: 'C', editar:'Hola', numContrato: '1', gestor: 'hola', fechaInicio:'01/01/21', fechaFin: '01/02/21', ftes: '132456', estado: 'solido', costoTerceros: '15', comentarios:'mensaje', contactar: 123456},
  {position: 7, name: 'Nitrogen', subActividad: 'ejemplo', descripcion: 'N', editar:'Hola', numContrato: '1', gestor: 'hola', fechaInicio:'01/01/21', fechaFin: '01/02/21', ftes: '132456', estado: 'solido', costoTerceros: '15', comentarios:'mensaje', contactar: 123456},
  {position: 8, name: 'Oxygen', subActividad: 'ejemplo', descripcion: 'O', editar:'Hola', numContrato: '1', gestor: 'hola', fechaInicio:'01/01/21', fechaFin: '01/02/21', ftes: '132456', estado: 'solido', costoTerceros: '15', comentarios:'mensaje', contactar: 123456},
  {position: 9, name: 'Fluorine', subActividad: 'ejemplo', descripcion: 'F', editar:'Hola', numContrato: '1', gestor: 'hola', fechaInicio:'01/01/21', fechaFin: '01/02/21', ftes: '132456', estado: 'solido', costoTerceros: '15', comentarios:'mensaje', contactar: 123456},
  {position: 10, name: 'Neon', subActividad: 'ejemplo', descripcion: 'Ne', editar:'Hola', numContrato: '1', gestor: 'hola', fechaInicio:'01/01/21', fechaFin: '01/02/21', ftes: '132456', estado: 'solido', costoTerceros: '15', comentarios:'mensaje', contactar: 123456},
];


@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent {

  displayedColumns: string[] = ['position', 'name', 'subActividad', 'descripcion', 'editar', 'numContrato', 'gestor', 'fechaInicio', 'fechaFin', 'ftes', 'estado', 'costoTerceros', 'comentarios', 'contactar'];
  dataSource = ELEMENT_DATA;

  faCoffee = faCoffee;

  constructor() { }


  openDialog(){}


}
