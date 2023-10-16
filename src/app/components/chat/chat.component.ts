import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../../shared/chat.service';
import { AuthenticationService } from '../../shared/authentication.service';

import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  @ViewChild('chatcontent') private chatContentContainer: ElementRef;

  nombre: string;
  textoMensaje: string = '';
  activo: boolean = false;

  constructor( 
    public chatService: ChatService,
    public authenticationService: AuthenticationService
    ) { }

  ngOnInit() {
    this.nombre = this.authenticationService.getUsuarioActual;
    this.chatService.iniciarMensajes();
  }

  ngOnDestroy() {
    this.chatService.cerrarMensajes();
  }

  enviarMensaje() {
    if (this.textoMensaje != '') {
      this.chatService.enviarMensaje(this.nombre, this.textoMensaje);
      this.textoMensaje = '';

      setTimeout( () => {this.scrollToBottom();}, 300);
    }
  }

  scrollToBottom(): void {
    try {
        this.chatContentContainer.nativeElement.scrollTop = this.chatContentContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

  // Devuelve true el chat está abierto
  get isActive(): boolean {
    return this.activo;
  }

  toggleActive() {
    this.activo = !this.activo;
  }

}
