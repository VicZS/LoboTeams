import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ClaseComponent } from './clase/clase.component';
import { DestalleClaseComponent } from './destalle-clase/destalle-clase.component';
import { DetalleClaseCreadaComponent } from './detalle-clase-creada/detalle-clase-creada.component';
import { ClaseCreadaComponent } from './clase-creada/clase-creada.component';



@NgModule({
  
  declarations: [ClaseComponent, DestalleClaseComponent, ClaseCreadaComponent, DetalleClaseCreadaComponent],
  imports: [
    CommonModule,IonicModule
  ],
  exports:[
    ClaseComponent, DestalleClaseComponent, DetalleClaseCreadaComponent, ClaseCreadaComponent
  ]
})
export class ComponentsModule { }
