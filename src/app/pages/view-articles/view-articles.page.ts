import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { FileUpload } from 'src/app/services/article';
import { AlbumdataService } from 'src/app/services/albumdata.service';


@Component({
  selector: 'app-view-articles',
  templateUrl: './view-articles.page.html',
  styleUrls: ['./view-articles.page.scss'],
})
export class ViewArticlesPage implements OnInit {
  public folder: string;
 public articles;
 src="assets/images/image1.jpg";
  constructor(private activatedRoute: ActivatedRoute,
    private articleService:ArticleService,
    private dataService:AlbumdataService,
    private router: Router
    ) { }

  ngOnInit() {
     this.folder = "Articles";
     this.articleService.getArticles().snapshotChanges().subscribe(data => {
    this.articles=data.map(e => {
      return{
        id:e.payload.doc.id,
        ...e.payload.doc.data() 
      }as FileUpload
      })
    });
    // console.log(this.articles.length)
   // this.articles=this.articleService.getArticles().valueChanges();
  }
 readMore(url:string){
console.log(url);
this.dataService.setData(42, url);
    this.router.navigateByUrl('/dashboard/tabs/pdf-viewer/42');
 }
}
