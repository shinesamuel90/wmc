import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewArticlesPage } from './view-articles.page';

const routes: Routes = [
  {
    path: '',
    component: ViewArticlesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewArticlesPageRoutingModule {}
