import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-emb-dialog-ver-estado',
  templateUrl: './emb-dialog-ver-estado.component.html',
  styleUrls: ['./emb-dialog-ver-estado.component.scss']
})
export class EmbDialogVerEstadoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
