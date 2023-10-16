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
  private totalcurd: number;

  public loader = true;
  public blankCard = "/assets/juego-carta.png";

  dcards = [];
  message = "¡Bienvenido al juego de Mayor o Menor!";

  constructor( private juegoService:JuegoMayormenorService ) {}

  ngOnInit() {
    this.juegoService.startGame()
      .subscribe( (decks: Mazo) => {
        this.deck_id = decks.deck_id;
        this.juegoNuevo();
      });
  }

  juegoNuevo() {
    this.message = "";
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
          this.totalcurd = cds.remaining;

          cds.cards[0].value = this.mapearValores(cds.cards[0].value);
          cds.cards[1].value = this.mapearValores(cds.cards[1].value);

          cds.cards[0].viewCard = false;
          cds.cards[1].viewCard = false;
          cds.cards[0].blankCard = this.blankCard;
          cds.cards[1].blankCard = this.blankCard;
          this.dcards = cds.cards;

          // Muestra la carta izquierda
          this.mostrarCarta(0);
          this.loader = false;
        });
  }

  // Muestra una carta
  mostrarCarta( cartaId: number) {
    this.dcards[cartaId].viewCard = true;
    this.dcards[cartaId].blankCard = this.dcards[cartaId].images.png;
    // this.dcards = dcards;
  }

  elegirMayor() {
    this.compararCartas( "H" );
  }

  elegirMenor() {
    this.compararCartas( "L" );
  }

  compararCartas( apuesta ) {
    // Muestra la carta derecha
    this.mostrarCarta(1);
      console.log(apuesta + ": "+this.dcards[0].value +' - '+ this.dcards[1].value);

    if ( this.dcards[0].value == this.dcards[1].value ) {
      // Son iguales, otra oportunidad
      console.log('otraOportunidad');
      this.otraOportunidad();
    } else if ( (apuesta == 'H' && this.dcards[0].value < this.dcards[1].value) ||
                (apuesta == 'L' && this.dcards[0].value > this.dcards[1].value) ) {
      console.log('ganaste');
      this.ganaste();
    } else {
      console.log('perdiste');
      this.perdiste();
    }
  }

  otraOportunidad() {
    this.message = "¡Son iguales! Tenés otra oportunidad.";
    this.tomarCarta();
  }

  ganaste() {
    this.message = "¡Correcto!";
    this.tomarCarta();
  }

  perdiste() {
    this.message = "¡Incorrecto! Mejor suerte la próxima.";
  }

  tomarCarta() {
    this.loader = true;
    // Pasa la carta de derecha a izquierda y toma otra del mazo
    this.juegoService.drawCard( this.deck_id )
      .subscribe(
        ( cds:Cartas ) => {
          this.totalcurd = cds.remaining;
          cds.cards[0].value = this.mapearValores(cds.cards[0].value);
          cds.cards[0].viewCard = false;
          cds.cards[0].blankCard = this.blankCard;

          this.dcards[0] = this.dcards[1];
          this.dcards[1] = cds.cards[0];

          this.loader = false;
        });
  }

  mapearValores( valor ) : number{
    switch ( valor.toUpperCase() ) {
      case 'ACE':
        return 1;
        break;
      case 'JACK':
        return 11;
        break;
      case 'QUEEN':
        return 13;
        break;
      case 'KING':
        return 13;
        break;
      default:
        return valor;
    }
  }
  
}
