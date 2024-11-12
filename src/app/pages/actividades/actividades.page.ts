import { Component, OnInit } from '@angular/core';
import { UsuarioActividad, Actividad, ClaseMisAsignaciones, Asignacion } from '../../interfaces/index';
import { CApisService } from 'src/app/services/capis.service';
import { DetalleActividadComponent } from 'src/app/components/detalle-actividad/detalle-actividad.component';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { DetalleClaseInscritaComponent } from 'src/app/components/detalle-clase-inscrita/detalle-clase-inscrita.component';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.page.html',
  styleUrls: ['./actividades.page.scss'],
})
export class ActividadesPage implements OnInit {

  constructor(private modalCtr:ModalController, private cliente:CApisService, private alert: AlertController, private loadCtr:LoadingController) { }

  ngOnInit(){
    this.presentLoading();
    
    setTimeout(() => {
      this.SesionAbierta();
      this.obtenerTodasActividadesDeTodasLasClases();
    }, 500);
    return;
  }

  // usuarios : UsuarioActividad[] = [{
  //   id:1,
  //   idOnwer:2,
  //   entregado:false,
  //   linkActividadCompletada: ''
  // },{
  //   id:2,
  //   idOnwer:1,
  //   entregado:false,
  //   linkActividadCompletada: ''
  // },{
  //   id:3,
  //   idOnwer:3,
  //   entregado:false,
  //   linkActividadCompletada: ''
  // }]

  // actividades: Actividad[] = [{
  //   id:1,
  //   idOnwer:2,
  //   title:'prueba',
  //   indicaciones:'Esta es una prueba',
  //   fecha:'2024-11-05',
  //   usuariosAsignados:this.usuarios
  // },{
  //   id:2,
  //   idOnwer:2,
  //   title:'prueba2',
  //   indicaciones:'Esta es una prueba2',
  //   fecha:'2024-11-07',
  //   usuariosAsignados:this.usuarios
  // }]

  // addActividad(){
  //   console.log('Se Creara una nueva actividad')
  // }

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

  ActividadesClase: ClaseMisAsignaciones[] = [];


  //////////////////////
  
  async obtenerTodasActividadesDeTodasLasClases(){
    console.log("Se obtendran todas las actividades de la clases");

    var token = await this.cliente.obtenerToken();

    this.cliente.PostObtenerTodasMisActividadesAsignadas(token).subscribe(
      response => {

        //console.log(response);
        this.ActividadesClase = response.Clases;
        console.log(this.ActividadesClase);
        
      },
      error =>{
        console.error("Error cargar las Actividades");
        console.log(error)
      }
    )
  }

  async MostrarDetalle(actividadAux:ClaseMisAsignaciones){

    //console.log(actividadAux);
    
    var AsignacionAux : Asignacion = {
      "id": actividadAux.Asignacion_id,
      "name": actividadAux.Nombre,
      "descripcion": actividadAux.Descripción,
      "date": actividadAux.Fecha,
      "time": "na"
    }

    console.log(AsignacionAux);

    this.MostrarDetallesActividad(AsignacionAux);
  }

  async MostrarDetallesActividad(actividad:Asignacion){
    console.log(actividad);
    const modal = await this.modalCtr.create({
      component: DetalleActividadComponent,
      componentProps:{
        actividad
      }
    });
    modal.present();
  }

  async presentLoading() {
    const loading = await this.loadCtr.create({
      message: 'Cargando...',
      duration: 1000,
      spinner: 'bubbles'
    });
    await loading.present();
  }

}
