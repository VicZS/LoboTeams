import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetallesClase, InfoClase } from 'src/app/interfaces';
import { DestalleClaseComponent } from '../destalle-clase/destalle-clase.component';
import { DetalleClaseCreadaComponent } from '../detalle-clase-creada/detalle-clase-creada.component';

@Component({
  selector: 'app-clase-creada',
  templateUrl: './clase-creada.component.html',
  styleUrls: ['./clase-creada.component.scss'],
})
export class ClaseCreadaComponent  implements OnInit {

  @Input() ListaDeClases:DetallesClase[]=[];

  constructor( private modalCtr:ModalController) { }

  ngOnInit() {return;}

  async verDestalles(clase:InfoClase){
    const modal = await this.modalCtr.create({
      component: DetalleClaseCreadaComponent,
      componentProps:{
        clase
      }
    });

    modal.present();

  }

}
