import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
 

  constructor(
    private firestore: AngularFirestore
  ) { }
  getVideos() {
    return this.firestore.collection('video-gallery',ref=>ref.where('active', '==', true));
  }
}
