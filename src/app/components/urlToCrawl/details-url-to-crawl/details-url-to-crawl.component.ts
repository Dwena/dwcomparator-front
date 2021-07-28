import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { urlToCrawl } from 'src/app/models/urlToCrawl';
import { UrlToCrawlService } from 'src/app/services/urlToCrawl/url-to-crawl.service';

@Component({
  selector: 'app-details-url-to-crawl',
  templateUrl: './details-url-to-crawl.component.html',
  styleUrls: ['./details-url-to-crawl.component.css']
})
export class DetailsUrlToCrawlComponent implements OnInit {

  urlToCrawl: urlToCrawl = {} as urlToCrawl;
  id: number;
  error = '';
  loading = false;

  constructor(private route: ActivatedRoute,
    private urlToCrawlService: UrlToCrawlService) { }

  ngOnInit(): void {

    this.route.params
      .subscribe(params => {
        this.id = params.id;
        this.urlToCrawlService.getOneUrl(this.id)
          .subscribe({
            next: (foundUrl) => {
              this.urlToCrawl = foundUrl;
            },
            error: error => {
              this.error = error;
              this.loading = false;
            }
          });
      }
      );
  }

  goBack() {
    window.history.back();
  }

}
