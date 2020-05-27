import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from './users';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(public db: AngularFireDatabase,
    public firestore: AngularFirestore) { }
    //userlist from firestore
  getUsers(){
    
    return this.firestore.collection('users');
    
 }
}
