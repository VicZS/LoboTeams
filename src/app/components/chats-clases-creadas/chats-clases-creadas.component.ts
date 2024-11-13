import { Component, Input, OnInit } from '@angular/core';
import { DetallesClase } from 'src/app/interfaces';

@Component({
  selector: 'app-chats-clases-creadas',
  templateUrl: './chats-clases-creadas.component.html',
  styleUrls: ['./chats-clases-creadas.component.scss'],
})
export class ChatsClasesCreadasComponent  implements OnInit {

  constructor() { }

  @Input() ListaDeClases:DetallesClase[]=[];

  ngOnInit() {
    return;
  }
  

}
