import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as R from 'ramda';

@Injectable()
export class WordService {

  private static baseUrl() : string {
    const re = new RegExp(/^.*\//);
    // @ts-ignore
    return re.exec(window.location.href)[0];
  }
  private words: Array<string>;

  constructor( private http : HttpClient ) {
    http.get( WordService.baseUrl() + 'assets/juego-ahorcado-palabras.txt', { responseType: 'text' } )
    .pipe(
      map(text => text.toUpperCase()),
      map(text => text.split('\n')),
      map(words => R.map(R.trim, words))
    )
    .subscribe(
      words => this.words = words,
      err => console.error(`Error al cargar la lista de palabras - ${err}.`),
      () => console.log('¡Lista de palabras cargada!')
    );
  }

  // Generate a random integer in range 0 to max.
  private static getRandomInt( max : number ) : number {
    return Math.floor( Math.random() * (max + 1) );
  }

  // A single random word for the 'words' array.
  randomWord() : string {
    let word = 'AHORCADO' ;
    if (0 < this.words.length) {
      const pos : number = WordService.getRandomInt(this.words.length - 1);
      word = this.words[pos];
    }
    return word;
  }
}
