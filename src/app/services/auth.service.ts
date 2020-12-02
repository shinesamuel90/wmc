import { Injectable, NgZone } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { User } from './users';
import { Relation } from '../models/Relations';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  
  
  
 
  authState = new BehaviorSubject(false);
  private eventAuthError = new BehaviorSubject<string>("");
  constructor(public db: AngularFireDatabase,
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    private route: ActivatedRoute,
    public ngZone: NgZone,// NgZone service to remove outside scope warning
    private storage: AngularFireStorage,
    private storage1: Storage,
    private platform: Platform,
   
    ) { 
      this.platform.ready().then(() => {
        this.ifLoggedIn();
      });

    }

    ifLoggedIn() {
      localStorage.get('user').then((response) => {
        if (response) {
          this.authState.next(true);
        }
      });
    }
    // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        
       
       this.updateToken(result.user.uid,localStorage.getItem('token'));
      
      const userDocument = this.afs.collection('users').doc(result.user.uid).ref;
       userDocument.get().then((doc) => {
        const result1 = doc.exists ? doc.data() : null;
   
        
        if (result.user.emailVerified !== true&&result1.enable) {
          localStorage.setItem('user', JSON.stringify(result.user));
          JSON.parse(localStorage.getItem('user'));
          this.router.navigate(['dashboard']);
          this.authState.next(true);
          // this.storage1.set('USER_INFO', result.user).then((response) => {
          //   this.router.navigate(['dashboard']);
          //   this.authState.next(true);
          // });
        }
        else if(result.user.emailVerified == true && result1.enable) {
          // this.storage1.set('USER_INFO', result.user).then((response) => {
          //   this.router.navigate(['dashboard']);
          //   this.authState.next(true);
          // });
          
          localStorage.setItem('user', JSON.stringify(result.user));
          JSON.parse(localStorage.getItem('user'));
          this.router.navigate(['dashboard']);
          this.authState.next(true);
        }//else closing
        else{
          // this.snackBar.open("user account not enabled", "action", {
          //   duration: 2000,
          // });
          localStorage.removeItem('user');

          this.router.navigate(['sign-in']);
        }
      })
      }).catch((error) => {
        this.eventAuthError.next(error);
        console.error(error);
        window.alert(error.message)
      })
  }

  updateToken(uid: string, token: string) {
    const data = { uid:[uid],pushToken:token}
      this.db.object('fcmTokens/').update(data)
  }
  logout() {
    this.storage1.remove('USER_INFO').then(() => {
      this.router.navigate(['login']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }

  register(user: any) {
    console.log("register>>>",user);
    
    return new Promise<any>((resolve, reject) => {

      this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
        .then(result=>{
          user.uid = result.user.uid;
          // user.mobile = "";
          user.sex = "";
           user.location = "";
          user.is_committee_member = "No";
          user.designation = "";
          user.is_global_committee_member="No";
          user.g_designation="";
          user.photoURL=null;
           user.dobDate=new Date();
           user.anniversaryDate=new Date();
          user.relatedUid= "";
          user.relation="";
          user.emailVerified=result.user.emailVerified;
          
          //save to firestore
           this.SetUserData(user);
           //save to real time db
          //this.createUserRealTime(user);
          //this.router.navigate(['sign-in']);
          resolve(result);
          
        });
          // res => resolve(res),
          // err => reject(err)
     
          // )
          
      

    }
)
  }
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
  
      const userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.firstName+" "+user.lastName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        lastName: user.lastName,
        firstName: user.firstName,
        role: {
          user: true
        },
        //country:user.countryCode,
        mobile: user.mobileNumber,
        sex: user.sex,
        is_committee_member:user.is_committee_member,
        designation: user.designation,
        is_global_committee_member:user.is_committee_member,
        g_designation: user.designation,
       // location: user.location,
        dobDate: user.dobDate,
        anniversaryDate: user.dobDate,
        relatedUid: user.relatedUid,
        relation:user.relation,
        enable:false,
        region:user.region.name,
        country:user.country.name,
        province:user.province.name
      }
      return userRef.set(userData, {
        merge: true
      })
  }
  getUser(userId: string)  {

    return this.afs.collection('users').doc(userId).snapshotChanges();

  }
  getRelations(uid: string) {
    return this.afs.collection('users').doc(uid).collection('relations').get();
  }
  addRelations(uid: any, relation: Relation) {
console.log("addrelations",relation);

    this.afs.collection('users').ref.doc(uid).collection('relations').add(relation).then(res=>{
      console.log(res.id);
      this.router.navigateByUrl('/dashboard/tabs/profile')
    });
  }
}
