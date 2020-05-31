import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AlbumdataService } from '../services/albumdata.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumDataResolverService implements Resolve<any>{

  constructor(private dataService: AlbumdataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let id = route.paramMap.get('id');
    console.log(this.dataService.getData(id));
    
    return this.dataService.getData(id);
  }
}
