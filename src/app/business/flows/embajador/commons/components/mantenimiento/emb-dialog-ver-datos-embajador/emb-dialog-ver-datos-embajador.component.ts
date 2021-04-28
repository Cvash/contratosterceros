import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-emb-dialog-ver-datos-embajador',
  templateUrl: './emb-dialog-ver-datos-embajador.component.html',
  styleUrls: ['./emb-dialog-ver-datos-embajador.component.scss']
})
export class EmbDialogVerDatosEmbajadorComponent implements OnInit {
  userName : string = "";
  arrayName :any;
  constructor(
              @Inject(MAT_DIALOG_DATA) public data: any
              ) { }

  ngOnInit(): void {
    this.arrayName=this.data.user.relatedParty.name.split("/");
    this.userName=this.arrayName[0]+" "+this.arrayName[1]+" "+this.arrayName[2];
  }

}
