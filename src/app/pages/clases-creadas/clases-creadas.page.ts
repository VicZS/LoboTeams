import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DetallesClase } from 'src/app/interfaces';
import { CApisService } from 'src/app/services/capis.service';

@Component({
  selector: 'app-clases-creadas',
  templateUrl: './clases-creadas.page.html',
  styleUrls: ['./clases-creadas.page.scss'],
})
export class ClasesCreadasPage implements OnInit {

  constructor(private cliente:CApisService, private alert: AlertController) { }

  ngOnInit() {
    setTimeout(() => {
      this.SesionAbierta();
      this.MisClasesCreadas();
    }, 500);

  }

  ClasesCreadasU : DetallesClase[] = [];

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

  async crearClase(nombreClase:string, descripcionClase:string){
    this.SesionAbierta();
    console.log('se creara una clase');

    var token = await this.cliente.obtenerToken();

    this.cliente.PostCrearClase(token, nombreClase, descripcionClase).subscribe(
      response => {

        console.log("clase creada correctamente");

        // console.log(response.Nombre);
        // console.log(response.clase.code);
        this.MisClasesCreadas()

        this.AlertaExito(response.Nombre, response.clase.code);

      },
      error =>{
        console.error("error no se logro crear la clase");

        this.AlertaError();
      }
    )
    return;
  }

  async AlertaExito(nombreClase:string, codigoClase:string){

    const Al= await this.alert.create({
      header:"Clase Creada Exitosamente!!!",
      message: "La clase "+nombreClase+" se creo exitosamente.\n Codigo de la clase: "+codigoClase,
      buttons: ['Cerrar']
    });
    await Al.present();
  }

  async AlertaError(){
    const Al= await this.alert.create({
      header:"Error",
      message: "Clase repetida o error del servicio, intente de nuevo.",
      buttons: ['Cerrar']
    });
    await Al.present();
  }

  async AlertaCrearClase(){
    const Al= await this.alert.create({
      header:"Crear Clase",
      message: "Formularion para crear una clase",
      inputs:[{
        name:"nombre",
        id:"nombreClase",
        placeholder: "Nombre de la clase",
        type:"text"
      },{
        name:"descripcion",
        id:"descripcionClase",
        placeholder: "Descripcion de la clase",
        type:"text"
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
          console.log(data.nombre);
          console.log(data.descripcion);
          
          this.crearClase(data.nombre, data.descripcion)

          console.log(data)
        }
      }]

    });
    await Al.present();
  }

  async MisClasesCreadas(){
    var token = await this.cliente.obtenerToken();

    this.cliente.PostVerMisClasesCreadas(token).subscribe(
      response => {
        this.ClasesCreadasU = response.Clases

        console.log(this.ClasesCreadasU)
        
      },
      error =>{
        console.error("error cargar clases");
        console.log(error)
      }
    )
  }

  

}
