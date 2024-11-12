import { Component, OnInit } from '@angular/core';
import { Actividad, UsuarioActividad } from 'src/app/interfaces';
import { AlertController, LoadingController } from '@ionic/angular';
import { CApisService } from 'src/app/services/capis.service';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.page.html',
  styleUrls: ['./actividad.page.scss'],
})
export class ActividadPage implements OnInit {

  constructor(private loadCtr:LoadingController, private alert:AlertController, private cliente:CApisService) { }

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

  usuarios : UsuarioActividad[] = [{
    id:1,
    idOnwer:2,
    entregado:false,
    linkActividadCompletada: ''
  },{
    id:2,
    idOnwer:1,
    entregado:false,
    linkActividadCompletada: ''
  },{
    id:3,
    idOnwer:3,
    entregado:false,
    linkActividadCompletada: ''
  }]

  actividades: Actividad[] = [{
    id:1,
    idOnwer:2,
    title:'prueba',
    indicaciones:'Esta es una prueba',
    fecha:'2024-11-05',
    usuariosAsignados:this.usuarios
  },{
    id:2,
    idOnwer:2,
    title:'prueba2',
    indicaciones:'Esta es una prueba2',
    fecha:'2024-11-07',
    usuariosAsignados:this.usuarios
  }]

  actividad: Actividad={
    id:2,
    idOnwer:2,
    title:'prueba2',
    indicaciones:'Esta es una prueba2',
    fecha:'2024-11-07',
    usuariosAsignados:this.usuarios
  }

  usuario: UsuarioActividad = {
    id:1,
    idOnwer:2,
    entregado:false,
    linkActividadCompletada: ''
  }

  mostrarAlerta(){
    this.Alerta();
  }

  async Alerta(){
    const Al= await this.alert.create({
      header:"Entregar",
      message: "Coloca aqui el link del Archivo(s) o simplemente entrega la actividad, recuerda que el link debe tener el https://",
      inputs:[{
        name:"URL",
        id:"URL",
        placeholder: "Link de la Actividad",
        type:"url"
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
          this.usuario.entregado = true;
          this.usuario.linkActividadCompletada = data.URL;
          console.log(data)
        }
      }]

    });
    await Al.present();
  }

  abrirLink(){
    window.open(this.usuario.linkActividadCompletada, '_blank');
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

}
