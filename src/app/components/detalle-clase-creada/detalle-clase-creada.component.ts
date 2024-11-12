import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Asignacion, ClaseAsignacion, InfoClase } from 'src/app/interfaces';
import { CApisService } from 'src/app/services/capis.service';
import { DetalleActividadComponent } from '../detalle-actividad/detalle-actividad.component';
import { DetalleActividadCreadaComponent } from '../detalle-actividad-creada/detalle-actividad-creada.component';

@Component({
  selector: 'app-detalle-clase-creada',
  templateUrl: './detalle-clase-creada.component.html',
  styleUrls: ['./detalle-clase-creada.component.scss'],
})
export class DetalleClaseCreadaComponent  implements OnInit {

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

  constructor(private modalCtr:ModalController, private cliente:CApisService, private alert: AlertController) { }

  ngOnInit() {
    setTimeout(() => {
      this.SesionAbierta();
     // this.MisClasesCreadas();
     this.obtenerTodasActividadesClase(this.clase)
    }, 500);

    console.log('Detalles de la clase: ', this.clase)
    return;
  }

  
  ActividadesClase: ClaseAsignacion[] = [];

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
  
  async AlertaCrearAsignacion(idClase:number){
    const Al= await this.alert.create({
      header:"Crear Asignacion",
      message: "Formularion para crear una Asignacion (recuerda poner fecha y hora de entrega de la asignacion).",
      inputs:[{
        name:"nombre",
        id:"nombreAsignacion",
        placeholder: "Nombre de la Asignacion",
        type:"text"
      },{
        name:"descripcion",
        id:"descripcionAsignacion",
        placeholder: "Descripcion de la Asignacion",
        type:"text"
      },{
        name:"date",
        id:"dateAsignacion",
        placeholder: "Fecha de entrega",
        type:"date"
      },{
        name:"time",
        id:"timeAsignacion",
        placeholder: "Hora de entrega",
        type:"time"
      }],
      buttons: [{
        text:'Cerrar', 
        role:'cancel',
        cssClass:'secondary',
        handler: ()=>{
          console.log("cancelado")
        }
      },{
        text:'Aceptar',
        handler: (data:any)=>{

          if (!data.nombre || !data.descripcion || !data.date || !data.time ) {
            console.log("Todos los campos son obligatorios.");
            this.Alerta("Error", "Todos los campos son obligatorios.");
            console.log(data)
          }else{
            console.log(data)
            this.crearAsignacion(idClase, data.nombre, data.descripcion, data.date, data.time)
          }
        }
      }]

    });
    await Al.present();
  }

  async crearAsignacion(idClase:number, nombreAsignacion:string, descripcionAsignacion:string, fecha:string, time:string ){
    this.SesionAbierta();
    console.log('Se creara una Asignacion');

    var token = await this.cliente.obtenerToken();

    this.cliente.PostCrearAsignacion(token, nombreAsignacion, descripcionAsignacion, fecha, time, idClase).subscribe(
      response => {

        console.log("Asignacion creada correctamente");
        //this.MisClasesCreadas()

        console.log(response);

        this.Alerta("Asignacion Creada!!!", "Asignacion creada correctamente");

      },
      error =>{
        console.error("error no se logro crear la Asignacion");
        console.log(error)

        this.Alerta("Error","error no se logro crear la Asignacion");
      }
    )
    return;
  }

  async Alerta(titulo:string, message:string){

    const Al= await this.alert.create({
      header: titulo,
      message: message,
      buttons: ['Cerrar']
    });
    await Al.present();
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

  async MostrarDetallesActividad(actividad:Asignacion){

    console.log(actividad);
    
    const modal = await this.modalCtr.create({
      component: DetalleActividadCreadaComponent,
      componentProps:{
        actividad
      }
    });

    modal.present();
  }

}
