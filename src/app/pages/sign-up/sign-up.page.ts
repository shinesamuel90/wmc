import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  paiseCode=[{
    pais: "Honduras",
    code: +504
  },
  {
    pais: "USA",
    code: +1
  },
  {
    pais: "India",
    code: +91
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
    ]
  };
  constructor(private authService:AuthService,
    private router:Router,
    private formBuilder: FormBuilder
    ) { }

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
      firstName:new FormControl('',Validators.compose([Validators.required])),
      lastName:new FormControl('',Validators.compose([Validators.required])),
      mobileNumber:new FormControl('',Validators.compose([Validators.compose([Validators.maxLength(10),Validators.required])])),
      countryCode:new FormControl('',Validators.compose([Validators.required]))
    });
  }
  tryRegister(value) {
    this.authService.register(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.successMessage = "Your account has been created. Please log in.";
        this.router.navigate(['']);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      })
  }
  goLoginPage(){
    this.router.navigate(['']);
  }
}
