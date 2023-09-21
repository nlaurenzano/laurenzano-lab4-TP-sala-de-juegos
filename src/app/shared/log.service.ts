import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(
    public afs: AngularFirestore, // Injecta Firestore service
    ) { }

  log(actividad: string, nombre: string) {
    const d = new Date();
    let fecha: string = d.toLocaleString("es-CL");
    
    this.afs.doc(`log/${fecha}`).set({
        fecha: fecha,
        actividad: actividad,
        nombre: nombre
      });
    // .then(() => {
    //     console.log("Log insertado correctamente.");
    // })
    // .catch((error) => {
    //     console.error("Error al insertar log.", error);
    // });

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
