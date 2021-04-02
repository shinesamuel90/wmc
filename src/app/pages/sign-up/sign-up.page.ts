import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicSelectableComponent } from 'ionic-selectable';
import { CountriesService } from 'src/app/services/countries.service';
import { ToastController } from '@ionic/angular';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  paiseCode = [{
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
    pais: "Oman",
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
  data: any;
  countries: any;
  provinces: any;
  admins:string[]=[];
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private countryService: CountriesService,
    public toastController: ToastController,
    private httpClient:HttpClient
  ) {

    this.regions = [
      { id: 1, name: 'Africa' },
      { id: 2, name: 'Antarctica' },
      { id: 3, name: 'Asia' },
      { id: 4, name: 'Europe' },
      { id: 5, name: 'North America' },
      { id: 6, name: 'Australia' },
      { id: 7, name: 'South America' }
    ];
    this.countries = [];
    this.provinces = [];
  }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      firstName: new FormControl('', Validators.compose([Validators.required])),
      lastName: new FormControl('', Validators.compose([Validators.required])),
     // mobileNumber: new FormControl('', Validators.compose([Validators.compose([Validators.maxLength(10), Validators.required])])),
      //countryCode: new FormControl('', Validators.compose([Validators.required])),
      region: new FormControl('', Validators.compose([Validators.required])),
      country: new FormControl('', Validators.compose([Validators.required])),
      province: new FormControl('', Validators.compose([Validators.required])),
      phoneNumber: new FormControl('',Validators.compose([Validators.required]))
    });
  }

  addUserData(value: any) {
    this.authService.register(value)
      .then(async res => {
// await this.authService.getAdmins().then().
//         console.log(res);
        await (await this.authService.getAdmins()).forEach(doc=>{
          if(doc.data().email){
          this.admins.push(doc.data().email)
          }
          // this.members.push(doc.data())
          // this.membersBackup.push(doc.data())
        })
        let params = new HttpParams();
        console.log("res.user.uid",res.user.uid);
        
        params = params.append('uid',res.user.uid);
       // params = params.append('name',element.displayName);
        this.httpClient.get("https://us-central1-insysmemalayalee.cloudfunctions.net/sendMailToAdmins",{params: params}).subscribe(data=>{
          console.log(data);
         
        });
        this.toastController.create({
          message: 'Your account has been created. Please log in.',
          duration: 2000
        }).then((toast) => {
          toast.present();
          this.validations_form.reset()
          this.router.navigate(['']);
        })

      }, err => {
        console.log(err);
       // alert(err);
        
        this.errorMessage = err.message;
        this.successMessage = "";
        this.toastController.create({
          message: err.message,
          duration: 2000
        }).then((toast) => {
          toast.present();
          
        })
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

class Region {
  public id: number;
  public name: string;
}