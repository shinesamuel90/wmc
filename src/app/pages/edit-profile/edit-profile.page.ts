import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CountriesService } from 'src/app/services/countries.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { User } from 'src/app/services/users';
class Region {
  public id: string;
  public name: string;
}
class phoneCode {
  public pais: string;
  public code: string;
}
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  profile_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  paiseCode: phoneCode[]=[{
    pais: "Honduras",
    code: "+504"
  },
  {
    pais: "USA",
    code: "+1"
  },
  {
    pais: "India",
    code: "+91"
  },
  {
    pais: "OM",
    code: "+968"
  }

  ];

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ],
    'firstName': [
      { type: 'required', message: 'FirstName is required.' }

    ],
    'lastName': [
      { type: 'required', message: 'LastName is required.' }

    ],
    'mobileNumber': [
      { type: 'required', message: 'Mobile number is required.' }

    ],
    'countryCode': [
      { type: 'required', message: 'Country code is required.' }

    ],
    'region': [
      { type: 'required', message: 'Region is required.' }

    ],
    'country': [
      { type: 'required', message: 'Country is required.' }

    ],
    'province': [
      { type: 'required', message: 'Province is required.' }

    ]

  };

  regions: Region[];
  region: Region;
  selectedRegion:Region;
  data: any;
  countries: any;
  provinces: any;
  currentUser: User;
 
  constructor(
    private authService: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private countryService: CountriesService,
    public toastController: ToastController
  ) { 
    this.regions = [
      { id: 'Africa', name: 'Africa' },
      { id: 'Antarctica', name: 'Antarctica' },
      { id: 'Asia', name: 'Asia' },
      { id: 'Europe', name: 'Europe' },
      { id: 'North America', name: 'North America' },
      { id: 'Australia', name: 'Australia' },
      { id: 'South America', name: 'South America' }
    ];
    this.countries = [];
    this.provinces = [];
  }

  ngOnInit() {
  


    this.profile_form = this.formBuilder.group({
      
      firstName: new FormControl('', Validators.compose([Validators.required])),
      lastName: new FormControl('', Validators.compose([Validators.required])),
      mobileNumber: new FormControl('', Validators.compose([Validators.compose([Validators.maxLength(10), Validators.required])])),
      countryCode: new FormControl('', Validators.compose([Validators.required])),
      region: new FormControl('', Validators.compose([Validators.required])),
      country: new FormControl('', Validators.compose([Validators.required])),
      province: new FormControl('', Validators.compose([Validators.required])),
      dob:new FormControl(''),
      anndate:new FormControl('')
    });

    this.getCurrentUser();
  }
  getCurrentUser() {
    this.activeRoute.data.subscribe(routeData => {
      console.log(routeData);
      
      let data = routeData['special'];
      if (data) {
        console.log("member", data.payload.data());
        this.currentUser = data.payload.data();
        this.selectedRegion={id:this.currentUser.region,name:this.currentUser.region}
        this.profile_form.patchValue({
          firstName: this.currentUser.firstName,
          lastName: this.currentUser.lastName,
          countryCode:this.currentUser.mobile.dialCode,
          mobileNumber:Number(this.currentUser.mobile.nationalNumber.replace(/\s/g, "")),
          region:this.selectedRegion,
          country:{id:this.currentUser.country,name:this.currentUser.country},
          province:{shortCode:this.currentUser.province,name:this.currentUser.province},
          dob:this.currentUser.dobDate.toDate().toISOString(),
          anndate:this.currentUser.anniversaryDate?this.currentUser.anniversaryDate.toDate().toISOString():''
          })
         // this.selectedRegion={id:this.currentUser.region,name:this.currentUser.region}
          //this.profile_form.controls['region'].setValue('Asia');
   
        console.log(this.currentUser);

      }
    });

  }

  addUserData(value: any) {

    let selCCode = this.paiseCode.find(obj => {
      return obj.code === value.countryCode
    });
    console.log("selectCode",selCCode);
    
    this.authService.updateProfile(value,this.currentUser.uid,selCCode)
      .then(res => {
        console.log(res);

        this.toastController.create({
          message: 'Your account data has been modified.',
          duration: 2000
        }).then((toast) => {
          toast.present();
          this.router.navigate(['/dashboard/tabs/profile']);
        })

      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      })
  }
  goLoginPage() {
    this.router.navigate(['']);
  }

  regionChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {

    this.getCountries(event.value)
  }

  getCountries(value: any) {
    console.log(value.name);
    this.countryService.getCountries(value.name).subscribe(response => {
console.log("countries",response);

      this.countries = response;
    })
  }

  countryChange(
    event: {
      component: IonicSelectableComponent,
      value: any
    }
  ) {
    this.getProvince(event.value.name)
  }

  getProvince(value: string) {
    console.log(value);

    fetch("../../assets/data.json").then(res => res.json()).then(json => {

      //  this.provinces=returnJson.regions;
      json.forEach(element => {
        if (element.countryName == value) {
          console.log(element.regions);
          this.provinces = element.regions;
        }
      });

    });
  }
 
}
