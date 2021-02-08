import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm : FormGroup;
  submitted = false;
  validation_messages = {
    'username': [
        { type: 'required', message: 'Username is required.' },
        { type: 'email', message: 'Username has to be a valid email address.' },
        { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
        { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
        { type: 'validUsername', message: 'Your username has already been taken.' }
      ],
      'password': [
        { type: 'required', message: 'Name is required.' },
        {type:'minlength',message:'password cannot be less than 8 characters'}
      ],
    
    
    }
  
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private menuController: MenuController,
    private authService:AuthService
    ) { 
    this.loginForm = this.formBuilder.group({
      // username: ['', [Validators.required,Validators.email]],
      //password: ['',[Validators.required,Validators.minLength(6)]],
      username:new FormControl ('', [Validators.required,Validators.email]),
      password:new FormControl ('', [Validators.required,Validators.minLength(6)])
    });
  }

  ngOnInit() {
  }
  logForm(){
    this.submitted = true;
    console.log(this.loginForm.value.username)
    //this.router.navigate(['/view-articles'])
this.authService.SignIn(this.loginForm.value.username,this.loginForm.value.password)
  }
  ionViewWillEnter() {
   
    this.menuController.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menuController.enable(true);
  }
  clear(){
    console.log("clear");
    
  }
}
