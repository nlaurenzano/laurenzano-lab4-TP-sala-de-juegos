import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../shared/chat.service';
import { AuthenticationService } from '../../shared/authentication.service';

import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  nombre: string;
  textoMensaje: string = '';
  activo: boolean = false;

  constructor( 
    public chatService: ChatService,
    public authenticationService: AuthenticationService
    ) { }

  ngOnInit() {
    this.nombre = this.authenticationService.getUsuarioActual;
  }

  enviarMensaje() {
    if (this.textoMensaje != '') {
      this.chatService.enviarMensaje(this.nombre, this.textoMensaje);
      this.textoMensaje = '';
    }
  }

  validarTecla(event: any) {
   if (event.key === "Enter") {
      this.enviarMensaje();
    }
  }

  // Devuelve true el chat está abierto
  get isActive(): boolean {
    return this.activo;
  }

  toggleActive() {
    this.activo = !this.activo;
  }


}
