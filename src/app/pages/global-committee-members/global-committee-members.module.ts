import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GlobalCommitteeMembersPageRoutingModule } from './global-committee-members-routing.module';

import { GlobalCommitteeMembersPage } from './global-committee-members.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GlobalCommitteeMembersPageRoutingModule
  ],
  declarations: [GlobalCommitteeMembersPage]
})
export class GlobalCommitteeMembersPageModule {}
