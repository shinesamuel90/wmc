import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegionalCommitteePageRoutingModule } from './regional-committee-routing.module';

import { RegionalCommitteePage } from './regional-committee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegionalCommitteePageRoutingModule
  ],
  declarations: [RegionalCommitteePage]
})
export class RegionalCommitteePageModule {}
