import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { InfoClase } from 'src/app/interfaces';
import { CApisService } from 'src/app/services/capis.service';

@Component({
  selector: 'app-destalle-clase',
  templateUrl: './destalle-clase.component.html',
  styleUrls: ['./destalle-clase.component.scss'],
})
export class DestalleClaseComponent  implements OnInit {

  @Input() clase:InfoClase = {
    id: 0,
    name: 'NA',
    descripcion: 'NA',
    icono: 'NA',
    code: 'NA',
    created_at: 'NA',
    updated_at: 'NA',
    docente:'Sin docente'
  };

  constructor(private loadCtr:LoadingController, private modalCtr:ModalController, private cliente:CApisService, private alert: AlertController) { }


  ngOnInit() {
    console.log('Detalles de la clase: ', this.clase);
    this.presentLoading();
    setTimeout(() => {
      this.SesionAbierta();
      this.obtenerNombreDocente(this.clase);
     // this.MisClasesCreadas();
    }, 500);

    return;
  }
  
  nombreDocente:string="";

  regresar(){
    this.modalCtr.dismiss()
  }

  async obtenerNombreDocente(clase:InfoClase){
    console.log("Se obtendran el nombre del docente de la clase: " + clase.id);

    var token = await this.cliente.obtenerToken();
    var idClase = clase.id;

    this.cliente.PostObtenerNombreDocente(token, idClase).subscribe(
      response => {

        //console.log(response.Docente);
        this.nombreDocente = response.Docente[0].name;
        
      },
      error =>{
        console.error("Error al obtener el nombre");
        console.log(error)
      }
    )
  }

  async presentLoading() {
    const loading = await this.loadCtr.create({
      message: 'Cargando...',
      duration: 1000,
      spinner: 'bubbles'
    });
    await loading.present();
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
