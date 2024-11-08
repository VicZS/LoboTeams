import { Component, OnInit } from '@angular/core';
import { CApisService } from 'src/app/services/capis.service';
import { DetallesClase, InfoClase, respuestaMisClasesCreadas } from '../../interfaces/index';

@Component({
  selector: 'app-todas-clases',
  templateUrl: './todas-clases.page.html',
  styleUrls: ['./todas-clases.page.scss'],
})
export class TodasClasesPage implements OnInit {

  constructor(private cliente:CApisService) { }

  ngOnInit() {

    setTimeout(() => {
      this.SesionAbierta();
      this.ObtenerClasesExistentes();
    }, 500);

    return;
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

}
