import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-emb-dialog-ver-rutas-quiebres',
  templateUrl: './emb-dialog-ver-rutas-quiebres.component.html',
  styleUrls: ['./emb-dialog-ver-rutas-quiebres.component.scss']
})
export class EmbDialogVerRutasQuiebresComponent implements OnInit {

  constructor(
              @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    // console.log("Element Rutas Quiebres", this.data.lista_quiebres)
  }

}
