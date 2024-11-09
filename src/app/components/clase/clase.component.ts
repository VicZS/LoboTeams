import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetallesClase, InfoClase } from 'src/app/interfaces';
import { DestalleClaseComponent } from '../destalle-clase/destalle-clase.component';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.scss'],
})
export class ClaseComponent  implements OnInit {

  @Input() ListaDeClases:DetallesClase[]=[];

  constructor( private modalCtr:ModalController) { }

  ngOnInit() {return;}

  async verDestalles(clase:InfoClase){
    const modal = await this.modalCtr.create({
      component: DestalleClaseComponent,
      componentProps:{
        clase
      }
    });

    modal.present();

  }

}
