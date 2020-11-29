import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Relation } from 'src/app/models/Relations';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-relations',
  templateUrl: './add-relations.page.html',
  styleUrls: ['./add-relations.page.scss'],
})
export class AddRelationsPage implements OnInit {
  dependentform:FormGroup;
  relation:Relation;
  uid:any;
  validation_messages = {
    'name': [
      { type: 'required', message: 'name is required.' }
     
    ],
    'relation': [
      { type: 'required', message: 'relation is required.' }
     
    ],
    'mobile': [
      { type: 'required', message: 'mobile number is required.' }
     
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ]
    }
    
  RelationType: any = ['Father', 'Mother', 'Son', 'Daughter', 'Brother', 'Sister', 'Wife', 'Husband']
  constructor(private activatedRoute:ActivatedRoute ,
    private formBuilder:FormBuilder,
    private authService:AuthService
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.uid = params['id'];
      //console.log('Url Id: ',id);
})
this.initForm();

  }
  initForm() {
    this.dependentform=this.formBuilder.group({
      name:new FormControl('',Validators.compose([Validators.required])),
      relation:new FormControl('',Validators.compose([Validators.required])),
      mobile:new FormControl('',Validators.compose([Validators.required])),
      email:new FormControl('',Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]))
    });
  }
  addDependents(){
    if(this.dependentform.valid){
console.log(this.dependentform.value);
this.relation.email=this.dependentform.value.email;
this.relation.relation=this.dependentform.value.relation[0];
this.relation.mobile=this.dependentform.value.mobile;
this.relation.name=this.dependentform.value.name;
this.authService.addRelations(this.uid,this.relation);

    }
  }
}
