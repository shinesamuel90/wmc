import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { FileUpload } from 'src/app/services/article';


@Component({
  selector: 'app-view-articles',
  templateUrl: './view-articles.page.html',
  styleUrls: ['./view-articles.page.scss'],
})
export class ViewArticlesPage implements OnInit {
  public folder: string;
 public articles;
  constructor(private activatedRoute: ActivatedRoute,
    private articleService:ArticleService) { }

  ngOnInit() {
     this.folder = "Articles";
    //  this.articleService.getArticles().subscribe(data => {
    // this.articles=data.map(e => {
    //   return{
    //     id:e.payload.doc.id,
    //     ...e.payload.doc.data() 
    //   }as FileUpload
    //   })
    // });
    // console.log(this.articles.length)
    this.articles=this.articleService.getArticles().valueChanges();
  }
 
}
