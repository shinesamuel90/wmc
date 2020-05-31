import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  
  constructor(public db: AngularFireDatabase,
    public firestore: AngularFirestore) { }
    getAlbums(){
    
      return this.firestore.collection('gallery');
      
   }
   getImageUrl(id: string) {
    return this.firestore.collection('files').doc(id).ref.get().then(function(doc){
      if(doc.exists){
        return doc.data()
      }else{
        return null
      }
    });
  }

}
