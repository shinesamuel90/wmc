import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/services/members.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-committee-members',
  templateUrl: './committee-members.page.html',
  styleUrls: ['./committee-members.page.scss'],
})
export class CommitteeMembersPage implements OnInit {
  members: any[];
  src="/assets/images/dummy-user.png"
  constructor(private membersService:MembersService) { }

 
  async ngOnInit() {
    this.members=await this.initializeItems();
    
  }
  async initializeItems(): Promise<any> {
    let foodList:any[]=[];
     foodList = await this.membersService.getCommitteeMembers().valueChanges().pipe(first()).toPromise();
    let newarr = foodList.sort((a, b) => a.p_designation.order - b.p_designation.order);
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
