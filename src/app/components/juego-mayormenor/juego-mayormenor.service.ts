import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Mazo } from './mazo';
import { Cartas } from './cartas';

@Injectable()
export class JuegoMayormenorService {
	
  constructor( private http:HttpClient ) {}

	newGame( deckId ) : any {
		return this.http.get<Mazo>( "https://deckofcardsapi.com/api/deck/"+ deckId + "/shuffle/", { responseType: 'json' });
	}

	drawCard( deckId ) : any {
	  	return this.http.get<Cartas>( "https://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1", { responseType: 'json' });
	}

	drawCardsInit( deckId ) : any {
	  	return this.http.get<Cartas>( "https://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=2", { responseType: 'json' });
	}

	startGame() : any {
		return this.http.get<Mazo>( "https://deckofcardsapi.com/api/deck/new/shuffle/", { responseType: 'json' });
	}
}
