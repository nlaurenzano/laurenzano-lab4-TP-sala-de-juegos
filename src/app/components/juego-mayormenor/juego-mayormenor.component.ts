import { Component, OnInit } from '@angular/core';
import { JuegoMayormenorService } from './juego-mayormenor.service';
import { Mazo } from './mazo';
import { Cartas } from './cartas';

// TODO: Ver si es necesario lo de 'providers'

@Component({
  selector: 'app-juego-mayormenor',
  templateUrl: './juego-mayormenor.component.html',
  styleUrls: ['./juego-mayormenor.component.css'],
  providers: [JuegoMayormenorService]
})
export class JuegoMayormenorComponent implements OnInit {

  private deck_id: string;

  public cartasRestantes: number;
  public loader = true;
  public blankCard = "assets/juego-carta-exploration2.png";

  dcards = [];
  mensaje = "¡Bienvenido al juego de Mayor o Menor!";
  jugando = false;

  constructor( private juegoService:JuegoMayormenorService ) {}

  ngOnInit() {
    this.juegoService.startGame()
      .subscribe( (decks: Mazo) => {
        this.deck_id = decks.deck_id;
        this.juegoNuevo();
      });
  }

  juegoNuevo() {
    this.loader = true;

    this.juegoService.newGame( this.deck_id )
      .subscribe(
        ( decks:Mazo ) => {
          // Mezcla el mazo, toma las dos primeras cartas
          this.inicializarMazo();
        });

  }

  // Toma las dos primeras cartas
  inicializarMazo() {
    this.loader = true;
    this.juegoService.drawCardsInit( this.deck_id )
      .subscribe(
        ( cds:Cartas ) => {
          this.cartasRestantes = cds.remaining;

          cds.cards[0].value = this.mapearValores(cds.cards[0].value);
          cds.cards[1].value = this.mapearValores(cds.cards[1].value);

          cds.cards[0].viewCard = false;
          cds.cards[1].viewCard = false;
          cds.cards[0].blankCard = this.blankCard;
          cds.cards[1].blankCard = this.blankCard;
          this.dcards = cds.cards;

          // Muestra la carta izquierda
          this.mostrarCarta(0);

          this.mensaje = "Elija su apuesta para empezar.";
          this.loader = false;
          this.jugando = true;
        });
  }

  // Muestra una carta
  mostrarCarta( cartaId: number) {
    this.dcards[cartaId].viewCard = true;
    this.dcards[cartaId].blankCard = this.dcards[cartaId].images.png;
    // this.dcards = dcards;
  }

  elegirMayor() {
    if ( this.jugando == true ) {
      this.compararCartas( "H" );
    }
  }

  elegirMenor() {
    if ( this.jugando == true ) {
      this.compararCartas( "L" );
    }
  }

  compararCartas( apuesta ) {
    this.jugando = false;
    // Muestra la carta derecha
    this.mostrarCarta(1);
    // console.log(apuesta + ": "+this.dcards[0].value +' - '+ this.dcards[1].value);

    if ( this.dcards[0].value == this.dcards[1].value ) {
      // Son iguales, otra oportunidad
      this.otraOportunidad();
    } else if ( (apuesta == 'H' && this.dcards[0].value < this.dcards[1].value) ||
                (apuesta == 'L' && this.dcards[0].value > this.dcards[1].value) ) {
      this.ganaste();
    } else {
      this.perdiste();
    }
  }

  otraOportunidad() {
    this.mensaje = "¡Son iguales! Tenés otra oportunidad.";
    setTimeout( () => {this.tomarCarta();}, 2000);
  }

  ganaste() {
    if ( this.cartasRestantes == 0 ) {
      this.mensaje = "¡Ganaste el juego!";
    } else {
      this.mensaje = "¡Correcto!";
      setTimeout( () => {this.tomarCarta();}, 2000);
    }
  }

  perdiste() {
    this.mensaje = "¡Incorrecto! Mejor suerte la próxima.";
  }

  tomarCarta() {
    this.loader = true;
    // Pasa la carta de derecha a izquierda y toma otra del mazo
    this.juegoService.drawCard( this.deck_id )
      .subscribe(
        ( cds:Cartas ) => {
          this.cartasRestantes = cds.remaining;
          cds.cards[0].value = this.mapearValores(cds.cards[0].value);
          cds.cards[0].viewCard = false;
          cds.cards[0].blankCard = this.blankCard;

          this.dcards[0] = this.dcards[1];
          this.dcards[1] = cds.cards[0];

          this.loader = false;
          this.jugando = true;
        });
  }

  mapearValores( valor ) : number{
    let resultado: number;
    switch ( valor.toUpperCase() ) {
      case 'ACE':
        resultado = 1;
        break;
      case 'JACK':
        resultado = 11;
        break;
      case 'QUEEN':
        resultado = 13;
        break;
      case 'KING':
        resultado = 13;
        break;
      default:
        resultado = Number(valor);
    }
    return resultado;
  }
  
}
