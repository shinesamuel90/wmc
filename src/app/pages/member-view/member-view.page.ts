import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Relation } from 'src/app/models/Relations';
import { AuthService } from 'src/app/services/auth.service';
import { UrlService } from 'src/app/services/url.service';
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
  previousUrl: Observable<string> = this.urlService.previousUrl$;
  constructor(
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private router:Router,
private urlService:UrlService
  ) { }

  ngOnInit() {
    this.urlService.previousUrl$.subscribe((previousUrl: string) => {
      console.log('previous url: ', previousUrl);
    });

  //   this.router.events.pipe(
  //     filter((event) => event instanceof NavigationEnd)
  // ).subscribe((event: NavigationEnd) => {
  //    this.previousUrl = this.currentUrl;
  //    this.currentUrl = event.url;
  //    this.urlService.setPreviousUrl(this.previousUrl);
  //    console.log("current url",this.currentUrl);
  //    console.log("previous url",this.previousUrl);
     
     
  // });
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
