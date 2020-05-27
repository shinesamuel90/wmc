export interface Roles { 
    user?: boolean;
    admin?: boolean;
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
mobile:string;
sex:string;
is_committee_member:string;
designation:string;
location:string;
dobDate:Date;
anniversaryDate:Date;
related?:User;
relatedUid:string;
relation:string;
enable:boolean;

}