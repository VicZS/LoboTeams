import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { InfoClase } from 'src/app/interfaces';
import { CApisService } from 'src/app/services/capis.service';

@Component({
  selector: 'app-detalle-clase-inscrita',
  templateUrl: './detalle-clase-inscrita.component.html',
  styleUrls: ['./detalle-clase-inscrita.component.scss'],
})
export class DetalleClaseInscritaComponent  implements OnInit {

  constructor(private modalCtr:ModalController, private cliente:CApisService, private alert: AlertController) { }

  ngOnInit() {
    setTimeout(() => {
      this.SesionAbierta();
     // this.MisClasesCreadas();
    }, 500);

    console.log('Detalles de la clase: ', this.clase)
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

  regresar(){
    this.modalCtr.dismiss()
  }

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

  // async AlertaMostrarActividad(){
  //   const AlertaMostrarA = await this.alert.create({
  //     header:"Tituo de la Actividad",
  //     message: "Detalles de la Actividad. \n Fecha Limite: 11-11-2024 \n Hora: 11:11 \n ",
  //   })
  //   await AlertaMostrarA.present();
  // }

  // async AlertaMostrarActividadEntregada(){
  //   const AlertaMostrarA = await this.alert.create({
  //     header:"Titulo de la Actividad",
  //     subHeader: "Detalles de la Actividad. Fecha Limite: 11-11-2024 Hora Limite: 11:11",
  //     message:"Actividad Entregada: link"
  //   })

  //   await AlertaMostrarA.present();
  // }

  async MostrarActividad(entregada:boolean){
    if(entregada){
      //this.AlertaMostrarActividadEntregada();
      return;
    }else{
      //this.AlertaMostrarActividad();
    }
  }

  // async verDestalles(entregada:boolean){
    
  //   const modal = await this.modalCtr.create({
  //     component: DetalleClaseInscritaComponent,
  //     componentProps:{
  //       clase
  //     }
  //   });

  //   modal.present();
  // }

  // async AlertaCrearAsignacion(){
  //   const Al= await this.alert.create({
  //     header:"Titulo de la Actividad",
  //     message: "Detalles de la Actividad. \n Fecha Limite: 11-11-2024 \n Hora: 11:11 \n Entregas",
  //     inputs:[{
  //       name:"nombre",
  //       id:"nombreAsignacion",
  //       placeholder: "Nombre de la Asignacion",
  //       type:"text"
  //     },{
  //       name:"descripcion",
  //       id:"descripcionAsignacion",
  //       placeholder: "Descripcion de la Asignacion",
  //       type:"text"
  //     },{
  //       name:"date",
  //       id:"dateAsignacion",
  //       placeholder: "Fecha de entrega",
  //       type:"date"
  //     },{
  //       name:"time",
  //       id:"timeAsignacion",
  //       placeholder: "Hora de entrega",
  //       type:"time"
  //     }],
  //     buttons: [{
  //       text:'Cerrar', 
  //       role:'cancel',
  //       cssClass:'secondary',
  //       handler: ()=>{
  //         console.log("cancelado")
  //       }
  //     },{
  //       text:'Aceptar',
  //       handler: (data:any)=>{

  //         if (!data.nombre || !data.descripcion || !data.date || !data.time ) {
  //           console.log("Todos los campos son obligatorios.");
  //           this.Alerta("Error", "Todos los campos son obligatorios.");
  //           console.log(data)
  //         }else{
  //           console.log(data)
  //           //this.crearAsignacion(idClase, data.nombre, data.descripcion, data.date, data.time)
  //         }
  //       }
  //     }]

  //   });
  //   await Al.present();
  // }

  // async crearAsignacion(idClase:number, nombreAsignacion:string, descripcionAsignacion:string, fecha:string, time:string ){
  //   this.SesionAbierta();
  //   console.log('Se creara una Asignacion');

  //   var token = await this.cliente.obtenerToken();

  //   this.cliente.PostCrearAsignacion(token, nombreAsignacion, descripcionAsignacion, fecha, time, idClase).subscribe(
  //     response => {

  //       console.log("Asignacion creada correctamente");
  //       //this.MisClasesCreadas()

  //       console.log(response);

  //       this.Alerta("Asignacion Creada!!!", "Asignacion creada correctamente");

  //     },
  //     error =>{
  //       console.error("error no se logro crear la Asignacion");

  //       this.Alerta("Error","error no se logro crear la Asignacion");
  //     }
  //   )
  //   return;
  // }

  // async Alerta(titulo:string, message:string){

  //   const Al= await this.alert.create({
  //     header: titulo,
  //     message: message,
  //     buttons: ['Cerrar']
  //   });
  //   await Al.present();
  // }

}
