import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClasesCreadasPageRoutingModule } from './clases-creadas-routing.module';

import { ClasesCreadasPage } from './clases-creadas.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClasesCreadasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ClasesCreadasPage]
})
export class ClasesCreadasPageModule {}
