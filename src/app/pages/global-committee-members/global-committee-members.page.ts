import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/services/members.service';
import { first } from 'rxjs/operators';
import { User } from 'src/app/services/users';

@Component({
  selector: 'app-global-committee-members',
  templateUrl: './global-committee-members.page.html',
  styleUrls: ['./global-committee-members.page.scss'],
})
export class GlobalCommitteeMembersPage implements OnInit {
  members: any[];
  src="/assets/images/dummy-user.png"
  constructor(private membersService:MembersService) { }

  async ngOnInit() {
    this.members=await this.initializeItems();
    console.log("members>>>",this.members);
    
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
}
