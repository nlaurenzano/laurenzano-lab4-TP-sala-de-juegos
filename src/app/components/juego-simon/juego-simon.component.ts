import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-juego-simon',
  templateUrl: './juego-simon.component.html',
  styleUrls: ['./juego-simon.component.css']
})
export class JuegoSimonComponent {

/*
- Al iniciar el juego se calcula un nro aleatorio, que representa un botón
- Se clickean todos los botones correspondientes a los nros calculados, en orden.
- Se espera que el usuario siga la secuencia, validando cada botón.
- Si son todos correctos, se sube el nivel y se agrega otro nro.
- El juego termina cuando el usuario comete un error.
*/

  @ViewChild('boton_1') private boton_1: ElementRef;
  @ViewChild('boton_2') private boton_2: ElementRef;
  @ViewChild('boton_3') private boton_3: ElementRef;
  @ViewChild('boton_4') private boton_4: ElementRef;

  private botones = [];
  private secuencia = [];
  private jugando = false;
  private cantidadOpciones: number = 4;
  private indiceEsperado: number;

  public mensaje = '¡Bienvenido al juego Simón Dice!';
  public nivel: number;

  juegoNuevo() {
    this.botones = [this.boton_1, this.boton_2, this.boton_3, this.boton_4];
    this.jugando = false;
    this.mensaje = '¡Empecemos!';
    this.nivel = 1;
    this.secuencia = [];

    setTimeout( () => {this.iniciarNivel();}, 1000);
  }

  iniciarNivel() {
    if ( this.nivel != 0 ) this.nivel++;

    this.mensaje = 'Prestá atención a la secuencia...';
    this.indiceEsperado = 0;
    this.incrementarSecuencia();
    
    setTimeout( () => {
      this.reproducirSecuencia();
    }, 1000);
  }

  incrementarSecuencia() {
    let nro = Math.floor( Math.random() * this.cantidadOpciones ) + 1;
    this.secuencia.push( nro );
  }

  // Clickea los botones que se indican en la secuencia
  async reproducirSecuencia() {
    for ( let indice = 0; indice < this.secuencia.length; indice++ ) {
      let i = this.secuencia[indice] - 1;

      await this.sleep(500);
      this.botones[i].nativeElement.classList.add('active');
      await this.sleep(700);
      this.botones[i].nativeElement.classList.remove('active');

    }

    this.jugando = true;
    this.mensaje = 'Tu turno.';
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  elegirOpcion( opcion ) {

    if ( this.jugando == true ) {
      this.jugando = false;

      if ( opcion == this.secuencia[this.indiceEsperado] ) {
        // Correcto
        if ( this.indiceEsperado == this.secuencia.length - 1 ) {
          // Se completó la secuencia
          // Pasa de nivel
          this.mensaje = '¡Correcto!';
          setTimeout( () => {this.iniciarNivel();}, 1000);

        } else {
          // Se espera otro botón
          this.indiceEsperado++;
            this.jugando = true
        }
      } else {
        // Incorrecto, se termina el juego
        this.mensaje = '¡Juego terminado! Llegaste al nivel ' + this.nivel + '.';
      }
    }
  }
}
