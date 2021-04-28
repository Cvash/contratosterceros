import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-emb-dialog-datos-fin-atencion',
  templateUrl: './emb-dialog-datos-fin-atencion.component.html',
  styleUrls: ['./emb-dialog-datos-fin-atencion.component.scss']
})
export class EmbDialogDatosFinAtencionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  }

}
