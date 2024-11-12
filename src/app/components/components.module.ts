import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ClaseComponent } from './clase/clase.component';
import { DestalleClaseComponent } from './destalle-clase/destalle-clase.component';
import { DetalleClaseCreadaComponent } from './detalle-clase-creada/detalle-clase-creada.component';
import { ClaseCreadaComponent } from './clase-creada/clase-creada.component';
import { ClaseInscritaComponent } from './clase-inscrita/clase-inscrita.component';
import { DetalleClaseInscritaComponent } from './detalle-clase-inscrita/detalle-clase-inscrita.component';
import { DetalleActividadComponent } from './detalle-actividad/detalle-actividad.component';
import { DetalleActividadCreadaComponent } from './detalle-actividad-creada/detalle-actividad-creada.component';



@NgModule({
  
  declarations: [ClaseComponent, 
    DestalleClaseComponent, 
    ClaseCreadaComponent, 
    DetalleClaseCreadaComponent,
    ClaseInscritaComponent,
    DetalleClaseInscritaComponent,
    DetalleActividadComponent,
    DetalleActividadCreadaComponent
  ],
  imports: [
    CommonModule,IonicModule
  ],
  exports:[
    ClaseComponent, 
    DestalleClaseComponent, 
    DetalleClaseCreadaComponent, 
    ClaseCreadaComponent,
    ClaseInscritaComponent,
    DetalleClaseInscritaComponent,
    DetalleActividadComponent,
    DetalleActividadCreadaComponent
  ]
})
export class ComponentsModule { }
