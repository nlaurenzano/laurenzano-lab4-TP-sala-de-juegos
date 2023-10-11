import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor( public afs: AngularFirestore ) { }

  enviarMensaje(nombre: string, mensaje: string) {

    const d = new Date();
    let fecha: string = d.toLocaleString("es-CL");
    
    this.afs.doc(`chat/${fecha}`).set({
        fecha: fecha,
        usuario: nombre,
        mensaje: mensaje
      });
  }



  // Obtiene la collección desde firestore
  obtenerMensajes() {




  }




}
