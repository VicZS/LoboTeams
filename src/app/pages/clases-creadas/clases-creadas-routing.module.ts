import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClasesCreadasPage } from './clases-creadas.page';

const routes: Routes = [
  {
    path: '',
    component: ClasesCreadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasesCreadasPageRoutingModule {}
