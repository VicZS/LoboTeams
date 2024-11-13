import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { RespuestaVerChatCompleto } from 'src/app/interfaces';
import { CApisService } from 'src/app/services/capis.service';

@Component({
  selector: 'app-chat-clase',
  templateUrl: './chat-clase.component.html',
  styleUrls: ['./chat-clase.component.scss'],
})
export class ChatClaseComponent  implements OnInit, OnDestroy {

  constructor(private loadCtr:LoadingController, private modalCtr:ModalController, private cliente:CApisService, private alert: AlertController) { };
  
  private intervaloId: any;

  @Input() idClase:number = 0;
  

  ngOnInit() {
    console.log('El id de la clase es: ', this.idClase)
    this.presentLoading();

    setTimeout(() => {
      this.cargarChat();
      this.SesionAbierta();
    }, 500);

    this.intervaloId = setInterval(() => {
      this.cargarChat();
    }, 2000);

    return;
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

  regresar(){
    this.modalCtr.dismiss()
  }

  async SesionAbierta(){

    var SesionA = await this.cliente.obtenerToken();
    console.log(SesionA);

    if(SesionA){
      console.log("sesion abierta")
    }else{
      console.log("sesion noooo abierta")
      window.location.href = "/";
    }

  }

  chatMessages: RespuestaVerChatCompleto[] = [];


  async cargarChat(){
    try {
      this.SesionAbierta();
      
      var token = await this.cliente.obtenerToken();

      this.cliente.PostObtenerChatCompletoClase(token, this.idClase)
        .subscribe(
          async response => {
            console.log("Respuesta obtenida:", response);
            this.chatMessages = Array.isArray(response) ? response : [response];
            //console.log(this.entregasEstudiantes)
            
          },
          async error => {
            console.error("Hubo un error, intente de nuevo");
            
          }
        );
  
    } catch (error) {
      console.error("Error al cargar las entregas:", error);
      const alert = await this.alert.create({
        header: 'Error',
        message: 'No se pudo cargar el Chat. Intenta nuevamente.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async mandarMensaje(mensaje:string){
    try {
      this.SesionAbierta();

      var token = await this.cliente.obtenerToken();

      this.cliente.PostMandarMensaje(token, this.idClase, mensaje)
        .subscribe(
          async response => {
            console.log("Respuesta obtenida del mensaje enviado:", response);
            this.cargarChat();


          },
          async error => {
            console.error("Hubo un error, intente de nuevo");
            
          }
        );
  
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      const alert = await this.alert.create({
        header: 'Error',
        message: 'No se pudo enviar mensaje al Chat. Intenta nuevamente.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
  
  mensajeEscrito:string = '';
  
  async obtenerMensaje(){

  }

}
