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

  entregarActividad(){
    this.entregado = true;
    return;
  }

}
