import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CApisService } from 'src/app/services/capis.service';

@Component({
  selector: 'app-detalle-actividad',
  templateUrl: './detalle-actividad.component.html',
  styleUrls: ['./detalle-actividad.component.scss'],
})
export class DetalleActividadComponent  implements OnInit {

  constructor(private modalCtr:ModalController, private cliente:CApisService, private alert: AlertController) { };

  ngOnInit() {
    setTimeout(() => {
      this.SesionAbierta();
     // this.MisClasesCreadas();
    }, 500);

    //console.log('Detalles de la clase: ', this.clase)
    return;
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

  entregado: boolean = false;
  archivoSeleccionado: File | null = null;
  idAsignacion: number = 1;
  

  cargarArchivo(event: Event) {
    this.SesionAbierta();
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivoSeleccionado = input.files[0];
      console.log("Archivo seleccionado:", this.archivoSeleccionado);
    }
  }

  async entregarActividad() {
    this.SesionAbierta();
    // Verificar si hay un archivo seleccionado
    if (!this.archivoSeleccionado) {
      const alert = await this.alert.create({
        header: 'Error',
        message: 'Por favor selecciona un archivo antes de entregar la actividad.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
  
    try {
      // Obtener el token
      const token = await this.cliente.obtenerToken();
      if (!token) {
        throw new Error("No se pudo obtener el token de sesión.");
      }
  
      // Llamar a la función del servicio y pasarle los parámetros
      this.cliente.PostEntregarAsignacion(token, this.archivoSeleccionado, this.idAsignacion)
        .subscribe(
          async response => {
            console.log("Actividad entregada exitosamente:", response);
            this.entregado = true;
            const alert = await this.alert.create({
              header: 'Éxito',
              message: 'Actividad entregada correctamente.',
              buttons: ['OK']
            });
            await alert.present();
          },
          async error => {
            console.error("Error al entregar la actividad:", error);
            const alert = await this.alert.create({
              header: 'Error',
              message: 'Hubo un error al entregar la actividad. Inténtalo de nuevo.',
              buttons: ['OK']
            });
            await alert.present();
          }
        );
  
    } catch (error) {
      console.error("Error en la entrega de actividad:", error);
      const alert = await this.alert.create({
        header: 'Error',
        message: 'No se pudo entregar la actividad. Intenta nuevamente.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
  
  
}
