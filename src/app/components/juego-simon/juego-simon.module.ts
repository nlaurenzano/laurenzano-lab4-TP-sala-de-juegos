import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegoSimonRoutingModule } from './juego-simon-routing.module';
import { JuegoSimonComponent } from './juego-simon.component';


@NgModule({
  declarations: [
    JuegoSimonComponent
  ],
  imports: [
    CommonModule,
    JuegoSimonRoutingModule
  ]
})
export class JuegoSimonModule { }
