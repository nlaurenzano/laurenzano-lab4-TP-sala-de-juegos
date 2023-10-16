import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { WordService } from './word.service';
import { PlayGameService } from './playgame.service';
import { HangmanComponent } from './hangman/hangman.component';
import { ControlComponent } from './control/control.component';
import { StatusComponent } from './status/status.component';
import { WinsComponent } from './wins/wins.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import * as hm from './hangman.helper';

import { JuegoAhorcadoRoutingModule } from './juego-ahorcado-routing.module';
import { JuegoAhorcadoComponent } from './juego-ahorcado.component';

@NgModule({
  declarations: [
    JuegoAhorcadoComponent,
    HangmanComponent,
    ControlComponent,
    KeyboardComponent,
    StatusComponent,
    WinsComponent,
    hm.SpacedPipe
  ],
  imports: [
    CommonModule,
    JuegoAhorcadoRoutingModule,
    HttpClientModule
  ],
  providers: [
    WordService,
    PlayGameService
  ]
})
export class JuegoAhorcadoModule { }
