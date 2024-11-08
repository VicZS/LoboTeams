import { Component, OnInit } from '@angular/core';
import { CApisService } from 'src/app/services/capis.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

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

  highlightedDates = [
    {
      date: '2024-11-05',
      textColor: '#800080',
      backgroundColor: '#ffc0cb',
    },
    {
      date: '2024-11-10',
      textColor: '#09721b',
      backgroundColor: '#c8e5d0',
    },
    {
      date: '2024-11-20',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: 'var(--ion-color-secondary)',
    },
    {
      date: '2024-11-23',
      textColor: 'rgb(68, 10, 184)',
      backgroundColor: 'rgb(211, 200, 229)',
    },
  ];

}
