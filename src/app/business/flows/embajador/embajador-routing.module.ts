import { NgModule } from '@angular/core';
import { HomeEmbajadorComponent } from '../embajador/commons/components/home-embajador/home-embajador.component';
import { MantenimientoComponent } from '../embajador/commons/components/mantenimiento/mantenimiento.component';
import { Routes, RouterModule } from '@angular/router';
import { MovilComponent } from './commons/components/movil/movil.component';
import { MovistarTotalComponent } from './commons/components/movistar-total/movistar-total.component';
import { YoTeAyudoComponent } from './commons/components/yo-te-ayudo/yo-te-ayudo.component';
import { HogarComponent } from './commons/components/hogar/hogar.component';
import { AfiliadosComponent } from './commons/components/afiliados/afiliados.component';
import { EstadisticasComponent } from './commons/components/estadisticas/estadisticas.component';

const routes: Routes = [
	{
		path: 'home',
		component: HomeEmbajadorComponent
	},

	{
		path: 'mantenimiento',
		component: MantenimientoComponent
	},
	{
		path: 'movistar-total',
		component: MovistarTotalComponent
	},
	{
		path: 'hogar',
		component: HogarComponent
	},
	{
		path: 'yo-te-ayudo',
		component: YoTeAyudoComponent
	},
	{
		path: 'movil',
		component: MovilComponent
	},
	{
		path: 'afiliados',
		component: AfiliadosComponent
	},
	{
		path: 'estadisticas',
		component: EstadisticasComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HomeEmbajadorRoutingModule {}
