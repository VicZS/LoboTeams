import { Component, OnInit } from '@angular/core';
import { UsuarioActividad, Actividad } from '../../interfaces/index';
import { CApisService } from 'src/app/services/capis.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.page.html',
  styleUrls: ['./actividades.page.scss'],
})
export class ActividadesPage implements OnInit {

  constructor(private cliente:CApisService) { }

  ngOnInit(){
    setTimeout(() => {
      this.SesionAbierta();
    }, 500);
    return;
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

  addActividad(){
    console.log('Se Creara una nueva actividad')
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
