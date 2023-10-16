import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, orderBy, query } from '@angular/fire/firestore';
import { doc, onSnapshot } from "firebase/firestore";

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Mensaje } from './mensaje';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private mensajesRef = collection(this.fs, 'chat');
  private mensajes: Mensaje[] = [];
  private unsubscribeChat: any;

  constructor( private fs: Firestore ) {}


  enviarMensaje( nombre: string, mensaje: string ) {

    const d = new Date();
    let fecha: string = d.toLocaleString("es-CL");

    addDoc( this.mensajesRef, <Mensaje> {
        fecha: fecha,
        usuario: nombre,
        mensaje: mensaje
      });
  }

  iniciarMensajes() {
    this.mensajes = [];

    const mensajesOrdenados = query(
        this.mensajesRef,
        orderBy('fecha')
      );

    this.unsubscribeChat = onSnapshot( mensajesOrdenados, (snapshot) => {
    
      snapshot.docChanges().forEach( (cambio) => {
        this.mensajes.push(cambio.doc.data() as Mensaje);
      });

    });
  }

  cerrarMensajes() {
    this.unsubscribeChat();
  }

  // Obtiene la collección desde firestore
  get getMensajes() : Mensaje[] {
    return this.mensajes;
  }








}
