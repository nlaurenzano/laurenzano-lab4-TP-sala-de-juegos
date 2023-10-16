import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { PlayGameService } from './playgame.service' ;
import { ControlComponent } from './control/control.component' ;
import { KeyboardComponent } from './keyboard/keyboard.component' ;
import { HangmanComponent } from './hangman/hangman.component' ;

@Component({
  selector: 'app-juego-ahorcado',
  templateUrl: './juego-ahorcado.component.html',
  styleUrls: ['./juego-ahorcado.component.css']
})

export class JuegoAhorcadoComponent  implements AfterViewInit {

  @ViewChild(KeyboardComponent, { static: true }) private keyboardComponent : KeyboardComponent ;
  @ViewChild(ControlComponent, { static: true }) private controlComponent : ControlComponent ;
  @ViewChild(HangmanComponent, { static: true }) private hangmanComponent : HangmanComponent ;

  constructor(private playGameService : PlayGameService) {}

  ngAfterViewInit() : void {
    this.controlComponent.consumeNewGame(this.playGameService.newGame) ;
    this.controlComponent.consumeNewGame(this.keyboardComponent.resetKeyboard) ;
    this.keyboardComponent.consumeLetters(this.playGameService.playLetter) ;
    this.playGameService.consumeBodyParts(this.hangmanComponent.drawBody) ;
  }
}
