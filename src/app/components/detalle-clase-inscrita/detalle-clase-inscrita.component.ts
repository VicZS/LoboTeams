import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Asignacion, ClaseAsignacion, InfoClase } from 'src/app/interfaces';
import { CApisService } from 'src/app/services/capis.service';
import { DetalleActividadComponent } from '../detalle-actividad/detalle-actividad.component';

@Component({
  selector: 'app-detalle-clase-inscrita',
  templateUrl: './detalle-clase-inscrita.component.html',
  styleUrls: ['./detalle-clase-inscrita.component.scss'],
})
export class DetalleClaseInscritaComponent  implements OnInit {

  constructor(private modalCtr:ModalController, private cliente:CApisService, private alert: AlertController) { }

  ngOnInit() {
    setTimeout(() => {
      this.SesionAbierta();
      this.obtenerTodasActividadesClase(this.clase);
     // this.MisClasesCreadas();
    }, 500);

    console.log('Detalles de la clase: ', this.clase)
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

  @Input() clase:InfoClase = {
    id: 0,
    name: 'NA',
    descripcion: 'NA',
    icono: 'NA',
    code: 'NA',
    created_at: 'NA',
    updated_at: 'NA',
    docente:'Sin docente'
  };

  ActividadesClase: ClaseAsignacion[] = [];
  

  async MostrarDetallesActividad(actividad:Asignacion){
    
    const modal = await this.modalCtr.create({
      component: DetalleActividadComponent,
      componentProps:{
        actividad
      }
    });

    modal.present();
  }

  async obtenerTodasActividadesClase(clase:InfoClase){
    console.log("Se obtendran todas las actividades de la clase: " + clase.id);

    var token = await this.cliente.obtenerToken();
    var idClase = clase.id;

    this.cliente.PostAsignacionesClase(token, idClase).subscribe(
      response => {

        console.log(response.Clases);
        this.ActividadesClase = response.Clases;
        console.log(this.ActividadesClase);
        
      },
      error =>{
        console.error("Error cargar las Actividades");
        console.log(error)
      }
    )
  }

}
