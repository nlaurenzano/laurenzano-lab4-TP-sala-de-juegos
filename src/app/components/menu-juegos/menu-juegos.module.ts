import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuJuegosRoutingModule } from './menu-juegos-routing.module';
import { MenuJuegosComponent } from './menu-juegos.component';


@NgModule({
  declarations: [
    MenuJuegosComponent
  ],
  imports: [
    CommonModule,
    MenuJuegosRoutingModule
  ]
})
export class MenuJuegosModule { }
