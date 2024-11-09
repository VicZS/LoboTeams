import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodasClasesPageRoutingModule } from './todas-clases-routing.module';

import { TodasClasesPage } from './todas-clases.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodasClasesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TodasClasesPage]
})
export class TodasClasesPageModule {}
