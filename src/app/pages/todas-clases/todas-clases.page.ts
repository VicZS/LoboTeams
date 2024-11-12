import { Component, OnInit } from '@angular/core';
import { CApisService } from 'src/app/services/capis.service';
import { DetallesClase, InfoClase, respuestaMisClasesCreadas } from '../../interfaces/index';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-todas-clases',
  templateUrl: './todas-clases.page.html',
  styleUrls: ['./todas-clases.page.scss'],
})
export class TodasClasesPage implements OnInit {

  constructor(private loadCtr:LoadingController, private cliente:CApisService, private alert: AlertController) { }

  ngOnInit() {
    this.presentLoading();
    setTimeout(() => {
      this.SesionAbierta();
      this.ObtenerClasesExistentes();
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
  
  TodasClasesExistentes : DetallesClase[] = [];

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

  async ObtenerClasesExistentes(){
    var token = await this.cliente.obtenerToken();

    this.cliente.PostObtenerTodasLasClases(token).subscribe(
      response => {
        this.TodasClasesExistentes = response;
        
        console.log(response)
        
      },
      error =>{
        console.error("error cargar clases");
        console.log(error)
      }
    )
    return;
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

  async unirseClase(codigoClase:string){
    this.SesionAbierta();
    console.log('se unira a una clase');

    var token = await this.cliente.obtenerToken();

    this.cliente.PostUnirmeClase(token, codigoClase).subscribe(
      response => {

        console.log(response.message)

        if(response.message == "Ya estás inscrito en esta clase"){
          this.AlertaErrorUnirse(response.message);
        }else{
          console.log("Te has unido correctamente");
          this.AlertaExitoUnirse();
        }
      },
      error =>{
        console.error("error no se logro unir a la clase problema servidor");

        this.AlertaErrorUnirse("error no se logro unir a la clase problema servidor");
      }
    )
    return;
  }

  async AlertaExitoUnirse(){

    const Al= await this.alert.create({
      header:"Agregado a la Clase Exitosamente!!!",
      message: "Te has unido correctamente a la clase",
      buttons: ['Cerrar']
    });
    await Al.present();
  }

  async AlertaErrorUnirse(mensaje:string){
    const Al= await this.alert.create({
      header:"Error",
      message: mensaje,
      buttons: ['Cerrar']
    });
    await Al.present();
  }

}
