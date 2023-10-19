import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import Toastify from 'toastify-js';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  private instrucciones = 'Se trata del clásico juego del Ahorcado.\n'+
    'Al iniciar el juego, se muestra al jugador un grupo de líneas que indican la cantidad de letras de la palabra a encontrar. '+
    'Las letras se seleccionan desde el teclado en pantalla. Al acertar una palabra completa, se suma un punto. '+
    'Pero también se lleva cuenta de las partidas perdidas.';

  // 'New Game' button events are pushed to this subject.
  public newGameSubject = new Subject() ;

  constructor() {}
  ngOnInit() {}

  // Pass a routine that processes New Game requests.
  consumeNewGame(consumer : () => any) : void {
    this.newGameSubject.asObservable().subscribe(consumer) ;
  }

  mostrarInstrucciones() {
    Toastify({
      text: this.instrucciones,
      duration: 7000,
      position: 'center',
      gravity: 'top',
      offset: { y: '10em' },
      className: 'text-white text-mono w-50',
      close: true,
      stopOnFocus: true,
      style: { background: "#17b06b" }
    }).showToast();
  }
}
