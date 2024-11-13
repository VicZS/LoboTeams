import { Component, Input, OnInit } from '@angular/core';
import { DetallesClase, InfoClase } from 'src/app/interfaces';
import { ChatClaseComponent } from '../chat-clase/chat-clase.component';
import { CApisService } from 'src/app/services/capis.service';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-chats-clases-inscritas',
  templateUrl: './chats-clases-inscritas.component.html',
  styleUrls: ['./chats-clases-inscritas.component.scss'],
})
export class ChatsClasesInscritasComponent  implements OnInit {

  constructor(private modalCtr:  ModalController,private loadCtr:LoadingController, private alert:AlertController, private cliente:CApisService) { }

  @Input() ListaDeClases:DetallesClase[]=[];

  ngOnInit() {
    return;
  }

  async verDestalles(idClase:number){
    const modal = await this.modalCtr.create({
      component: ChatClaseComponent,
      componentProps:{
        idClase
      }
    });

    modal.present();
  }

}
