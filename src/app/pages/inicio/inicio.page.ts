import { Component, OnInit } from '@angular/core';
import { CApisService } from 'src/app/services/capis.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private cliente:CApisService) { }

  ngOnInit() {
    setTimeout(() => {
      this.SesionAbierta();
    }, 500);
    return;
  }

  async SesionAbierta(){
    var SesionA = await this.cliente.existeToken();
    if(SesionA){
      window.location.href = "/home";
    }
  }

}
