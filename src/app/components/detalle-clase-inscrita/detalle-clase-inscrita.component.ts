import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Asignacion, ClaseAsignacion, InfoClase } from 'src/app/interfaces';
import { CApisService } from 'src/app/services/capis.service';
import { DetalleActividadComponent } from '../detalle-actividad/detalle-actividad.component';

@Component({
  selector: 'app-detalle-clase-inscrita',
  templateUrl: './detalle-clase-inscrita.component.html',
  styleUrls: ['./detalle-clase-inscrita.component.scss'],
})
export class DetalleClaseInscritaComponent  implements OnInit {

  constructor(private loadCtr:LoadingController, private modalCtr:ModalController, private cliente:CApisService, private alert: AlertController) { }

  ngOnInit() {
    this.presentLoading();
    setTimeout(() => {
      this.SesionAbierta();
      this.obtenerTodasActividadesClase(this.clase);
      this.obtenerNombreDocente(this.clase);
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

  nombreDocente:string="";

  ActividadesClase: ClaseAsignacion[] = [];
  

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

  async obtenerNombreDocente(clase:InfoClase){
    console.log("Se obtendran el nombre del docente de la clase: " + clase.id);

    var token = await this.cliente.obtenerToken();
    var idClase = clase.id;

    this.cliente.PostObtenerNombreDocente(token, idClase).subscribe(
      response => {

        //console.log(response.Docente);
        this.nombreDocente = response.Docente[0].name;
        
      },
      error =>{
        console.error("Error al obtener el nombre");
        console.log(error)
      }
    )
  }

}
