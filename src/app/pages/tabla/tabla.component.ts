import  {Component, ViewEncapsulation } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { PageEvent } from '@angular/material/paginator';


/* llamamos al service del back */
import { TercerosService } from '../service/terceros.service';

import { MatDialog } from '@angular/material/dialog';
import { DialogContentExampleDialogComponent } from '../popup/dialog-content-example-dialog/dialog-content-example-dialog.component';
import { VerGestoresComponent } from '../popup/ver-gestores/ver-gestores.component';
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
  contagiados: number;
  recuperados: number;
  vacunados: number;
  riesgo: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', subActividad: 'ejemplo', descripcion: 'H', editar:'Hola', numContrato: '1', gestor: 'hola', fechaInicio:'01/01/21', fechaFin: '01/02/21', ftes: '1', estado: 'solido', costoTerceros: '15', comentarios:'mensaje', contactar: 123456, contagiados: 123, recuperados: 123, vacunados: 132, riesgo: 'riesgo'},
 ];


@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent {



  displayedColumns: string[] = ['position', 'name', 'subActividad', 'descripcion', 'editar', 'numContrato', 'gestor', 'fechaInicio', 'fechaFin', 'ftes', 'estado', 'costoTerceros', 'comentarios', 'contactar', 'contagiados', 'recuperados', 'vacunados', 'riesgo'];
  dataSource = ELEMENT_DATA;

  faCoffee = faCoffee;

  constructor(
    public dialog: MatDialog,
    /* Se crea una varaiable del tipo del servcio, en este caso de terceroService y se usa en el ngOnInit */
    private tercerosService: TercerosService,
    ) {}

     listarTerceros: any = [];
     listarContractExp: any = [];

    ngOnInit(): void {
      this.sumaFtes(),
      this.sumaGastoTotal()

     this.listarUsusarios();

    }

    listarUsusarios(){

       /* codigo para el backend el suscribe es para recibir una respuesta y el error */
       this.tercerosService.getTerceros().subscribe(
        (res) =>{
          this.listarTerceros = res;
          console.log(this.listarTerceros);
        }, (err)=> {
          console.log("Error de prueba", err);
       }
      );
    }



/* Inicio de PopUp */
  openDialog(){
    const dialogRef = this.dialog.open( DialogContentExampleDialogComponent );

    dialogRef.afterClosed().subscribe( result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  /* Fin de PopUp */

  verGestores() {
    const ver_gestores = this.dialog.open( VerGestoresComponent );

      ver_gestores.afterClosed().subscribe( result => {
      console.log(`Dialog result: ${result}`)
    });
  }




  /* Inicio de los totales acumulados en en los valores de 1Q, 2Q */
  totalCantTrabajadoresTerciarizados: number = 0;
  totalGastosTotales: number = 0;

  sumaFtes(){
    ELEMENT_DATA.forEach( element => {
      this.totalCantTrabajadoresTerciarizados += Number(element.ftes)
    });
  }

  sumaGastoTotal() {
    ELEMENT_DATA.forEach ( element => {
      this.totalGastosTotales += Number( element.costoTerceros );
    });
  }

  /*  Inicio de la paginacion de la tabla  */

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  /*  Fin de la paginacion de la tabla  */



}
