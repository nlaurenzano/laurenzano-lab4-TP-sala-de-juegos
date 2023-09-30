import { Component } from '@angular/core';
import { AuthenticationService } from "../../shared/authentication.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  constructor( public authenticationService: AuthenticationService ) { }

  ngOnInit() {}

  ngOnDestroy() {}

}
