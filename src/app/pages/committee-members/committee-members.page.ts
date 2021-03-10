import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/services/members.service';
import { filter, first } from 'rxjs/operators';
import { User } from 'src/app/services/users';
import { NavigationEnd, Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-committee-members',
  templateUrl: './committee-members.page.html',
  styleUrls: ['./committee-members.page.scss'],
})
export class CommitteeMembersPage implements OnInit {
  members: any[];
  membersBackup: any[];
  src="/assets/images/dummy-user.png"
  previousUrl: string = null;
  currentUrl: string = null;
  constructor(private membersService:MembersService,
    private router:Router,
    private urlService: UrlService
    ) { }

 
  async ngOnInit() {
    this.members=await this.initializeItems();
    this.membersBackup=this.members;
    // this.router.events.pipe(
    //   filter((event) => event instanceof NavigationEnd)
    // ).subscribe((event: NavigationEnd) => {
    //   this.previousUrl = this.currentUrl;
    //   this.currentUrl = event.url;
    //   this.urlService.setPreviousUrl(this.previousUrl);
    // });
  }
  async initializeItems(): Promise<any> {
    let foodList:any[]=[];
     foodList = await this.membersService.getCommitteeMembers().valueChanges().pipe(first()).toPromise();
    let newarr = foodList.sort((a, b) => a.p_designation.order - b.p_designation.order);
    console.log(newarr);
    
    return newarr;
    //return foodList;
  }
  async filterItems(ev) {
    // debugger;
    this.members = this.membersBackup;
    let val = ev.srcElement.value;
  
    if (val && val.trim() !== '') {
      this.members = this.members.filter((user) => {
        let name=user.firstName+" "+user.lastName;
        return name.toLowerCase().includes(val.toLowerCase());
      });
    } else {
      this.members = await this.initializeItems();
    }
    }
    goToMemberView(member:User){
      console.log("member click>>>",member);
      // let navigationExtras: NavigationExtras = {
      //   queryParams: {
      //       "user": JSON.stringify(member)
      //   }
      // };
      this.router.navigate(["/dashboard/tabs/member-view",{ "user": JSON.stringify(member)}])
    }
}
