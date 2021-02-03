import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) { }
  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.authState.pipe(
        filter(val => val !== null), // Filter out initial Behaviour subject value
        take(1), // Otherwise the Observable doesn't complete!
        map(isAuthenticated => {
          if (isAuthenticated) {
            // Directly open inside area       
            this.router.navigateByUrl('/dashboard', { replaceUrl: true });
          } else {          
            // Simply allow access to the login
            return true;
          }
        })
      )
  }
}
