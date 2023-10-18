import { Component, OnInit } from '@angular/core';
import { JuegoPreguntadosService } from './juego-preguntados.service';

@Component({
  selector: 'app-juego-preguntados',
  templateUrl: './juego-preguntados.component.html',
  styleUrls: ['./juego-preguntados.component.css'],
  providers: [JuegoPreguntadosService]
})
export class JuegoPreguntadosComponent implements OnInit {

/*
- Al iniciar se obtiene el nro. total de personajes.
- Se calcula un nro. aleatorio en base al total
- El nro calculado se guarda en un array, para evitar repetirlo.
- Se obtiene el personaje con el nro. calculado y se usa para la pregunta.
*/

  private nroPersonajes: number;
  private nrosUsados = [];
  private opcionesTemp = [];
  private jugando = false;

  private claseBoton = 'btn btn-primary btn-shadow text-mono mb-2';

  private claseBotonDefault = 'btn btn-primary btn-shadow text-mono mb-2';
  private claseBotonCorrecta = this.claseBotonDefault;

  public mensaje = '¡Bienvenido al juego Preguntados, edición Marvel!';
  public loader = false;
  public imagen: string = 'assets/juego-preguntados-logo.png';
  public nombreCorrecto: string;
  public opciones = [];
  public aciertos = 0;
  public preguntasRestantes: number;

  constructor( private juegoService:JuegoPreguntadosService ) {}

  ngOnInit() {
    this.juegoService.obtenerDatosIniciales()
      .subscribe( (resultado) => {
        this.nroPersonajes = resultado.data.total;
      });
  }

  juegoNuevo() {
    this.mensaje = '¡Empecemos!';
    this.loader = true;
    this.nrosUsados = [];
    this.preguntasRestantes = 20;
    this.aciertos = 0;
    this.armarPregunta();
  }

  armarPregunta() {
    this.imagen = '';
    this.opciones = [];
    this.opcionesTemp = [];

    let nro = this.obtenerNroPersonaje();

    // Trae nombre e imagen correctos
    this.obtenerPersonaje( nro );

    // Trae otros 3 nombres para las opciones
    for ( let i = 0; i < 3; i++ ) {
      nro = this.obtenerNroPersonaje();
      this.juegoService.obtenerPersonaje( nro )
        .subscribe(
          ( resultado ) => {
            this.opcionesTemp.push(resultado.data.results[0].name);
            this.armarOpciones();
          });
    }
  }

  // Entrando al mundo de la recursividad tóxica
  obtenerPersonaje( nro ) {
    this.juegoService.obtenerPersonaje( nro)
    .subscribe(
      ( resultado ) => {
        if ( resultado.data.results[0].thumbnail.path.includes('image_not_available') ) {
          // Hay que buscar otro personaje
          // console.log('Hay que buscar otro personaje');
          nro = this.obtenerNroPersonaje();
          this.obtenerPersonaje( nro );

        } else {
          this.nombreCorrecto = resultado.data.results[0].name;
          this.opcionesTemp.push(this.nombreCorrecto);
          console.log(this.nombreCorrecto);
          this.imagen = resultado.data.results[0].thumbnail.path + '.' + resultado.data.results[0].thumbnail.extension;
          console.log(this.imagen);
        }

        this.armarOpciones();
      });
  }

  obtenerNroPersonaje() : number {
    let nro = Math.floor( Math.random() * this.nroPersonajes );

    // Me aseguro que no sea un nro ya usado
    while ( this.nrosUsados.indexOf(nro) != -1 ) {
      nro = Math.floor( Math.random() * this.nroPersonajes );
    }

    this.nrosUsados.push( nro );
    return nro;
  }

  // Si ya están todas las opciones, se desordenan y se guardan en el atributo público
  armarOpciones() {
    if (this.opcionesTemp.length == 4) {
      this.opcionesTemp.sort(function(){return 0.5 - Math.random()}); 
      this.opciones = this.opcionesTemp;
      this.jugando = true;
    }
  }

  elegirOpcion( opcion ) {
    if ( this.jugando == true ) {
      this.jugando = false;
      this.evaluarRespuesta( opcion );
    }
  }

  evaluarRespuesta( opcion ) {
    // this.jugando = false;
    this.preguntasRestantes--;

    if ( this.esCorrecta(opcion) ) {
      this.aciertos++;
      this.mensaje = "¡Correcto!";
    } else {
      this.mensaje = "¡Incorrecto!";
      this.mostrarCorrecta();
    }

    if ( this.preguntasRestantes == 0 ) {
      this.mensaje+= " Juego terminado.";
      this.opciones = [];
    } else {
      setTimeout( () => {this.armarPregunta();}, 1000);
    }
  }

  mostrarCorrecta() {
    const claseResaltar = 'btn btn-warning btn-shadow text-mono mb-2';
    this.claseBotonCorrecta = claseResaltar;
    setTimeout( () => {this.claseBotonCorrecta = this.claseBotonDefault;}, 1000);
  }

  esCorrecta( i ) : boolean {
    return this.opciones[i] == this.nombreCorrecto;
  }

  mostrarClaseBoton( i ) {
    if ( this.esCorrecta(i) ) {
      return this.claseBotonCorrecta;
    } else {
      return this.claseBotonDefault;
    }
  }

}
