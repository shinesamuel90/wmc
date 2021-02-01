import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class ProfileDataService implements Resolve<any> {

  constructor(private authService:AuthService,private storage:Storage) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    if(JSON.parse(localStorage.getItem('user'))){
      let uid=(JSON.parse(localStorage.getItem('user'))).uid;
      console.log(uid);
     
    return new Promise((resolve, reject) => {
      
      this.authService.getUser(uid)
      .subscribe(
        data => {
          console.log("profile data resolver",data.payload.data());
          
          resolve(data);
        }
      );
    })

        }

    

  }
}
