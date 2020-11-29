import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRelationsPageRoutingModule } from './add-relations-routing.module';

import { AddRelationsPage } from './add-relations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddRelationsPageRoutingModule
  ],
  declarations: [AddRelationsPage]
})
export class AddRelationsPageModule {}
