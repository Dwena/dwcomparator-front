import { TrainingCenter } from '../../../models/trainingCenter';
import { TraningCenterService } from '../../../services/training-center/traning-center.service';
import { CrawlerService } from '../../../services/crawler/crawler.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-training-center',
  templateUrl: './traning-center.component.html',
  styleUrls: ['./traning-center.component.css']
})

export class TrainingCenterComponent implements OnInit {

  public trainingCenter: TrainingCenter[];
  loading = false;
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  searchExpression: string;
  searchForm: FormGroup;
  msg: string;

  constructor(private tcService:TraningCenterService, private formBuilder: FormBuilder,private router:Router, private crawlerService: CrawlerService) { }

  ngOnInit(): void {
    this.msg = '';
    this.searchForm = this.formBuilder.group({
      searchExpression: ['']
    });

    this.searchExpression = '';



    this.itemsPerPage = 3;
    this.currentPage = 1;

    this.refreshTrainingCenterList();
  }

    // convenience getter for easy access to form fields
    // tslint:disable-next-line: typedef
    get f() { return this.searchForm.controls;
  }

  refreshTrainingCenterList(): void {
    this.tcService.countTrainingCenter(this.searchExpression).pipe().subscribe(result => {
      this.loading = false;
      this.totalItems = result.nb;
    });
    this.tcService.getTrainingCenter(this.currentPage, this.itemsPerPage, this.searchExpression).pipe().subscribe(trainingCenter => {
      this.loading = false;
      this.trainingCenter = trainingCenter;
    });

  }

  pageChanged(event): void{
    this.currentPage = event;
    this.refreshTrainingCenterList();
  }

  onSubmit(): void {
        this.loading = false;
        this.searchExpression = this.f.searchExpression.value;
        this.refreshTrainingCenterList();
  }



  onDeleteTc(tc){
    let conf = confirm("Etes vous sûre ?")
    if(conf) {
      this.tcService.deleteTrainingCenter(tc.id)
      .subscribe(data=>{
        this.refreshTrainingCenterList();
      },err => {
        console.log("error delete TC",err)
      })
    }
  }

  addNewTc(): void {
    this.router.navigateByUrl('/add-trainingcenter');
  }

  crawl(id: number) {
    this.loading = false;
    this.startAsyncCrawl(id);

  }

  async startAsyncCrawl(id: number){
    this.crawlerService.crawlTrainingCenter(id).subscribe({
      next: () => {
        console.log("crawl finished");
      },
      error: error => { this.msg = error; }
    });
    this.msg = "Crawl lancé - voir suivi dans la liste des crawlers";
  }

}
