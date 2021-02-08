import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-regional-committee',
  templateUrl: './regional-committee.page.html',
  styleUrls: ['./regional-committee.page.scss'],
})
export class RegionalCommitteePage implements OnInit {
  members: any[];
  src="/assets/images/dummy-user.png"
  constructor(
    private membersService:MembersService
  ) { }

  async ngOnInit() {
    this.members=await this.initializeItems();
  }
  async initializeItems(): Promise<any> {
    let membersList:any[]=[];
    membersList = await this.membersService.getRegionalCommitteeMembers().valueChanges().pipe(first()).toPromise();
    let newarr = membersList.sort((a, b) => a.r_designation.order - b.r_designation.order);
    console.log(newarr);
    
    return newarr;
    //return foodList;
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
