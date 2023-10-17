import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JuegoPreguntadosService {

  private urlBase: string = 'https://gateway.marvel.com/v1/public/characters';
  private parametros: string;

  constructor( private http:HttpClient ) {
    console.log('constructor de servicio');
    const apiKey = 'bd644a3e62384e81e3ff4382454208b3';
    const hash = 'b2d5430277a8151828b4e0024e40a210';
    const ts = '5';
    this.parametros = 'ts=' + ts + '&apikey=' + apiKey + '&hash=' + hash;
  }

  obtenerDatosIniciales( ) : any {
    const url = this.urlBase + '?limit=1&' + this.parametros;
    // console.log('url: '+url);
    return this.http.get( url, { responseType: 'json' });
  }

  obtenerPersonaje( nro ) : any {
    const url = this.urlBase + '?limit=1' + '&offset=' + nro + '&' + this.parametros;
    // console.log('url: '+url);
    return this.http.get( url, { responseType: 'json' });
  }
}
