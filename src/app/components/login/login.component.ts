import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../shared/authentication.service";

// import { Auth, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Auth, getAuth, signInWithEmailAndPassword } from "@angular/fire/auth";
import { Usuario } from '../../shared/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fillEmail: string = '';
  fillClave: string = '';

  constructor( public authenticationService: AuthenticationService ) { }

  ngOnInit() { }

  completarCampos() {
    this.fillEmail = "test1@lab4.com";
    this.fillClave = "password";
  }

}
