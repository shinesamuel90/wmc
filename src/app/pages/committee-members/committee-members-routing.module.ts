import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommitteeMembersPage } from './committee-members.page';

const routes: Routes = [
  {
    path: '',
    component: CommitteeMembersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommitteeMembersPageRoutingModule {}
