import { IndexedPageService } from 'src/app/services/indexed-page/indexed-page.service';
import { ActivatedRoute } from '@angular/router';
import { IndexedPage } from 'src/app/models/indexed-page';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indexedpage-details',
  templateUrl: './indexedpage-details.component.html',
  styleUrls: ['./indexedpage-details.component.css']
})
export class IndexedpageDetailsComponent implements OnInit {

  ip: IndexedPage = {} as IndexedPage;
  id: number;
  error = '';
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private ipService: IndexedPageService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        this.id = params.id;
        this.ipService.getIndexedPageById(this.id)
          .subscribe({
            next: (foundIp) => {
              this.ip = foundIp;
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
