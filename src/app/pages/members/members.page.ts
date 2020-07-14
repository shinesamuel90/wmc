import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/services/members.service';
import { first } from 'rxjs/operators';
import { CallNumber } from '@ionic-native/call-number/ngx';
@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {
  members: any[];
  src="/assets/images/dummy-user.png"
  constructor(private membersService:MembersService,
    private callNumber: CallNumber
    ) { }

  async ngOnInit() {
    this.members=await this.initializeItems();
    
  }
  async initializeItems(): Promise<any> {
    const foodList = await this.membersService.getUsers().valueChanges().pipe(first()).toPromise();
    return foodList;
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
    call(){
      this.callNumber.callNumber('3525235235235', true).then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
    }
}
