import { firestore } from 'firebase';
export interface Comments {
    comment: string;
    user: string;
    userPic: string;
   createdDate:  firestore.Timestamp
}