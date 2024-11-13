import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { RespuestaMiPerfil } from 'src/app/interfaces';
import { CApisService } from 'src/app/services/capis.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private loadCtr: LoadingController,
    private modalCtr: ModalController,
    private cliente: CApisService,
    private alert: AlertController
  ) { }

  ngOnInit() {

    setTimeout(() => {
      this.SesionAbierta();
      this.obtenerMyPerfil();
    }, 500);

    return;
  }

  Salir(){
    this.SesionAbierta();
    this.BorrarT();
    window.location.href = "/inicio";
  }

  async BorrarT(){
    await this.cliente.eliminarToken();
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

  studentInfo : RespuestaMiPerfil = {
    id: 0,
    name: "",
    email:"",
    password: "",
    created_at: "",
    updated_at: ""
  }

  async obtenerMyPerfil() {
    try {
      this.SesionAbierta();
      const token = await this.cliente.obtenerToken();

      this.cliente.PostObtenerMiPerfil(token)
        .subscribe(
          response => {
            console.log("Respuesta obtenida:", response);
            this.studentInfo=response;

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

  async mostrarPerfil(){
    const alert = await this.alert.create({
      header: 'Perfil ' + this.studentInfo.name,
      message: this.studentInfo.email,
      buttons: ['OK']
    });
    await alert.present();
  }

}
