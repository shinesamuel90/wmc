import { Component, OnInit, SecurityContext } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { VideoService } from 'src/app/services/video.service';
import { first } from 'rxjs/operators';




@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {
trustedVideoUrl:Array<SafeResourceUrl>=[];
a:Array<String>=[];
    array_of_objects = [{vid_link:"https://www.youtube.com/embed/pjE_Op6z4Qg"},{vid_link:"https://www.youtube.com/embed/bFQHCr5XqU0"}]
  videos: any;
  constructor(public _navCtrl: NavController,
    private domSanitizer: DomSanitizer,
    private videoService:VideoService
    ) { }

    async ngOnInit():Promise<any> {
    this.videos=await this.videoService.getVideos().valueChanges().pipe(first()).toPromise();
    for(let i of this.videos){
      let ab:SafeResourceUrl;
    ab= this.domSanitizer.bypassSecurityTrustResourceUrl(i.url)
     this.trustedVideoUrl.push(ab);
    // this.a.push(this.domSanitizer.sanitize(SecurityContext.RESOURCE_URL,this.domSanitizer.bypassSecurityTrustResourceUrl(i.vid_link)))
   }
  }
  ionViewWillEnter(): void {
    // for(let i of this.videos){
    //    let ab:SafeResourceUrl;
    //  ab= this.domSanitizer.bypassSecurityTrustResourceUrl(i.url)
    //   this.trustedVideoUrl.push(ab);
    //  // this.a.push(this.domSanitizer.sanitize(SecurityContext.RESOURCE_URL,this.domSanitizer.bypassSecurityTrustResourceUrl(i.vid_link)))
    // }
  }
}
