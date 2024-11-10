import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetallesClase, InfoClase } from 'src/app/interfaces';
import { DetalleClaseInscritaComponent } from '../detalle-clase-inscrita/detalle-clase-inscrita.component';

@Component({
  selector: 'app-clase-inscrita',
  templateUrl: './clase-inscrita.component.html',
  styleUrls: ['./clase-inscrita.component.scss'],
})
export class ClaseInscritaComponent  implements OnInit {

  @Input() ListaDeClases:DetallesClase[]=[];


  constructor(private modalCtr:ModalController) { }

  ngOnInit() {
    return;
  }

  async verDestalles(clase:InfoClase){
    const modal = await this.modalCtr.create({
      component: DetalleClaseInscritaComponent,
      componentProps:{
        clase
      }
    });

    modal.present();

  }

}
