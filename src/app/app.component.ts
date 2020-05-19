import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuController: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
   
  }
  ngAfterViewInit() {
  
     // do stuff
     this.tabshow=true;
  
}
}
