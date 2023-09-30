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

  constructor( public authenticationService: AuthenticationService ) { }

  ngOnInit(){}

  ngOnDestroy() { }

  completarCampos() {
    this.fillEmail = "test5@lab4.com";
    this.fillClave = "password";
  }

}
