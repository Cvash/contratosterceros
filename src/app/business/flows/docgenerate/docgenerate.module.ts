import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DocgenerateRoutingModule } from './docgenerate-routing.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DocumentGuideComponent } from './components/document-guide/document-guide.component';
import { DocumentHomeComponent } from './components/document-home/document-home.component';
import { ModalDocumentTempComponent } from './components/modal-document-temp/modal-document-temp.component';
import { DocumentStatusComponent } from './components/document-status/document-status.component';
import { ModalPreviewDocComponent } from './components/modal-preview-doc/modal-preview-doc.component';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [DocumentGuideComponent, DocumentHomeComponent, 
    DocumentStatusComponent, ModalDocumentTempComponent, 
    ModalPreviewDocComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    DocgenerateRoutingModule,
    AngularEditorModule,
    MatDialogModule
 
  ]
})
export class DocgenerateModule { }
