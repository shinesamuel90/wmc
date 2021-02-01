import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { FileUpload } from 'src/app/services/article';
import { AlbumdataService } from 'src/app/services/albumdata.service';
import { firestore } from 'firebase/app';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FileUploadId } from 'src/app/services/FileUploadId';
import { NavController, NavParams } from '@ionic/angular';
import { CommentsPage } from '../comments/comments.page';

@Component({
  selector: 'app-view-articles',
  templateUrl: './view-articles.page.html',
  styleUrls: ['./view-articles.page.scss'],
})
export class ViewArticlesPage implements OnInit {
  public folder: string;
  articles:Observable<FileUploadId[]>;
 heartType:string="heart-outline"
 src="assets/images/image1.jpg";
 postReference: AngularFirestoreDocument
 private shirtCollection: AngularFirestoreCollection<FileUpload>;
  userUid: string;
  constructor(private activatedRoute: ActivatedRoute,
    private articleService:ArticleService,
    private dataService:AlbumdataService,
    private router: Router,
    private user: AuthService,
    private afs: AngularFirestore,
    public navCtrl: NavController
    ) { }

  ngOnInit() {
     this.folder = "Articles";
    //  this.articleService.getArticles().snapshotChanges().subscribe(data => {
    // this.articles=data.map(e => {
    //   return{
    //     id:e.payload.doc.id,
    //     ...e.payload.doc.data() 
    //   }as FileUpload
    //   })
     
    // });
   this.getArticles();
   this.userUid=this.user.getUID();
   

   
  }
  getArticles() {
    this.articles = this.articleService.getArticles().snapshotChanges().pipe(
      map(actions => {
      return actions.map(a => {
          const data = a.payload.doc.data() as FileUpload;
          const id = a.payload.doc.id;
          return { id, ...data };
      });
      })
  );
  }
 readMore(url:string){
console.log(url);
this.dataService.setData(42, url);
    this.router.navigateByUrl('/dashboard/tabs/pdf-viewer/42');
 }
addHeart(id:string){
  
    this.articleService.addLike(id,this.userUid).then();

  }
  removeHeart(id:string){
    this.articleService.removeLike(id,this.userUid).then();
  }
  toCommentSection(post_data: any){
    let nav_params = new NavParams({
      post_id: post_data.id,
      
    });
    console.log(nav_params.data);
    this.router.navigate(['/dashboard/tabs/comments',post_data.id]);
    //this.navCtrl.navigateForward(['/dashboard/tabs/comments',post_data.id]);
  }
  showMessageCount(articleId:string){
     this.articleService.getComments(articleId).subscribe(data=>{
console.log("comments size",data.size);

     // return data.size
    })
    
  }
 }

