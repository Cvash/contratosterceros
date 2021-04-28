import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CoronavirusAdminComponent } from './components/coronavirus-admin/coronavirus-admin.component';
import { CoronavirusCheckingComponent } from './components/coronavirus-checking/coronavirus-checking.component';
import { CoronavirusHomeComponent } from './components/coronavirus-home/coronavirus-home.component';
import { ModalRelationshipComponent } from './components/modal-relationship/modal-relationship.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoronavirusRoutingModule } from './coronavirus-routing.module';
import { TDPDirectivesModule } from '@tdp/ng-commons';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ModalCoronavirusReportComponent } from './components/modal-coronavirus-report/modal-coronavirus-report.component';
import {MatTableModule} from '@angular/material/table';



@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [CoronavirusHomeComponent, CoronavirusCheckingComponent, CoronavirusAdminComponent, ModalRelationshipComponent, ModalCoronavirusReportComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule,
    CoronavirusRoutingModule,
    TDPDirectivesModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCardModule,
    MatSelectModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers:[
    
    DatePipe,
    {
      provide:MAT_DIALOG_DATA,
      useValue:{}
    }
  ]
})
export class CoronavirusModule { }
