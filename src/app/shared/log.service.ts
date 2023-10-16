import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private logs = collection(this.fs, 'logs');

  constructor( public fs: Firestore ) { }

  log(actividad: string, nombre: string) {
    const d = new Date();
    let fecha: string = d.toLocaleString("es-CL");
    
    addDoc( this.logs, {
          fecha: fecha,
          actividad: actividad,
          nombre: nombre
        });
  }

  signIn(email: string) {
    this.log("ingreso", email);
  }

  signOut(email: string) {
    this.log("salida", email);
  }

  signUp(email: string) {
    this.log("registro", email);
  }
}
