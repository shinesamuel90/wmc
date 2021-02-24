import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/services/members.service';
import { filter, first } from 'rxjs/operators';
import { User } from 'src/app/services/users';
import { NavigationEnd, Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-global-committee-members',
  templateUrl: './global-committee-members.page.html',
  styleUrls: ['./global-committee-members.page.scss'],
})
export class GlobalCommitteeMembersPage implements OnInit {
  members: any[];
  src="/assets/images/dummy-user.png"
  previousUrl: string = null;
  currentUrl: string = null;
  constructor(private membersService:MembersService,
    private router:Router,
    private urlService: UrlService
    ) { 

   
    }

  async ngOnInit() {
    this.members=await this.initializeItems();
    console.log("members>>>",this.members);
    // this.router.events.pipe(
    //   filter((event) => event instanceof NavigationEnd)
    // ).subscribe((event: NavigationEnd) => {
    //   this.previousUrl = this.currentUrl;
    //   this.currentUrl = event.url;
    //   this.urlService.setPreviousUrl(this.previousUrl);
    // });
  }
  async initializeItems():  Promise<any>  {
    let globalCommitteeMembers:any[]=[];
    globalCommitteeMembers = await this.membersService.getGlobalCommitteeMembers().valueChanges().pipe(first()).toPromise();
    let newarr = globalCommitteeMembers.sort((a, b) => a.g_designation.order - b.g_designation.order);
    return newarr;
  }
  async filterItems(ev: any) {
    // debugger;
    let val = ev.target.value;
  
    if (val && val.trim() !== '') {
      this.members = this.members.filter((user) => {
        return user.firstName.toLowerCase().includes(val.toLowerCase());
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
