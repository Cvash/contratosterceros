import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SupplierHomeComponent } from './components/supplier-home/supplier-home.component';
import { TercerosRoutingModule } from './terceros-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { SupplierFormComponent } from './components/supplier-form/supplier-form.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TDPDirectivesModule } from '@tdp/ng-commons';
import { SupplierFormReactiveService } from './components/supplier-form/supplier-form-reactive.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ModalSignComponentComponent } from './components/modal-sign-component/modal-sign-component.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { SupplierQrComponent } from './components/supplier-qr/supplier-qr/supplier-qr.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MypassComponent } from './components/mypass/mypass.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { SupplierReportSympComponent } from './components/supplier-report-symp/supplier-report-symp.component';
import { SupplierSecurityComponent } from './components/supplier-security/supplier-security.component';
import { SupplierSecurityReactiveService } from './components/supplier-security/supplier-security-reactive.service';
import { SupplierAccessResultComponent } from './components/supplier-access-result/supplier-access-result.component';
import { BlockUIModule } from 'ng-block-ui';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { SupplierAdminCompanyComponent } from './components/supplier-admin-company/supplier-admin-company.component';
import { ModalAddManagerSupplierComponent } from './components/modal-add-manager-supplier/modal-add-manager-supplier.component';
import { ModalAddManagerTdpComponent } from './components/modal-add-manager-tdp/modal-add-manager-tdp.component';
import { SupplierReportDataComponent } from './components/supplier-report-data/supplier-report-data.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SupplierReportReactiveService } from './components/supplier-report-data/supplier-report-reactive.service';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { SupplierAdminReactiveService } from './components/supplier-admin-company/supplier-admin-reactive.service';
import { ModalShowManagerTdpComponent } from './components/modal-show-manager-tdp/modal-show-manager-tdp.component';
import { SupplierAdminSupplierComponent } from './components/supplier-admin-supplier/supplier-admin-supplier.component';
import { ModalEnabledSupplierComponent } from './components/modal-enabled-supplier/modal-enabled-supplier.component';
import { ModalMassiveSupplierComponent } from './components/modal-massive-supplier/modal-massive-supplier.component';
import { ModalAddNewSupplierComponent } from './components/modal-add-new-supplier/modal-add-new-supplier.component';
import { ModalQuestionDeteleComponent } from './components/modal-question-detele/modal-question-detele.component';
import { SupplierAdminSupplierReactiveService } from './components/supplier-admin-supplier/supplier-admin-reactive.service';
import { ZXingScannerModule } from '@moukail/angular-scanner';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [SupplierHomeComponent, SupplierFormComponent, ModalSignComponentComponent,
     SupplierQrComponent, MypassComponent, SupplierReportSympComponent,
      SupplierSecurityComponent, SupplierAccessResultComponent,
       SupplierAdminCompanyComponent, ModalAddManagerSupplierComponent,
        ModalAddManagerTdpComponent, SupplierReportDataComponent, ModalShowManagerTdpComponent, SupplierAdminSupplierComponent, ModalEnabledSupplierComponent, ModalMassiveSupplierComponent, ModalAddNewSupplierComponent, ModalQuestionDeteleComponent],
  imports: [
    CommonModule,
    TercerosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    TDPDirectivesModule,
    MatCheckboxModule,
    SignaturePadModule,
    NgxQRCodeModule,
    MatPaginatorModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    BlockUIModule.forRoot({
			delayStart: 100,
			delayStop: 100
    }),
    NgQrScannerModule,
    ZXingScannerModule
   
  ],
  providers:[
    MatDatepickerModule,
    SupplierAdminReactiveService,
    SupplierFormReactiveService,
    SupplierSecurityReactiveService,
    SupplierReportReactiveService,
    SupplierAdminSupplierReactiveService,
    DatePipe
  ]
})
export class TercerosModule { }
