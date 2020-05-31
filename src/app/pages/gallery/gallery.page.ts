import { Component, OnInit } from '@angular/core';
import { GalleryService } from 'src/app/services/gallery.service';
import { first } from 'rxjs/operators';
import { Router, NavigationExtras } from '@angular/router';
import { AlbumdataService } from 'src/app/services/albumdata.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {
  
  albums: any[];
   src='assets/images/11.jpg';
   inc:any;
  constructor(private galleryService:GalleryService,private dataService:AlbumdataService,
    private router: Router) { }

  async ngOnInit(): Promise<any> {
    this.inc=0;
    this.albums=await this.galleryService.getAlbums().valueChanges().pipe(first()).toPromise();
   
  }
   getImageurl(id:string){
    console.log(this.inc+1 +">>>>"+id);
    
    //  const foodList =  this.galleryService.getImageUrl(id)
    //  foodList.then(data=>{
    //    console.log(data.url)
    //  })
    
// return await this.galleryService.getImageUrl(id);   
return  'assets/images/11.jpg';  
  }
  gotoPhotos(photos:any){
    console.log("gotoPhotos",photos);
    // let photo=photos;
    // let navigationExtras: NavigationExtras = {state: {album : photo}} ;
    // this.router.navigate(['/dashboard/tabs/photo-viewer'], navigationExtras);
    this.dataService.setData(42, photos);
    this.router.navigateByUrl('/dashboard/tabs/photo-viewer/42');
  }
}
