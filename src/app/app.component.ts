import { Component } from '@angular/core';
import { AuthenticationService } from './shared/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'laurenzano-lab4-TP-sala-de-juegos';

  constructor( public authenticationService: AuthenticationService ) {}

  
}

