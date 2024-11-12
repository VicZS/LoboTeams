import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { DetallesClase, InfoClase } from 'src/app/interfaces';
import { DetalleClaseInscritaComponent } from '../detalle-clase-inscrita/detalle-clase-inscrita.component';
import { CApisService } from 'src/app/services/capis.service';

@Component({
  selector: 'app-clase-inscrita',
  templateUrl: './clase-inscrita.component.html',
  styleUrls: ['./clase-inscrita.component.scss'],
})
export class ClaseInscritaComponent  implements OnInit {

  @Input() ListaDeClases:DetallesClase[]=[];

  constructor(private modalCtr:  ModalController,private loadCtr:LoadingController, private alert:AlertController, private cliente:CApisService) { }

  ngOnInit() {
    this.presentLoading();
    setTimeout(() => {
      this.SesionAbierta();
    }, 500);
    return;
  }

  async presentLoading() {
    const loading = await this.loadCtr.create({
      message: 'Cargando...',
      duration: 1000,
      spinner: 'bubbles'
    });
    await loading.present();
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

  async verDestalles(clase:InfoClase){
    const modal = await this.modalCtr.create({
      component: DetalleClaseInscritaComponent,
      componentProps:{
        clase
      }
    });

    modal.present();

  }

}
