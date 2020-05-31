import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-photo-viewer',
  templateUrl: './photo-viewer.page.html',
  styleUrls: ['./photo-viewer.page.scss'],
})
export class PhotoViewerPage implements OnInit {
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  @ViewChild('slideWithNav2', { static: false }) slideWithNav2: IonSlides;
  photos: any;
  sliderOne: any;
  sliderTwo: any;
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };
  slideOptsTwo = {
    initialSlide: 1,
    slidesPerView: 2,
    loop: true,
    centeredSlides: true,
    spaceBetween: 20
  };
  constructor(private route: ActivatedRoute,private router: Router) { 
    // this.route.queryParams.subscribe(params => {
    //   if (this.router.getCurrentNavigation().extras.state) {
    //     this.photos= this.router.getCurrentNavigation().extras.state.album;
    //   }
    // });
    
  }
  
  //  ngOnInit(){}
  ngOnInit(){

if (this.route.snapshot.data['special']) {
  this.photos = this.route.snapshot.data['special'];
}
 console.log(this.photos);
 this.sliderOne =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems:this.photos
      
    };
    //Item object for Food
    this.sliderTwo =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: this.photos
    };
  }
  ionViewDidEnter(){
    console.log("ion view working");
    if (this.route.snapshot.data['special']) {
      this.photos = this.route.snapshot.data['special'];
    }
     console.log(this.photos);
     this.sliderOne =
        {
          isBeginningSlide: true,
          isEndSlide: false,
          slidesItems:this.photos
          
        };
        //Item object for Food
        this.sliderTwo =
        {
          isBeginningSlide: true,
          isEndSlide: false,
          slidesItems: this.photos
        };
    
  }
//Move to Next slide
slideNext(object, slideView) {
  slideView.slideNext(500).then(() => {
    this.checkIfNavDisabled(object, slideView);
  });
}

//Move to previous slide
slidePrev(object, slideView) {
  slideView.slidePrev(500).then(() => {
    this.checkIfNavDisabled(object, slideView);
  });;
}

//Method called when slide is changed by drag or navigation
SlideDidChange(object, slideView) {
  this.checkIfNavDisabled(object, slideView);
}

//Call methods to check if slide is first or last to enable disbale navigation  
checkIfNavDisabled(object, slideView) {
  this.checkisBeginning(object, slideView);
  this.checkisEnd(object, slideView);
}

checkisBeginning(object, slideView) {
  slideView.isBeginning().then((istrue) => {
    object.isBeginningSlide = istrue;
  });
}
checkisEnd(object, slideView) {
  slideView.isEnd().then((istrue) => {
    object.isEndSlide = istrue;
  });
}
// ngOnDestroy(){
//   this.photos.reset();
// } 

}
