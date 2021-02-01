import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
//import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Articles',
      url: '/view-articles',
      icon: 'book'
    },
    {
      title: 'Committee Members',
      url: '/committee-members',
      icon: 'people'
      
    },
    {
      title: 'Members',
      url: '/members',
      icon: 'people-circle'
     
    },
    {
      title:'gallery',
      url:'/gallery',
      icon:'image'
    },
    {
      title:'profile',
      url:'/profile',
      icon:'person'
    }
    
    
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  //@ViewChild(Tabs, { read: ElementRef }) tabs: ElementRef;
  tabshow:boolean;
  constructor(
    private router:Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuController: MenuController,
    private authService:AuthService,
    private storage:Storage
   // private fcm: FCM
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      // this.authService.authState.subscribe(state => {
      //   if (state) {
      //     console.log("state",state);
          
      //     this.router.navigate(['dashboard']);
      //   } else {
      //     this.router.navigate(['']);
      //   }
      // });

    });
   

  }
  
  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    this.authService.authState.subscribe(state => {
      if (state) {
        console.log("state",state);
        
        this.router.navigate(['dashboard']);
      } else {
        console.log("state",state);
        this.router.navigate(['']);
      }
    });
  }
  ngAfterViewInit() {
  
     // do stuff
     this.tabshow=true;
  
}


}
