import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GlobalCommitteeMembersPage } from './global-committee-members.page';

const routes: Routes = [
  {
    path: '',
    component: GlobalCommitteeMembersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlobalCommitteeMembersPageRoutingModule {}
