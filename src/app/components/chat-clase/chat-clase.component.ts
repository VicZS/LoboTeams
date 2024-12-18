import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AlertController, IonContent, LoadingController, ModalController } from '@ionic/angular';
import { RespuestaVerChatCompleto } from 'src/app/interfaces';
import { CApisService } from 'src/app/services/capis.service';

@Component({
  selector: 'app-chat-clase',
  templateUrl: './chat-clase.component.html',
  styleUrls: ['./chat-clase.component.scss'],
})
export class ChatClaseComponent implements OnInit, OnDestroy {

  constructor(
    private loadCtr: LoadingController,
    private modalCtr: ModalController,
    private cliente: CApisService,
    private alert: AlertController
  ) { }

  private intervaloId: any;

  @Input() idClase: number = 0;
  chatMessages: RespuestaVerChatCompleto[] = [];
  mensajeEscrito: string = '';

  idStudent: number = 0;

  @ViewChild(IonContent) content!: IonContent; 

  ngOnInit() {
    console.log('El id de la clase es: ', this.idClase);
    this.presentLoading();
    this.obtenerMyPerfil();

    setTimeout(() => {
      this.cargarChat();
      this.SesionAbierta();
    }, 500);

    setTimeout(() => {
      this.scrollToBottom();
    }, 1000);

    this.intervaloId = setInterval(() => {
      this.cargarChat();
    }, 2000);
  }

  ngOnDestroy() {
    if (this.intervaloId) {
      clearInterval(this.intervaloId);
    }
  }

  async presentLoading() {
    const loading = await this.loadCtr.create({
      message: 'Cargando...',
      duration: 1000,
      spinner: 'bubbles'
    });
    await loading.present();
  }

  regresar() {
    this.modalCtr.dismiss();
  }

  async SesionAbierta() {
    const SesionA = await this.cliente.obtenerToken();
    if (!SesionA) {
      console.log("Sesión no abierta, redirigiendo...");
      window.location.href = "/";
    }
  }

  numMensajesChat : number = 0;
  chatMessagesAux: RespuestaVerChatCompleto[] = [];
  

  async cargarChat() {
    try {
      this.SesionAbierta();
      const token = await this.cliente.obtenerToken();

      this.cliente.PostObtenerChatCompletoClase(token, this.idClase)
        .subscribe(
          response => {
            console.log("Respuesta obtenida:", response);
            this.chatMessagesAux = Array.isArray(response) ? response : [response];

            if(this.chatMessagesAux.length != this.chatMessages.length){
              this.chatMessages = Array.isArray(response) ? response : [response];
              this.scrollToBottom();
            }

          },
          error => {
            console.error("Hubo un error, intente de nuevo", error);
          }
        );
    } catch (error) {
      console.error("Error al cargar el chat:", error);
      const alert = await this.alert.create({
        header: 'Error',
        message: 'No se pudo cargar el Chat. Intenta nuevamente.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  enviarMensaje() {
    if (this.mensajeEscrito.trim()) {
      this.mandarMensaje(this.mensajeEscrito);
    }
  }

  async mandarMensaje(mensaje: string) {
    try {
      this.SesionAbierta();
      const token = await this.cliente.obtenerToken();

      this.cliente.PostMandarMensaje(token, this.idClase, mensaje)
        .subscribe(
          response => {
            console.log("Mensaje enviado:", response);
            this.cargarChat();
            this.mensajeEscrito = ''; // Limpiar el input después de enviar el mensaje

            setTimeout(() => {
              this.scrollToBottom();
            }, 1000);
          },
          error => {
            console.error("Error al enviar el mensaje", error);
          }
        );
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      const alert = await this.alert.create({
        header: 'Error',
        message: 'No se pudo enviar el mensaje. Intenta nuevamente.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom(300); // Desplaza suavemente hacia el final en 300ms
    }, 100);
  }

  async obtenerMyPerfil() {
    try {
      this.SesionAbierta();
      const token = await this.cliente.obtenerToken();

      this.cliente.PostObtenerMiPerfil(token)
        .subscribe(
          response => {
            console.log("Respuesta obtenida:", response);
            this.idStudent=response.id;

          },
          error => {
            console.error("Hubo un error, intente de nuevo", error);
          }
        );
    } catch (error) {
      console.error("Error al cargar el chat:", error);
      const alert = await this.alert.create({
        header: 'Error',
        message: 'No se pudo obtener el Perfil del Usuario. Intenta nuevamente.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

}
