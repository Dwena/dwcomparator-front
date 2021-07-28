import { CrawlerService } from 'src/app/services/crawler/crawler.service';
import { TraningCenterService } from 'src/app/services/training-center/traning-center.service';
//import { UrlToCrawlService } from 'src/app/services/';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';



@Component({
  //selector: 'app-crawler',
  templateUrl: './launch-crawler.component.html',
  styleUrls: ['./launch-crawler.component.css']
})

export class LaunchCrawlerComponent implements OnInit {

  form: FormGroup;
  public trainingCentersForms;
  public error: string = "";
  public success: string = "";
  public CrawlerURLForms;
  public spinner: boolean = false;
  public crawlerInProgress: boolean = false;

  formTrainingCenter = new FormGroup({
    trainingCenterSelect: new FormControl(),
    CrawlerURLSelect: new FormControl(),
  });
  constructor(private cService:CrawlerService, private router:Router, private tcService:TraningCenterService) { }

  ngOnInit(): void {
    this.onGetTrainingCenter();
  }

  onGetTrainingCenter(){
    this.tcService.getAllTrainingCenter().subscribe(data =>{
      //this.trainingCenters = data;
      this.trainingCentersForms = data;
    },err=>{
      console.log(err);
    });
  }

  launchCrawlerByTraingCenterOrURL(): void{
    // Process checkout data here
    let idCentreFormation: number;
    if(this.formTrainingCenter.value.trainingCenterSelect){
      if(!this.crawlerInProgress){
        idCentreFormation = this.formTrainingCenter.value.trainingCenterSelect;
        console.log('Centre de formation selectionne : ', idCentreFormation);
        this.cService.crawlTrainingCenter(idCentreFormation).pipe(first()).subscribe(data =>{
            console.log("Crawler lancé : ",data);
            this.launchCrawl(data);
          },err=>{
            console.log("Erreur lancement du crawler : ",err);
            this.error = "Erreur lancement du crawler : ",err;
          }
        )
        this.formTrainingCenter.reset();
      }
    }else{
      this.error = 'Sélectionner un centre de formation';
      this.success = "";
    }
  }

  public launchCrawl(data){
    this.error = "";
    document.getElementById('btnLaunchCrawl').style.display = 'none';
    document.getElementById('btnLaunchCrawl').style.visibility = 'hidden';
    this.spinner = true;
    this.success = "Lancement du crawl pour le centre de formation ",data.trainingCenter;
    console.log("Lancement du crawl pour le centre de formation ",data.trainingCenter);
  }

  public isError(){
    return this.error;
  }

  public onChangeTrainingCenter(){
    //this.formTrainingCenter.value.trainingCenterSelect
    this.crawlerInProgress = this.cService.ifCrawlerInProgressByIdTrainingFormation(this.formTrainingCenter.value.trainingCenterSelect)._isScalar;
  }
}
