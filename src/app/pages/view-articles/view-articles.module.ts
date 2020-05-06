import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewArticlesPageRoutingModule } from './view-articles-routing.module';

import { ViewArticlesPage } from './view-articles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewArticlesPageRoutingModule
  ],
  declarations: [ViewArticlesPage]
})
export class ViewArticlesPageModule {}
