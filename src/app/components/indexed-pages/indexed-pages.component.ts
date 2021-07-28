import { IndexedPage } from 'src/app/models/indexed-page';
import { IndexedPageService } from 'src/app/services/indexed-page/indexed-page.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs-compat/operator/first';

@Component({
  selector: 'app-indexed-pages',
  templateUrl: './indexed-pages.component.html',
  styleUrls: ['./indexed-pages.component.css']
})
export class IndexedPagesComponent implements OnInit {
  loading = false;
  indexedPages: IndexedPage[];
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  searchExpression: string;
  searchForm: FormGroup;

  constructor(
    private ipService: IndexedPageService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchExpression: ['']
    });

    this.searchExpression = '';



    this.itemsPerPage = 10;
    this.currentPage = 1;

    this.refreshindexedpages();
  }

    // convenience getter for easy access to form fields
    // tslint:disable-next-line: typedef
    get f() { return this.searchForm.controls;
  }

  refreshindexedpages(): void{
    // update count
    this.ipService.countIndexedPage(this.searchExpression).pipe().subscribe(result => {
      this.loading = false;
      this.totalItems = result.nb;
    });
    // update list
    this.ipService.getAllByKeyword( this.searchExpression, this.currentPage, this.itemsPerPage).pipe().subscribe(indexedpages => {
            this.loading = false;
            this.indexedPages = indexedpages;
    });
  }

  pageChanged(event): void{
    this.currentPage = event;
    this.refreshindexedpages();
  }

  onSubmit(): void {
        this.loading = false;
        this.searchExpression = this.f.searchExpression.value;
        this.refreshindexedpages();
  }

  onDeleteIp(ip): void{
    let conf = confirm('Etes vous sûre ?');
    if (conf) {
      this.ipService.deleteIndexedPage(ip.id)
        .subscribe(data => {
          this.refreshindexedpages();
        }, err => {
          console.log('error delete Indexed Page ', err);
        });
    }
  }
  onAddIp(): void{
    this.router.navigateByUrl('/add-indexedpages');
  }

}
