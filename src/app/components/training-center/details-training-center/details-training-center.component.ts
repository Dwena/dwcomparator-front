import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { TrainingCenter } from 'src/app/models/trainingCenter';
import { urlToCrawl } from 'src/app/models/urlToCrawl';
import { CrawlerService } from 'src/app/services/crawler/crawler.service';
import { UrlToCrawlService } from 'src/app/services/urlToCrawl/url-to-crawl.service';
import { TraningCenterService } from './../../../services/training-center/traning-center.service'

@Component({
  selector: 'app-details-training-center',
  templateUrl: './details-training-center.component.html',
  styleUrls: ['./details-training-center.component.css']
})
export class DetailsTrainingCenterComponent implements OnInit {

  trainingCenter: TrainingCenter = {} as TrainingCenter;
  urlToCrawlLst: urlToCrawl[] = [] as urlToCrawl[];
  id: number;
  error = '';
  loading = false;
  urlToCrawl: urlToCrawl = {} as urlToCrawl;
  lstUrls: urlToCrawl[];

  constructor(
    private route: ActivatedRoute,
    private tcService: TraningCenterService,
    private urlService: UrlToCrawlService,
    private cService:CrawlerService
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        this.id = params.id;
        this.tcService.getTrainingCenterById(this.id)
          .subscribe({
            next: (foundTc) => {
              this.trainingCenter = foundTc;

              this.urlService.getAllUrl().pipe().subscribe(datas => {
                datas.map(value => {
                  if (value.trainingCenter.name === foundTc.name) {
                    this.urlToCrawlLst.push(value)
                  }
                });
              });
            },
            error: error => {
              this.error = error;
              this.loading = false;
            }
          });
      }
      );

      this.route.params
      .subscribe(params => {
        this.id = params.id;
        this.urlService.getByTrainingCenterId(this.id)
          .subscribe(
            value => this.lstUrls = value,
            );
      }
      );
  }

  crawl(id: number) {
    this.cService.crawlTrainingCenter(id).pipe(first()).subscribe(data => {
      console.log("Crawler lancé : ", data);

    });

  }



}
