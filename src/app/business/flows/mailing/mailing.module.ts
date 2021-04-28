import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailingHomeComponent } from './components/mailing-home/mailing-home.component';
import { MailingStatusComponent } from './components/mailing-status/mailing-status.component';
import { ModalFilesComponent } from './components/modal-files/modal-files.component';
import { ModalLinkImageComponent } from './components/modal-link-image/modal-link-image.component';
import { ModalPreviewComponent } from './components/modal-preview/modal-preview.component';
import { ModalTemplatesComponent } from './components/modal-templates/modal-templates.component';
import { MailingGuideComponent } from './components/mailing-guide/mailing-guide.component';
import { MailingRoutingModule } from './mailing-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EscapeHtmlPipe } from './components/modal-preview/keepHTML.pipe';
import { FormsModule } from '@angular/forms';
import { TDPDirectivesModule } from '@tdp/ng-commons';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [MailingHomeComponent, MailingStatusComponent, ModalFilesComponent, 
    ModalLinkImageComponent, ModalPreviewComponent, ModalTemplatesComponent,
    MailingGuideComponent, EscapeHtmlPipe],
  imports: [
    TDPDirectivesModule,MatPaginatorModule,ReactiveFormsModule,MailingRoutingModule,
    FormsModule,MatCardModule,MatButtonModule,MatDialogModule, MatTableModule,MatMenuModule,
    HttpClientModule, AngularEditorModule, MatProgressSpinnerModule,MatInputModule,
    CommonModule,MatProgressBarModule,MatFormFieldModule,MatSelectModule,MatCheckboxModule
  ]
})
export class MailingModule { }
