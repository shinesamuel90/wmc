import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-articles',
  templateUrl: './view-articles.page.html',
  styleUrls: ['./view-articles.page.scss'],
})
export class ViewArticlesPage implements OnInit {
  public folder: string;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
     this.folder = "Articles";
  }
 
}
