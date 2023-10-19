import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { JuegoPreguntadosRoutingModule } from './juego-preguntados-routing.module';
import { JuegoPreguntadosComponent } from './juego-preguntados.component';


@NgModule({
  declarations: [
    JuegoPreguntadosComponent
  ],
  imports: [
    CommonModule,
    JuegoPreguntadosRoutingModule,
    HttpClientModule
  ]
})
export class JuegoPreguntadosModule { }
