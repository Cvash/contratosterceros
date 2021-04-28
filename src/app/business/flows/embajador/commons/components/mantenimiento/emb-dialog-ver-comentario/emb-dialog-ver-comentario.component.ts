import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-emb-dialog-ver-comentario',
	templateUrl: './emb-dialog-ver-comentario.component.html',
	styleUrls: ['./emb-dialog-ver-comentario.component.scss']
})
export class EmbDialogVerComentarioComponent implements OnInit {
	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

	ngOnInit(): void {}
}
