import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpPageRoutingModule } from './sign-up-routing.module';

import { SignUpPage } from './sign-up.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SignUpPageRoutingModule,
    IonicSelectableModule,
    IonIntlTelInputModule
  ],
  declarations: [SignUpPage]
})
export class SignUpPageModule {}
