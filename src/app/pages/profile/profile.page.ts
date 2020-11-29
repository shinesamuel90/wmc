import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/services/users';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  uid: any;
  currentUser: User;
  constructor(private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {
    this.activeRoute.data.subscribe(routeData => {
      console.log(routeData);
      
      let data = routeData['special'];
      if (data) {
        console.log("member", data.payload.data());
        this.currentUser = data.payload.data();
        
        console.log(this.currentUser);

      }
    });

  }
  addRelations(){
    this.router.navigate(["/dashboard/tabs/add-relations", { 'id': this.currentUser.uid }]);
  }

}
