import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommitteeMembersPageRoutingModule } from './committee-members-routing.module';

import { CommitteeMembersPage } from './committee-members.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommitteeMembersPageRoutingModule
  ],
  declarations: [CommitteeMembersPage]
})
export class CommitteeMembersPageModule {}
