import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ClaseComponent } from './clase/clase.component';
import { DestalleClaseComponent } from './destalle-clase/destalle-clase.component';



@NgModule({
  
  declarations: [ClaseComponent, DestalleClaseComponent],
  imports: [
    CommonModule,IonicModule
  ],
  exports:[
    ClaseComponent, DestalleClaseComponent
  ]
})
export class ComponentsModule { }
