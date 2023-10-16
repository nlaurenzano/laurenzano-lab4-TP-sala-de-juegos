import { Injectable, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Mazo } from './mazo';
import { Cartas } from './cartas';

// import { Http } from '@angular/http';
// import 'rxjs/add/operator/toPromise';

@Injectable()
export class JuegoMayormenorService {
	
  constructor( private http:HttpClient ) {}

	// newGame( deckId ) : Observable<Mazo> {
	newGame( deckId ) : any {
		return this.http.get<Mazo>( "https://deckofcardsapi.com/api/deck/"+ deckId + "/shuffle/", { responseType: 'json' });
	}

	drawCard( deckId ) : any {
	  	return this.http.get<Cartas>( "http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1", { responseType: 'json' });
	}

	drawCardsInit( deckId ) : any {
	  	return this.http.get<Cartas>( "http://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=2", { responseType: 'json' });
	}

	startGame() : any {
		return this.http.get<Mazo>( "http://deckofcardsapi.com/api/deck/new/shuffle/", { responseType: 'json' });
	}
}
