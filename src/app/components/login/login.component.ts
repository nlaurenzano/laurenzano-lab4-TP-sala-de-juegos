import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../shared/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fillEmail: string = '';
  fillClave: string = '';

  private usuarios = ['test2@test.com','test3@lab4.com','test5@lab4.com'];

  constructor( public authenticationService: AuthenticationService ) { }

  ngOnInit(){}

  ngOnDestroy() { }

  completarCampos( id ) {
    this.fillEmail = this.usuarios[id];
    this.fillClave = "password";
  }

}
