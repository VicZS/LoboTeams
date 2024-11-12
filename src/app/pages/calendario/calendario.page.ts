import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { DetalleActividadComponent } from 'src/app/components/detalle-actividad/detalle-actividad.component';
import { Asignacion, ClaseMisAsignaciones } from 'src/app/interfaces';
import { CApisService } from 'src/app/services/capis.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

  constructor(private loadCtr:LoadingController, private modalCtr:ModalController, private cliente:CApisService, private alert: AlertController) { }

  ngOnInit() {
    this.presentLoading();
    setTimeout(() => {
      this.SesionAbierta();
      this.obtenerTodasActividadesDeTodasLasClases();
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

  

  async MostrarDetalle(actividadAux:ClaseMisAsignaciones){

    //console.log(actividadAux);
    
    var AsignacionAux : Asignacion = {
      "id": actividadAux.Asignacion_id,
      "name": actividadAux.Nombre,
      "descripcion": actividadAux.Descripción,
      "date": actividadAux.Fecha,
      "time": "na"
    }

    console.log(AsignacionAux);

    this.MostrarDetallesActividad(AsignacionAux);
  }

  async MostrarDetallesActividad(actividad:Asignacion){
    console.log(actividad);
    const modal = await this.modalCtr.create({
      component: DetalleActividadComponent,
      componentProps:{
        actividad
      }
    });
    modal.present();
  }

  ActividadesClase: ClaseMisAsignaciones[] = [];

  fechasAntesHoy: string = "";
  fechasHoy: string = "";
  fechasDespuesHoy: string = "";
  highlightedDates = [
    {
      date:'',
      textColor:'',
      backgroundColor:''
    }
  ];


  // async obtenerTodasActividadesDeTodasLasClases(){
  //   console.log("Se obtendran todas las actividades de la clases");

  //   var token = await this.cliente.obtenerToken();
  //   const hoy = new Date().toISOString().split("T")[0];

  //   this.cliente.PostObtenerTodasMisActividadesAsignadas(token).subscribe(
  //     response => {

  //       //console.log(response);
  //       this.ActividadesClase = response.Clases;
  //       console.log(this.ActividadesClase);

  //       this.ActividadesClase.forEach(actividad => {
  //         const fechaActividad = actividad.Fecha;

  //         if (fechaActividad < hoy && !this.fechasAntesHoy.includes(fechaActividad)) {
  //             this.fechasAntesHoy = this.fechasAntesHoy + fechaActividad +",";
  //         } else if (fechaActividad === hoy && !this.fechasHoy.includes(fechaActividad)) {
  //             this.fechasHoy = this.fechasHoy + fechaActividad +",";
  //         } else if (fechaActividad > hoy && !this.fechasDespuesHoy.includes(fechaActividad)) {
  //             this.fechasDespuesHoy = this.fechasDespuesHoy + fechaActividad +",";
  //         }
  //       });
  //       console.log("Fechas anteriores a hoy:", this.fechasAntesHoy);
  //       console.log("Fechas iguales a hoy:", this.fechasHoy);
  //       console.log("Fechas posteriores a hoy:", this.fechasDespuesHoy);
        
  //     },
  //     error =>{
  //       console.error("Error cargar las Actividades");
  //       console.log(error)
  //     }
  //   )
  // }

  async obtenerTodasActividadesDeTodasLasClases() {
    console.log("Se obtendrán todas las actividades de las clases");

    const token = await this.cliente.obtenerToken();
    const hoy = new Date().toLocaleDateString("en-CA"); // Formato 'YYYY-MM-DD'
    console.log(hoy);


    this.cliente.PostObtenerTodasMisActividadesAsignadas(token).subscribe(
        response => {
            this.ActividadesClase = response.Clases;

            // Limpieza de highlightedDates para evitar duplicados
            this.highlightedDates = [];

            // Clasificación y asignación de colores según la fecha
            this.ActividadesClase.forEach(actividad => {
                const fechaActividad = actividad.Fecha;

                // Verificar si la fecha ya existe en highlightedDates
                if (!this.highlightedDates.some(item => item.date === fechaActividad)) {
                    let textColor = '';
                    let backgroundColor = '';

                    if (fechaActividad < hoy) {
                        // Fechas anteriores a hoy
                        textColor = '#8a0000';
                        backgroundColor = '#faaaaa';
                    } else if (fechaActividad === hoy) {
                        // Fechas iguales a hoy
                        textColor = '#007cff';
                        backgroundColor = '#8dc3fd';
                    } else {
                        // Fechas posteriores a hoy
                        textColor = '#36a000';
                        backgroundColor = '#ddfecc';
                    }

                    // Agregar la fecha con los colores correspondientes
                    this.highlightedDates.push({
                        'date': fechaActividad,
                        'textColor': textColor,
                        'backgroundColor': backgroundColor
                    });
                }
            });

            console.log("Fechas destacadas:", this.highlightedDates);
        },
        error => {
            console.error("Error al cargar las Actividades");
            console.log(error);
        }
    );
}

  async presentLoading() {
  const loading = await this.loadCtr.create({
    message: 'Cargando...',
    duration: 1000,
    spinner: 'bubbles'
  });
  await loading.present();
}
  

}
