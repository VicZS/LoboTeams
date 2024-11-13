import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { DetallesClase } from 'src/app/interfaces';
import { CApisService } from 'src/app/services/capis.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  constructor(private loadCtr:LoadingController, 
    private cliente:CApisService, 
    private alert: AlertController) { }

  ngOnInit() {
    this.presentLoading();
    setTimeout(() => {
      this.SesionAbierta();
      this.MisClasesInscritas();
      this.MisClasesCreadas();
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

  ClasesInscritas : DetallesClase[] = [];

  ClasesCreadas : DetallesClase[] = [];

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

  async MisClasesInscritas(){
    var token = await this.cliente.obtenerToken();

    this.cliente.PostVerMisClasesInscritas(token).subscribe(
      response => {
        this.ClasesInscritas = response.Clases

        console.log(this.ClasesInscritas)
        
      },
      error =>{
        console.error("error cargar clases");
        console.log(error)
      }
    )
  }

  async MisClasesCreadas(){
    var token = await this.cliente.obtenerToken();

    this.cliente.PostVerMisClasesCreadas(token).subscribe(
      response => {
        this.ClasesCreadas = response.Clases

        console.log(this.ClasesCreadas)
        
      },
      error =>{
        console.error("error cargar clases");
        console.log(error)
      }
    )
  }

}
