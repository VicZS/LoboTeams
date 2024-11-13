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
import { ChatsClasesInscritasComponent } from './chats-clases-inscritas/chats-clases-inscritas.component';
import { ChatsClasesCreadasComponent } from './chats-clases-creadas/chats-clases-creadas.component';
import { ChatClaseComponent } from './chat-clase/chat-clase.component';

import { FormsModule } from '@angular/forms';




@NgModule({
  
  declarations: [ClaseComponent, 
    DestalleClaseComponent, 
    ClaseCreadaComponent, 
    DetalleClaseCreadaComponent,
    ClaseInscritaComponent,
    DetalleClaseInscritaComponent,
    DetalleActividadComponent,
    DetalleActividadCreadaComponent,
    ChatsClasesInscritasComponent,
    ChatsClasesCreadasComponent,
    ChatClaseComponent
    
  ],
  imports: [
    CommonModule,IonicModule, FormsModule
  ],
  exports:[
    ClaseComponent, 
    DestalleClaseComponent, 
    DetalleClaseCreadaComponent, 
    ClaseCreadaComponent,
    ClaseInscritaComponent,
    DetalleClaseInscritaComponent,
    DetalleActividadComponent,
    DetalleActividadCreadaComponent,
    ChatsClasesInscritasComponent,
    ChatsClasesCreadasComponent,
    ChatClaseComponent
  ]
})
export class ComponentsModule { }
