import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InfoClase } from 'src/app/interfaces';

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


  constructor(private modalCtr:ModalController) { }

  ngOnInit() {
    console.log('Detalles de la clase: ', this.clase)
    return;
  }

  regresar(){
    this.modalCtr.dismiss()
  }

}
