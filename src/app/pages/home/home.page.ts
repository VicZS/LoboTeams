import { Component, OnInit } from '@angular/core';
import { CApisService } from 'src/app/services/capis.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private cliente:CApisService) { }

  ngOnInit() {

    setTimeout(() => {
      this.SesionAbierta();
    }, 500);

    return;
  }

  IrChats(){
    this.SesionAbierta();
    return;
  }

  IrCalendario(){
    this.SesionAbierta();
    window.location.href = "/calendario"
  }

  IrActividades(){
    this.SesionAbierta();
    return;
  }

  IrConfiguracion(){
    this.SesionAbierta();
    return;
  }

  Salir(){
    this.SesionAbierta();
    this.BorrarT();
    window.location.href = "/inicio";
  }

  async BorrarT(){
    await this.cliente.eliminarToken();
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
