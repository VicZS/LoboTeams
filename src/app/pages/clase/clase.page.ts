import { Component, OnInit } from '@angular/core';
import { CApisService } from 'src/app/services/capis.service';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.page.html',
  styleUrls: ['./clase.page.scss'],
})
export class ClasePage implements OnInit {

  constructor(private cliente:CApisService) { }

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

}
