import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

import { Usuario } from '../../shared/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
