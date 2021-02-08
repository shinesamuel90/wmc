import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Articles',
      url: '/dashboard/tabs/view-articles',
      icon: 'book'
    },
    {
      title: 'Global Office Bearers',
      url: '/dashboard/tabs/global-committee-members',
      icon: 'people'
      
    },
    {
      title: 'Regional Council ',
      url: '/dashboard/tabs/regional-committee-members',
      icon: 'people'
      
    },
    {
      title: 'Provincial Leaders ',
      url: '/dashboard/tabs/committee-members',
      icon: 'people'
      
    },
    {
      title: 'Members',
      url: '/dashboard/tabs/members',
      icon: 'people-circle'
     
    },
    {
      title:'Gallery',
      url:'/dashboard/tabs/gallery',
      icon:'image'
    },
    {
      title:'Videos',
      url:'/dashboard/tabs/videos',
      icon:'videocam'
    },
    {
      title:'Profile',
      url:'/dashboard/tabs/profile',
      icon:'person'
    }
    
    
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor( private authService:AuthService ) { }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
  doClick(){}
  logout(){
    this.authService.logout()
  }
}
