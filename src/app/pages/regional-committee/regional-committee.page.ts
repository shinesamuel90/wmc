import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MembersService } from 'src/app/services/members.service';
import { User } from 'src/app/services/users';

@Component({
  selector: 'app-regional-committee',
  templateUrl: './regional-committee.page.html',
  styleUrls: ['./regional-committee.page.scss'],
})
export class RegionalCommitteePage implements OnInit {
  members: any[];
  membersBackup: any[];
  src="/assets/images/dummy-user.png"
  constructor(
    private membersService:MembersService,
    private router:Router
  ) { }

  async ngOnInit() {
    this.members=await this.initializeItems();
    this.membersBackup=this.members;
  }
  async initializeItems(): Promise<any> {
    let membersList:any[]=[];
    membersList = await this.membersService.getRegionalCommitteeMembers().valueChanges().pipe(first()).toPromise();
    let newarr = membersList.sort((a, b) => a.r_designation.order - b.r_designation.order);
    console.log(newarr);
    
    return newarr;
    //return foodList;
  }
  async filterItems(ev) {
    // debugger;
    this.members = this.membersBackup;
    let val = ev.srcElement.value;
    console.log("enterd value",val);
    
    // if (!val) {
    //   return;
    // }
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
     
      this.router.navigate(["/dashboard/tabs/member-view",{ "user": JSON.stringify(member)}])
    }
}
