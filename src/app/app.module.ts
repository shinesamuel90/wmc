import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
//  firebase imports, remove what you don't require
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthService } from './services/auth.service';
import { ArticleService } from './services/article.service';
import { MembersService } from './services/members.service';
import { GalleryService } from './services/gallery.service';
import { AlbumdataService } from './services/albumdata.service';
import { AlbumDataResolverService } from './resolver/album-data-resolver.service';
import { AuthGuardService } from './services/auth-guard.service';
import { IonicStorageModule } from '@ionic/storage';

import { CallNumber } from '@ionic-native/call-number/ngx';
import { IonicSelectableModule } from 'ionic-selectable';
import { CountriesService } from './services/countries.service';
import { HttpClientModule } from '@angular/common/http';
import { ProfileDataService } from './resolver/profile-data.service';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    IonicSelectableModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    ArticleService,
    MembersService,
    GalleryService,
    AuthGuardService,
    CountriesService,
    CallNumber,
    ProfileDataService,
       { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
