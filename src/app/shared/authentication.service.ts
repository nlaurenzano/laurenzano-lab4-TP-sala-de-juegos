import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { LogService } from './log.service';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import * as auth from 'firebase/auth';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

import Toastify from 'toastify-js';
// import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
// import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(
    public afs: AngularFirestore, // Inyecta Firestore service
    public afAuth: AngularFireAuth, // Inyecta Firebase auth service
    public router: Router,
    public logService: LogService
    ) {
      // Guarda los datos del usuario en localstorage si está logueado
      this.afAuth.authState.subscribe((usuario) => {
        if (usuario) {
          localStorage.setItem('usuario', JSON.stringify(usuario));
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
        // Log de ingreso
        this.logService.signIn(email);
        
        // Redirección
        this.router.navigate(['home']);
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
            // mensaje = error.code;
        }
        // Swal.fire({
        //   title: 'Error',
        //   text: mensaje,
        //   icon: 'error',
        //   confirmButtonText: 'Aceptar'
        // });
        Toastify({
          text: mensaje,
          duration: 3000,
          position: 'center',
          close: true,
          stopOnFocus: true,
          style: { background: "linear-gradient(to right, #f00, #f11)" }
        }).showToast();
      });
  }

  // Registro con email, nombre y clave
  signUp(email: string, nombre: string, clave: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, clave)
      .then((resultado) => {
        resultado.user.updateProfile({ displayName: nombre });
        // .then(...)
        // .catch(...)

        // Log de registro
        this.logService.signUp(email);
        // Redirección
        this.router.navigate(['home']);
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
        // Swal.fire({
        //   title: 'Error',
        //   text: mensaje,
        //   icon: 'error',
        //   confirmButtonText: 'Aceptar'
        // });
        Toastify({
          text: mensaje,
          duration: 3000,
          position: 'center',
          close: true,
          stopOnFocus: true,
          style: { background: "linear-gradient(to right, #f00, #f11)" }
        }).showToast();
      });
  }

  // Devuelve true si el usuario está logueado
  get isLoggedIn(): boolean {
    const usuario = JSON.parse(localStorage.getItem('usuario')!);
    return usuario !== null ? true : false;
  }

  // Devuelve true si el usuario está logueado
  get getUsuarioActual(): string {
    const usuario = JSON.parse(localStorage.getItem('usuario')!);
    return usuario.email;
  }

  signOut() {
    this.afAuth.authState.subscribe((usuario) => {
      if (usuario) {
        // User is signed in
        // Log de salida
        this.logService.signOut(usuario.email);

        localStorage.removeItem('usuario');

        this.afAuth.signOut().then(() => {
          this.router.navigate(['home']);
        });
      }
    });
  }

}
