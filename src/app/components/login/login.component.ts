import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// import { Auth, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Auth, getAuth, signInWithEmailAndPassword } from "@angular/fire/auth";
import { Usuario } from '../../shared/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  // private  auth: Auth = inject(Auth);
  // user$ = user(this.auth);

  // login() {
  //   signInWithEmailAndPassword(this.auth, this.usuario.nombre, this.usuario.clave)
  //     .then((userCredential) => {
  //       // Signed in 
  //       const user = userCredential.user;
  //       // ...
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //   });
  // }



  usuario = new Usuario();

  ngOnInit() {
    localStorage.setItem('admin','123');
    localStorage.setItem('u01','123');
    localStorage.setItem('u02','123');

    // console.log(localStorage.getItem('admin'));
  }

  validarUsuario() {
    let nombre: string = this.usuario.nombre;

    if ( this.usuario.clave == localStorage.getItem(nombre) ) {
      console.log('Bienvenido ' + nombre);
      this.usuario.nombre = '';
      this.usuario.clave = '';
        // this._router.navigate(['/home'])
    } else {
      console.log('Credenciales inválidas.');
        // this._router.navigate(['/not-found'])
    }
  }

}
