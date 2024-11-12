import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Asignacion, RespuestaAsignacionesEntregadasDeMiClaseCreada } from 'src/app/interfaces';
import { CApisService } from 'src/app/services/capis.service';
import { InfoEstudianteEntrega } from '../../interfaces/index';

@Component({
  selector: 'app-detalle-actividad-creada',
  templateUrl: './detalle-actividad-creada.component.html',
  styleUrls: ['./detalle-actividad-creada.component.scss'],
})
export class DetalleActividadCreadaComponent  implements OnInit {

  constructor(private modalCtr:ModalController, private cliente:CApisService, private alert: AlertController) { };

  ngOnInit() {
    setTimeout(() => {
      console.log('Detalles de la actividad: ', this.actividad)
      this.SesionAbierta();
      this.cargarEntregas();
    }, 500);

    return;
  }

  entregasEstudiantes: RespuestaAsignacionesEntregadasDeMiClaseCreada[] = [];

  @Input() actividad : Asignacion={
    id: 0,
    name: "",
    descripcion: "",
    date: "",
    time: ""
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

  regresar(){
    this.modalCtr.dismiss()
  }

  async cargarEntregas(){
    try {
      this.SesionAbierta();
      
      var token = await this.cliente.obtenerToken();

      this.cliente.PostObtenerAsignacionesEntregadasDeMiClaseCreada(token, this.actividad.id)
        .subscribe(
          async response => {
            console.log("Respuesta obtenida:", response);
            this.entregasEstudiantes = Array.isArray(response) ? response : [response];

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
        message: 'No se pudo cargar las entregas. Intenta nuevamente.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  verEntrega(archivo:string){
    window.open(archivo , '_blank');
  }

  async mostrarNombre(nombre:string){
    const alert = await this.alert.create({
      header: 'Nombre del Estudiante',
      message: nombre,
      buttons: ['OK']
    });
    await alert.present();
  }

  async mostrarEmail(email:string){
    const alert = await this.alert.create({
      header: 'Email del Estudiante',
      message: email,
      buttons: ['OK']
    });
    await alert.present();
  }


}
