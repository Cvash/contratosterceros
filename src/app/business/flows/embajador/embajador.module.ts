import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantenimientoComponent } from './commons/components/mantenimiento/mantenimiento.component';
import { HomeEmbajadorComponent } from './commons/components/home-embajador/home-embajador.component';
import { HomeEmbajadorRoutingModule } from '../embajador/embajador-routing.module';
import { MovistarTotalComponent } from './commons/components/movistar-total/movistar-total.component';
import { HogarComponent } from './commons/components/hogar/hogar.component';
import { MovilComponent } from './commons/components/movil/movil.component';
import { YoTeAyudoComponent } from './commons/components/yo-te-ayudo/yo-te-ayudo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmbDialogEditarplanComponent } from './commons/components/movistar-total/emb-dialog-editarplan/emb-dialog-editarplan.component';
import { EmbDialogLoquieroComponent } from './commons/components/movistar-total/emb-dialog-loquiero/emb-dialog-loquiero.component';
import { EmbDialogVerComentarioComponent } from './commons/components/mantenimiento/emb-dialog-ver-comentario/emb-dialog-ver-comentario.component';
import { EmbDialogEditarPlanHogarComponent } from './commons/components/hogar/emb-dialog-editar-plan-hogar/emb-dialog-editar-plan-hogar.component';
import { EmbDialogEditarPlanMovilComponent } from './commons/components/movil/emb-dialog-editar-plan-movil/emb-dialog-editar-plan-movil.component';
import { EmbDialogInicioAtencionComponent } from './commons/components/mantenimiento/emb-dialog-inicio-atencion/emb-dialog-inicio-atencion.component';
import { EmbDialogVerDatosEmbajadorComponent } from './commons/components/mantenimiento/emb-dialog-ver-datos-embajador/emb-dialog-ver-datos-embajador.component';
import { EmbDialogNoCorrespondeComponent } from './commons/components/mantenimiento/emb-dialog-no-corresponde/emb-dialog-no-corresponde.component';
import { EmbDialogNoContactoComponent } from './commons/components/mantenimiento/emb-dialog-no-contacto/emb-dialog-no-contacto.component';
import { EmbDialogNoFFTTComponent } from './commons/components/mantenimiento/emb-dialog-no-fftt/emb-dialog-no-fftt.component';
import { EmbDialogFinAtencionComponent } from './commons/components/mantenimiento/emb-dialog-fin-atencion/emb-dialog-fin-atencion.component';
import { EmbDialogDatosFinAtencionComponent } from './commons/components/mantenimiento/emb-dialog-datos-fin-atencion/emb-dialog-datos-fin-atencion.component';
import { AfiliadosComponent } from './commons/components/afiliados/afiliados.component';
import { EmbDialogVerRutasQuiebresComponent } from './commons/components/mantenimiento/emb-dialog-ver-rutas-quiebres/emb-dialog-ver-rutas-quiebres.component';
import { EmbDialogMotivoSubmotivoComponent } from './commons/components/mantenimiento/emb-dialog-motivo-submotivo/emb-dialog-motivo-submotivo.component';
import { MatTableExporterModule } from 'mat-table-exporter';

// Angular Material

import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import { EmbDialogReporteExcelComponent } from './commons/components/mantenimiento/emb-dialog-reporte-excel/emb-dialog-reporte-excel.component';
import { EmbDialogVerEstadoComponent } from './commons/components/yo-te-ayudo/emb-dialog-ver-estado/emb-dialog-ver-estado.component';
import { EmbDialogComentarioDinamicoComponent } from './commons/components/mantenimiento/emb-dialog-comentario-dinamico/emb-dialog-comentario-dinamico.component';
import { EstadisticasComponent } from './commons/components/estadisticas/estadisticas.component';
import { EmbDialogCambiarEstadoComponent } from './commons/components/afiliados/emb-dialog-cambiar-estado/emb-dialog-cambiar-estado.component';
import { EmbDialogAfiliadosReporteComponent } from './commons/components/afiliados/emb-dialog-afiliados-reporte/emb-dialog-afiliados-reporte.component';
@NgModule({
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	declarations: [
		MantenimientoComponent,
		HomeEmbajadorComponent,
		MovistarTotalComponent,
		HogarComponent,
		MovilComponent,
		YoTeAyudoComponent,
		EmbDialogEditarplanComponent,
		EmbDialogLoquieroComponent,
		EmbDialogVerComentarioComponent,
		EmbDialogEditarPlanHogarComponent,
		EmbDialogEditarPlanMovilComponent,
		EmbDialogInicioAtencionComponent,
		EmbDialogVerDatosEmbajadorComponent,
		EmbDialogNoCorrespondeComponent,
		EmbDialogNoContactoComponent,
		EmbDialogNoFFTTComponent,
		EmbDialogFinAtencionComponent,
		EmbDialogDatosFinAtencionComponent,
		AfiliadosComponent,
		EmbDialogVerRutasQuiebresComponent,
		EmbDialogMotivoSubmotivoComponent,
		EmbDialogReporteExcelComponent,
		EmbDialogVerEstadoComponent,
		EmbDialogComentarioDinamicoComponent,
		EstadisticasComponent,
		EmbDialogCambiarEstadoComponent,
		EmbDialogAfiliadosReporteComponent,
	],
	imports: [
    MatTableExporterModule,
		CommonModule,
		HomeEmbajadorRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		MatTableModule,
		MatCardModule,
		MatIconModule,
		MatSortModule,
		MatDialogModule,
		MatCheckboxModule,
		MatStepperModule,
		MatDividerModule,
		MatPaginatorModule,
		MatInputModule,
    MatFormFieldModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
	],
	exports: [
    MatTableExporterModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    MatInputModule,
  ]
})
export class EmbajadorModule {}
