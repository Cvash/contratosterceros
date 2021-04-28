import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { ComponentsModule } from './components/components.module';

import { BaseHistoricaComponent } from './pages/base-historica/base-historica.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { GestoresComponent } from './pages/gestores/gestores.component';
import { MapasComponent } from './pages/mapas/mapas.component';
import { PeriodoVigenteComponent } from './pages/periodo-vigente/periodo-vigente.component';
import { TablaComponent } from './pages/tabla/tabla.component';
import { UserComponent } from './pages/user/user.component';
import { DialogContentExampleDialogComponent } from './pages/popup/dialog-content-example-dialog/dialog-content-example-dialog.component';
import { VerGestoresComponent } from './pages/popup/ver-gestores/ver-gestores.component';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    TablaComponent,
    UserComponent,
    DashboardComponent,
    BaseHistoricaComponent,
    PeriodoVigenteComponent,
    MapasComponent,
    GestoresComponent,
    FavoritosComponent,
    DialogContentExampleDialogComponent,
    VerGestoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSliderModule,
    MatTableModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatDialogModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule
  ],
  exports: [
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
