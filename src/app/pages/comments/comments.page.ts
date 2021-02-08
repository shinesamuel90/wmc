
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comments } from 'src/app/models/comments';
import { FileUpload } from 'src/app/services/article';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploadId } from 'src/app/services/FileUploadId';
import { User } from 'src/app/services/users';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {
  post_id: any;
  user_comment: string = "";
  currentUser: any;
  src = "/assets/images/dummy-user.png"
  comments: Comments[]=[];
  constructor(
    //public navParams: NavParams,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private articleService: ArticleService,
    private authService: AuthService,
    
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.post_id = params['id'];
    });
    this.getCurrentUser();
    this.getExistingComments();

  }
  getExistingComments() {
    // this.article=this.articleService.getArticle(this.post_id);

    this.articleService.getComments(this.post_id).then(data => {
      data.docs.forEach(doc => {
        console.log(doc.data().message);
        
        this.comments.push({
          comment: doc.data().message, userPic: doc.data().userPic, user: doc.data().createdBy,
          createdDate: doc.data().createdAt
        });
         console.log(this.comments);
        // this.comments=this.comments.sort((a,b)=>{return b.createdDate-a.createdDate});
      })
    })



  }
  getCurrentUser() {
    this.authService.getUser(this.authService.getUID()).subscribe(actions => {
      console.log(actions.payload.data());
      this.currentUser = actions.payload.data();
    })

  }
  back() {
    this.navCtrl.navigateBack('/dashboard/tabs/view-articles')
  }
  public postComment() {
    this.articleService.saveComment(this.post_id, this.user_comment, this.currentUser).then(doc=>{
      console.log("latest id>>",doc.id);
      this.articleService.addCommentId(this.post_id,doc.id).then(()=>{
        console.log("commment id pushed successfully");
        
      })
this.comments.length=0;
this.user_comment="";
      this.getExistingComments();
    });

  }
}
