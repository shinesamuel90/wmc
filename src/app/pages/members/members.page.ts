import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/services/members.service';
import { first } from 'rxjs/operators';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {
  members: any[];
  src = "/assets/images/dummy-user.png"
  province: any;
  constructor(private membersService: MembersService,
    private callNumber: CallNumber,
    private activeRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.activeRoute.data.subscribe(routeData => {
      console.log(routeData);

      let data = routeData['special'];
      console.log("memberComponent", data);
      if (data) {
        console.log("member", data.payload.data());
        this.province = data.payload.data().province;
      }
    });

    this.members = await this.initializeMembers(this.province);

  }
  // initializeMembers(province: any): any[] | PromiseLike<any[]> {
  //   throw new Error('Method not implemented.');
  // }
  async initializeMembers(province: any): Promise<any> {
    const memberList = await this.membersService.getUsersByProvince(province).valueChanges().pipe(first()).toPromise();
    return memberList;
  }
  async filterItems(ev: any) {
    // debugger;
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.members = this.members.filter((user) => {
        return user.firstName.toLowerCase().includes(val.toLowerCase());
      });
    } else {
      this.members = await this.initializeMembers(this.province);
    }
  }
  call() {
    this.callNumber.callNumber('3525235235235', true).then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
}
