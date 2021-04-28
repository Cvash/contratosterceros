import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeGeneralComponent } from './home-general/home-general.component';
import { HomeGeneralRoutingModule } from './home-general-routing.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [HomeGeneralComponent],
  imports: [
    CommonModule,
    HomeGeneralRoutingModule
    ]
})
export class HomeGeneralModule { }
