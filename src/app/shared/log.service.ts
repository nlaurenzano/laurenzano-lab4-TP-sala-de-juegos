import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(
    public afs: AngularFirestore, // Injecta Firestore service
    ) { }


  log(actividad: string, nombre: string) {

    const d = new Date();
    let fecha: string = d.toDateString() + ' ' + d.getHours() + ':' + d.getMinutes()+ ':' + d.getSeconds();
    
    // TODO: Ver cómo queda este log. Debería generar un ID automáticamente.
    //  Después se podrían ordenar por fecha... entonces no sé para qué me sirve es ID
    // this.afs.doc(`log/${fecha}`).set({
    this.afs.doc(`log`).set({
        fecha: fecha,
        actividad: actividad,
        nombre: nombre
      })
    .then(() => {
        console.log("Log insertado correctamente.");
    })
    .catch((error) => {
        console.error("Error al insertar log.", error);
    });

  }




  logIngreso(usuario: Usuario) {
    let email: string = usuario.email;


    // log();
  }

}
