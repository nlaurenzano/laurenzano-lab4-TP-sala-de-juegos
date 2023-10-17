import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { JuegoMayormenorRoutingModule } from './juego-mayormenor-routing.module';
import { JuegoMayormenorComponent } from './juego-mayormenor.component';

@NgModule({
  declarations: [
    JuegoMayormenorComponent
  ],
  imports: [
    CommonModule,
    JuegoMayormenorRoutingModule,
    HttpClientModule
  ]
})
export class JuegoMayormenorModule { }
