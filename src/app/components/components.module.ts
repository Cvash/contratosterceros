import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [SidebarComponent, NavbarComponent],
  imports: [
    CommonModule,
    
  ]
})
export class ComponentsModule { }
