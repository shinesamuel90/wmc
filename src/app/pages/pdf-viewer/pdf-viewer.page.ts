import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.page.html',
  styleUrls: ['./pdf-viewer.page.scss'],
})
export class PdfViewerPage implements OnInit {
  url: any;

  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    if (this.route.snapshot.data['special']) {
      this.url = this.route.snapshot.data['special'];
      console.log(this.url);
      
    }
  }

}
