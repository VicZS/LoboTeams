import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodasClasesPage } from './todas-clases.page';

const routes: Routes = [
  {
    path: '',
    component: TodasClasesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodasClasesPageRoutingModule {}
