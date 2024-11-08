import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodasClasesPageRoutingModule } from './todas-clases-routing.module';

import { TodasClasesPage } from './todas-clases.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodasClasesPageRoutingModule
  ],
  declarations: [TodasClasesPage]
})
export class TodasClasesPageModule {}
