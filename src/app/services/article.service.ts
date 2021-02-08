import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { FileUpload } from './article';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
 
  
  
  



  private basePath = '/uploads';
  constructor(
    public fstore: AngularFirestore) { }

  getArticles(): AngularFirestoreCollection<FileUpload> {

    return this.fstore.collection('uploads');
  }


  removeLike(articleId: any, uid: string) {
    const updateRef = this.fstore.collection('uploads').doc(articleId)
    return updateRef.update({
      likes: firestore.FieldValue.arrayRemove(uid)
    });
  }
  addLike(articleId: any, uid: string) {
    const updateRef = this.fstore.collection('uploads').doc(articleId)
    return updateRef.update({
      likes: firestore.FieldValue.arrayUnion(uid)
    });
  }
  saveComment(post_id: any, user_comment: string, currentUser: any) {
    // const updateRef = this.fstore.collection('uploads').doc(post_id)
    // return updateRef.update(
    //   {
    //     comments: firestore.FieldValue.arrayUnion({
    //       'message': user_comment,
    //       'avatar': currentUser.photoURL,
    //       'createdBy': currentUser.displayName,
    //       'createdAt': firebase.firestore.FieldValue.serverTimestamp()
    //     })
    //   });
     const comments= {
        'message': user_comment,
        'userPic': currentUser.photoURL,
        'createdBy': currentUser.displayName,
        'createdAt': firebase.firestore.FieldValue.serverTimestamp()
      }
      return this.fstore.collection('uploads').ref.doc(post_id).collection('comments').add(comments);
  }
  getArticle(post_id: string) {
    return this.fstore.collection('uploads').doc(post_id);
  }
  getComments(post_id: any) {
    return this.fstore.collection('uploads').doc(post_id).collection('comments').ref.orderBy("createdAt","desc").get();
  }
  addCommentId(postId:string,commentId: string) {
    const updateRef = this.fstore.collection('uploads').doc(postId)
    return updateRef.update({
      comments: firestore.FieldValue.arrayUnion(commentId)
    });
  }
  
}
