// export interface Roles { 
//     user?: boolean;
//     admin?: boolean;
// }
// export interface User {
// uid: string;
// email: string;
// displayName: string;
// photoURL: string;
// emailVerified: boolean;
// firstName:string;
// lastName:string;
// role:Roles;
// countryCode:string;
// mobile:string;
// sex:string;
// is_committee_member:string;
// designation:string;
// location:string;
// dobDate:Date;
// anniversaryDate:Date;
// related?:User;
// relatedUid:string;
// relation:string;
// enable:boolean;
// region:string;
// country:string;
// province:string;
// }
import { firestore } from 'firebase';

export interface Roles {
        user?: boolean;
        admin?: boolean;
 }
 export interface Mobile{
  number?: string;
    internationalNumber?:string;
    nationalNumber?: string;
    e164Number?: string;
    countryCode?: string;
    dialCode?: string;
 }
export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    firstName:string;
    lastName:string;
    role:Roles;
    mobile:Mobile;
    sex:string;
    is_global_committee_member:string;
    g_designation:Designation;
    is_committee_member:string;
    designation:string;
    region:string;
    country:string;
    province:string;
    dobDate:firestore.Timestamp;
    anniversaryDate:firestore.Timestamp;
    related?:User;
    relatedUid:string;
    relation:string;
   enable:boolean;
   order?:number;
   phoneNumber:Mobile;

 }
