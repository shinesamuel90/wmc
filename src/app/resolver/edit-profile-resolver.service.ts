import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EditProfileResolverService implements Resolve<any> {

  constructor(

    private authService:AuthService,
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let uid = route.paramMap.get('id');
   // console.log(this.authService.getData(id));
    
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
