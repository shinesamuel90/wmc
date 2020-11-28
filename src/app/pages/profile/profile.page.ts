import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
currentUser:any;
  constructor() { }

  ngOnInit() {
 if(JSON.parse(localStorage.getItem('user'))){
console.log(JSON.parse(localStorage.getItem('user')));
  }
    }
  

}
