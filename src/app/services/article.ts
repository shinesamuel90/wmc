import { firestore } from 'firebase';
export interface Comment{
    message: string,
    avatar: string,
    createdBy: string,
    createdAt: firestore.Timestamp;
}
export interface FileUpload  {

   
    description: string;
    name: string;
    subtitle: string;
    title: string;
    url: string;
    likes:string[];
    comments:Comment[];
    }