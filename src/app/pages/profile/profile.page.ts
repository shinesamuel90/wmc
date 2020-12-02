import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Relation } from 'src/app/models/Relations';
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
  relations: Relation[]=[];
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
        this.relations=[];
        this.getRelations(this.currentUser.uid);
        console.log(this.currentUser);

      }
    });

  }
  getRelations(uid: string) {
    this.authService.getRelations(uid).subscribe(data=>{
     data.docs.forEach(doc=>{
       this.relations.push({name:doc.data().name,relation:doc.data().relation,mobile:doc.data().mobile,
        email:doc.data().email});
      // console.log(doc.data());
       
     })
    })
  }
  addRelations(){
    this.router.navigate(["/dashboard/tabs/add-relations", { 'id': this.currentUser.uid }]);
  }

}
