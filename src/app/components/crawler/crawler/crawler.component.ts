import { Crawler } from '../../../models/crawler';
import { CrawlerService } from 'src/app/services/crawler/crawler.service';
import { TraningCenterService } from 'src/app/services/training-center/traning-center.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  //selector: 'app-crawler',
  templateUrl: './crawler.component.html',
  styleUrls: ['./crawler.component.css']
})

export class CrawlerComponent implements OnInit {

  public crawler: Crawler[];
  public itemsPerPage: number;
  public currentPage: number = 1;
  public totalItems:number;
  public pages:Array<number>;
  public sortBy: string = "id";
  public descAsc: string = "DESC";
  form: FormGroup;
  searchExpression: string;
  searchForm: FormGroup;
  loading: boolean = false;
  //public nbTotalTC: number = 0;
  //public countTC: number = this.tcService.countTrainingCenter();
  public nbLignes = [
    /*{name: '1', valeur: '1'},
    {name: '2', valeur: '2'},
    {name: '3', valeur: '3'},
    {name: '4', valeur: '4'},
    {name: '5', valeur: '5'},*/
    {name: '20', valeur: '20'},
    {name: '35', valeur: '35'},
    {name: '50', valeur: '50'}
  ];

  formNbLigne = new FormGroup({
    nbLigneSelect: new FormControl(this.nbLignes[0]),
  });

  constructor(
    private cService:CrawlerService, 
    private router:Router, 
    private tcService:TraningCenterService, 
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {

    this.searchForm = this.formBuilder.group({
      searchExpression: ['']
    });
    this.searchExpression = '';
    //this.changementNbLigne();
    this.onGetCrawler()
  }

  get F(){
    return this.searchForm.controls;
  }

  relancerIndexation(id){
    this.cService.crawlTrainingCenter(id);
  }

  onGetCrawler(){
    this.itemsPerPage = this.formNbLigne.value.nbLigneSelect.name;
    this.cService.countCrawler(this.searchExpression)
      .subscribe(data =>{
          this.totalItems = data["nb"];
          console.log("totalItems data:",data["nb"]);
          console.log("totalItems:",this.totalItems);
        },err=>{
          console.log(err);
        }
      )

    this.cService.getCrawlerByPage(this.currentPage,this.itemsPerPage,this.searchExpression).pipe(first()).subscribe(data => {
      this.crawler = data;
      console.log("currentPage:",this.currentPage," || itemsPerPage:",this.itemsPerPage," || sortBy:",this.sortBy," || descAsc:",this.descAsc," || searchExpression:",this.searchExpression);
      console.log("data:",data);
    });
  }

  pageChanged(event){
    this.currentPage = event;
    this.onGetCrawler();
  }

  /*changementNbLigne(){
    //console.log("nbligne : ",this.formNbLigne.value.nbLigneSelect.name);
    this.itemsPerPage = this.formNbLigne.value.nbLigneSelect.name;
    this.onGetCrawler();
  }*/

  triPar(sortby){
    if(this.sortBy == sortby)
      if(this.descAsc == "DESC")
        this.descAsc = "ASC";
      else
        this.descAsc = "DESC"
    this.sortBy = sortby;
    this.onGetCrawler();
    //this.changementNbLigne();
  }

onSubmit(){
  this.searchExpression = this.F.searchExpression.value;
  this.onGetCrawler();
}

  /*onEditCrawler(cr){
    this.router.navigateByUrl("/edit-trainingcenter/" + cr.id)
  }*/

  /*onDeleteCrawler(cr){
    let conf = confirm("Etes vous sûre ?")
    if(conf) {
      this.cService.deleteTrainingCenter(tc.id)
      .subscribe(data=>{
        this.onGetTrainingCenter();
      },err => {
        console.log("error delete TC",err)
      })
    }
  }*/
}
