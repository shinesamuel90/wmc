import { Injectable, NgZone } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private eventAuthError = new BehaviorSubject<string>("");
  constructor(public db: AngularFireDatabase,
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    private route: ActivatedRoute,
    public ngZone: NgZone,// NgZone service to remove outside scope warning
    private storage: AngularFireStorage,
    ) { }
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
          
        }
        else if(result.user.emailVerified == true && result1.enable) {
          
          
          localStorage.setItem('user', JSON.stringify(result.user));
          JSON.parse(localStorage.getItem('user'));
          this.router.navigate(['dashboard']);
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

}
