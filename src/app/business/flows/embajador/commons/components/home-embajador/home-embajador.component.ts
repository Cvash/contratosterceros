import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';

@Component({
	selector: 'app-home-embajador',
	templateUrl: './home-embajador.component.html',
	styleUrls: ['./home-embajador.component.scss']
})
export class HomeEmbajadorComponent implements OnInit {
	constructor() {}


	listaUsuarios: any = [];
	diassemana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes']

	ngOnInit(): void {

  	this.animarBoton();
		
	}

	funcionPrueba() {
		console.log("funciona la funcuon del boton")
	}

	animarBoton() {
		var animateButton = function(e) {

			e.preventDefault;
			//reset animation
			e.target.classList.remove('animate');
			
			e.target.classList.add('animate');
			setTimeout(function(){
				e.target.classList.remove('animate');
			},700);
		};
		
		var bubblyButtons = document.getElementsByClassName("bubbly-button");
		
		for (var i = 0; i < bubblyButtons.length; i++) {
			bubblyButtons[i].addEventListener('click', animateButton, false);
		}
	}


}
