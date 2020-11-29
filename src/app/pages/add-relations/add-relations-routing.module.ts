import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRelationsPage } from './add-relations.page';

const routes: Routes = [
  {
    path: '',
    component: AddRelationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRelationsPageRoutingModule {}
