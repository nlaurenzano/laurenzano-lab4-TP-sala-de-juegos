import { Injectable } from '@angular/core';
import { Usuario } from './usuario';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import * as auth from 'firebase/auth';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  datosUsuario: any; // Guarda datos del usuario logueado

  constructor(
    public afs: AngularFirestore, // Injecta Firestore service
    public afAuth: AngularFireAuth, // Injecta Firebase auth service
    public router: Router
    ) {
    /* Guarda los datos del usuario en localstorage en log in
    y los setea en null en log out. */
    this.afAuth.authState.subscribe((usuario) => {
      if (usuario) {
        this.datosUsuario = usuario;
        localStorage.setItem('usuario', JSON.stringify(this.datosUsuario));
        JSON.parse(localStorage.getItem('usuario')!);
      } else {
        localStorage.setItem('usuario', 'null');
        JSON.parse(localStorage.getItem('usuario')!);
      }
    });
  }

  // Log in con email/clave
  signIn(email: string, clave: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, clave)
      .then((resultado) => {
        // TODO: log de ingreso

        // Login del usuario y redirección
        this.afAuth.authState.subscribe((usuario) => {
          if (usuario) {
            this.router.navigate(['home']);
          }
        });
      })
      .catch((error) => {
        let mensaje: string;
        switch(error.code) {
          case "auth/invalid-email":
            mensaje = "Formato de correo inválido";
            break;
          case "auth/user-disabled":
            mensaje = "Usuario deshabilitado";
            break;
          default:
            mensaje = "Usuario o clave incorrectos";
        } 
        // TODO: nada de alerts!
        window.alert(mensaje);
      });
  }

  // Registro con email, nombre y clave
  signUp(email: string, nombre: string, clave: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, clave)
      .then((resultado) => {
        this.setDatosUsuario(resultado.user, nombre);
        
        // TODO: log de ingreso

        // Login del usuario y redirección
        this.afAuth.authState.subscribe((usuario) => {
          if (usuario) {
            this.router.navigate(['home']);
          }
        });

      })
      .catch((error) => {
        let mensaje: string;
        switch(error.code) {
          case "auth/invalid-email":
            mensaje = "Formato de correo inválido";
            break;
          case "auth/email-already-in-use":
            mensaje = "El correo ingresado ya está en uso";
            break;
          case "auth/weak-password":
            mensaje = "La clave no es segura";
            break;
          default:
            mensaje = "Ocurrió un error inesperado";
        } 
        // TODO: nada de alerts!
        window.alert(mensaje);
      });
  }

  // Devuelve true si el usuario está logueado
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */

  setDatosUsuario(user: any, nombre: string) {
    const refUsuario: AngularFirestoreDocument<any> = this.afs.doc(
      `usuarios/${user.uid}`
    );
    const datosUsuario: Usuario = {
      uid: user.uid,
      email: user.email,
      nombre: nombre
    };
    return refUsuario.set(datosUsuario, {
      merge: true,
    });
  }

  // Sign out
  signOut() {
    return this.afAuth.signOut().then(() => {
      // TODO: log de salida
      localStorage.removeItem('usuario');
      this.router.navigate(['home']);
    });
  }

}
