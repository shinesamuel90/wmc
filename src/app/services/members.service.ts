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
 getUsersByProvince(province: string) {
   console.log(province);
   const users=this.firestore.collection('users',ref=>ref.where('province','==','Masqat'));
   console.log(users);
   
  return users
}
 getCommitteeMembers(){

  return this.firestore.collection('users',ref=>ref.where('is_province_committee_member', '==', 'Yes'));

// Create a query against the collection

 }
 getGlobalCommitteeMembers() {
  return this.firestore.collection('users',ref=>ref.where('is_global_committee_member', '==', 'Yes'));

}
getRegionalCommitteeMembers() {
  return this.firestore.collection('users',ref=>ref.where('is_regional_committee_member', '==', 'Yes'));
}
}
