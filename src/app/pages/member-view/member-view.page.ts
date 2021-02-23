import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Relation } from 'src/app/models/Relations';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/services/users';

@Component({
  selector: 'app-member-view',
  templateUrl: './member-view.page.html',
  styleUrls: ['./member-view.page.scss'],
})
export class MemberViewPage implements OnInit {
  uid: any;
  currentUser: User;
  relations: Relation[]=[];
  constructor(
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private router:Router

  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      console.log(params);
      //console.log(  "member-view",JSON.stringify(params['special'])  );
      this.currentUser = JSON.parse(params["user"]);
      //console.log('Url Id: ',id);
      console.log("member-view", this.currentUser);
})
    // this.activeRoute.data.subscribe(routeData => {
    //   console.log(routeData);
      
    //   let data = routeData['special'];
    //   if (data) {
    //     console.log("member", data.payload.data());
    //     this.currentUser = data.payload.data();
    //     this.relations=[];
    //    // this.getRelations(this.currentUser.uid);
    //     console.log(this.currentUser);

    //   }
    // });
  }

}
