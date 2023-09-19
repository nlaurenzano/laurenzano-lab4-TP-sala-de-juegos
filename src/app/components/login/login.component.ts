import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/auth.service";

// import { Auth, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Auth, getAuth, signInWithEmailAndPassword } from "@angular/fire/auth";
import { Usuario } from '../../shared/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public authService: AuthService ) { }

  ngOnInit() { }

}
