import { isSyntheticPropertyOrListener } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { UrlToCrawlService } from '../../../services/urlToCrawl/url-to-crawl.service'
import { Observable } from 'rxjs';
import { urlToCrawl } from 'src/app/models/urlToCrawl'
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CrawlerService } from 'src/app/services/crawler/crawler.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-list-url-to-crawl',
  templateUrl: './list-url-to-crawl.component.html',
  styleUrls: ['./list-url-to-crawl.component.css']
})
export class ListUrlToCrawlComponent implements OnInit {


  lstUrls: urlToCrawl[];
  newList: Array<any> = [];
  form: FormGroup;
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  searchExpression: string;
  loading = false;

  constructor(private cService:CrawlerService, private _urlToCrawlService: UrlToCrawlService, private formBuilder: FormBuilder,private router:Router) { }



   ngOnInit() {

//     this._urlToCrawlService.getAllUrl().pipe().subscribe(value => this.lstUrls = value);
     this.form = this.formBuilder.group({
      searchExpression: ['']
     });

     this.searchExpression = '';



    this.itemsPerPage = 3;
     this.currentPage = 1;

     this.refreshList();
  }

   get f() { return this.form.controls;
  }

  async onDeleteUrlToCrawl(lst) {

    await this._urlToCrawlService.deleteUrlById(lst.id).pipe().subscribe(data => {

        this.refreshList();

    });
  }


  refreshList() {
     console.log(this.currentPage);

    this._urlToCrawlService.countUrlToCrawl(this.searchExpression).pipe().subscribe(result => {
      this.loading = false;
      this.totalItems = result.nb;
    });
    this._urlToCrawlService.getAllUrlToCrawl(this.currentPage, this.itemsPerPage, this.searchExpression).pipe().subscribe(data => {
      this.loading = false;
      this.lstUrls = data;
    });


  }

  pageChanged(event): void{
    console.log(event);
    this.currentPage = event;
    this.refreshList();
  }



  onSubmit(): void {
        this.loading = false;
        this.searchExpression = this.f.searchExpression.value;
        this.refreshList();
  }

  crawl(id: number) {
    this.cService.crawlTrainingCenter(id).pipe(first()).subscribe(data => {
      console.log("Crawler lancé : ", data);

    });
  }



}


