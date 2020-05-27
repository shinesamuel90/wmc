import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FileUpload } from './article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private basePath = '/uploads';
  constructor(public db: AngularFireDatabase,
    public firestore: AngularFirestore) { }
    getFileUploads(): AngularFireList<FileUpload> {
      // return this.db.list(this.basePath, ref =>
      //   ref.limitToLast(numberItems));
      return this.db.list(this.basePath);
  
    }
    getArticles():AngularFirestoreCollection<FileUpload>{
      
     return this.firestore.collection('uploads');
    }
}
