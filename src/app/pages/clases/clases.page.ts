import { Component, OnInit } from '@angular/core';
import { CApisService } from 'src/app/services/capis.service';
import { respuestaAgregarUnirmeClase } from '../../interfaces/index';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {

  constructor(private cliente:CApisService, private alert: AlertController) { }

  ngOnInit() {
    setTimeout(() => {
      this.SesionAbierta();
    }, 500);

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

  async crearClase(nombreClase:string, descripcionClase:string){
    this.SesionAbierta();
    console.log('se creara una clase');

    var token = await this.cliente.obtenerToken();

    this.cliente.PostCrearClase(token, nombreClase, descripcionClase).subscribe(
      response => {

        console.log("clase creada correctamente");

        // console.log(response.Nombre);
        // console.log(response.clase.code);

        this.AlertaExito(response.Nombre, response.clase.code);

      },
      error =>{
        console.error("error no se logro crear la clase");

        this.AlertaError();
      }
    )
    return;
  }

  async unirseClase(codigoClase:string){
    this.SesionAbierta();
    console.log('se unira a una clase');

    var token = await this.cliente.obtenerToken();

    this.cliente.PostUnirmeClase(token, codigoClase).subscribe(
      response => {

        console.log(response.message)

        if(response.message == "Ya estás inscrito en esta clase"){
          this.AlertaErrorUnirse();
        }else{
          console.log("Te has unido correctamente");
          this.AlertaExitoUnirse();
        }
      },
      error =>{
        console.error("error no se logro unir a la clase problema servidor");

        this.AlertaErrorUnirse();
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

  async AlertaExitoUnirse(){

    const Al= await this.alert.create({
      header:"Agregado a la Clase Exitosamente!!!",
      message: "Te has unido correctamente a la clase",
      buttons: ['Cerrar']
    });
    await Al.present();
  }

  async AlertaErrorUnirse(){
    const Al= await this.alert.create({
      header:"Error",
      message: "Ya estas unido a la clase o error del servicio, intente de nuevo.",
      buttons: ['Cerrar']
    });
    await Al.present();
  }

  async AlertaUnirseClase(){
    const Al= await this.alert.create({
      header:"Unirse a una Clase",
      message: "Formularion para unirse a una clase",
      inputs:[{
        name:"codigo",
        id:"codigoClase",
        placeholder: "Codigo de la clase",
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
          console.log(data.codigo);
          
          this.unirseClase(data.codigo)

          console.log(data)
        }
      }]

    });
    await Al.present();
  }

}
