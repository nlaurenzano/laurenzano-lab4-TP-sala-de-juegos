import { Injectable } from '@angular/core';
import { Usuario } from './usuario';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
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
        this.setDatosUsuario(resultado.usuario);
        this.afAuth.authState.subscribe((usuario) => {
          if (usuario) {
            this.router.navigate(['home']);
          }
        });
      })
      .catch((error) => {
        // window.alert(error.message);
        window.alert('error en login');
      });
  }

  // Registro con email/clave
  SignUp(email: string, clave: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, clave)
      .then((resultado) => {
        // Llamada a SendVerificaitonMail() cuando se registra un usuario nuevo
        // this.SendVerificationMail();
        this.setDatosUsuario(resultado.usuario);
      })
      .catch((error) => {
        // window.alert(error.message);
        window.alert('error en registro');
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

  setDatosUsuario(usuario: any) {
    const refUsuario: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${usuario.uid}`
    );
    const userData: User = {
      uid: usuario.uid,
      email: usuario.email,
      nombre: usuario.displayName,
    };
    return refUsuario.set(userData, {
      merge: true,
    });
  }

  // Sign out
  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('usuario');
      this.router.navigate(['home']);
    });
  }

}
