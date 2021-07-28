import { Component, OnInit } from '@angular/core';
import { UrlToCrawlService } from '../../../services/urlToCrawl/url-to-crawl.service'
import { TrainingCenter } from "src/app/models/trainingCenter";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { urlToCrawl } from 'src/app/models/urlToCrawl'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs';
import { TraningCenterService } from 'src/app/services/training-center/traning-center.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-url-to-crawl',
  templateUrl: './edit-url-to-crawl.component.html',
  styleUrls: ['./edit-url-to-crawl.component.css']
})
export class EditUrlToCrawlComponent implements OnInit {

  public lstUrl: urlToCrawl = {} as urlToCrawl;
  public tc: TrainingCenter = null;
  public lstString: Array<string> = [];

  url: FormControl;
  newUrl: FormControl;
  preActions: FormControl;
  preSessionsActions: FormControl;
  subLevelNumber: FormControl;
  searchExpressionByLevel: FormControl;
  referenceSearchExpression: FormControl;
  titleSearchExpression: FormControl;
  durationSearchExpression: FormControl;
  priceSearchExpression: FormControl;
  referenceReplaceExpression: FormControl;
  titleReplaceExpression: FormControl;
  durationReplaceExpression: FormControl;
  priceReplaceExpression: FormControl;
  trainingProgramSearchExpression: FormControl;
  objectivesSearchExpression: FormControl;
  prerequisitesSearchExpression: FormControl;
  audienceSearchExpression: FormControl;
  certificationSearchExpression: FormControl;
  eligibleForCPFSearchExpression: FormControl;
  trainingProgramReplaceExpression: FormControl;
  objectivesReplaceExpression: FormControl;
  prerequisitesReplaceExpression: FormControl;
  audienceReplaceExpression: FormControl;
  certificationReplaceExpression: FormControl;
  eligibleForCPFReplaceExpression: FormControl;
  startDateSearchExpression: FormControl;
  endDateSearchExpression: FormControl;
  locationSearchExpression: FormControl;
  subscriptionUrlSearchExpression: FormControl;
  sessionsReplaceExpression: FormControl;
  startDateReplaceExpression: FormControl;
  endDateReplaceExpression: FormControl;
  locationReplaceExpression: FormControl;
  subscriptionUrlReplaceExpression: FormControl;
  fullUrl: FormControl;
  trainingCenter: FormControl;

  submitted = false;
  idRoute: number = parseInt(this.route.snapshot.paramMap.get('id'));
  trainingCenterLst: TrainingCenter[] = [] as TrainingCenter[];
  trainingCenterSelect: TrainingCenter = {} as TrainingCenter;
  urlToCrawl: urlToCrawl;
  form: FormGroup

  constructor(private _urlToCrawlService: UrlToCrawlService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _trainingCenter: TraningCenterService,
    private router: Router
  ) { }

  ngOnInit(){
    this._urlToCrawlService.getOneUrl(this.idRoute).pipe().subscribe(value => {
      this.lstUrl = value
      this.initObject();

    });

    this.url = new FormControl(null, [ Validators.required ])
    this.newUrl = new FormControl(null, [ Validators.required ]),
    this.preActions = new FormControl(null, [ Validators.required ]),
    this.preSessionsActions = new FormControl(null, [ Validators.required ]),
    this.subLevelNumber = new FormControl(null, [ Validators.required ]),
    this.searchExpressionByLevel = new FormControl(null, [ Validators.required, Validators.pattern('[0-9]') ]),
    this.referenceSearchExpression = new FormControl(null, [ Validators.required ])
    this.titleSearchExpression = new FormControl(null, [ Validators.required ])
    this.durationSearchExpression = new FormControl(null, [ Validators.required ])
    this.priceSearchExpression = new FormControl(null, [ Validators.required ])
    this.referenceReplaceExpression = new FormControl(null, [ Validators.required ])
    this.titleReplaceExpression = new FormControl(null, [ Validators.required ])
    this.durationReplaceExpression = new FormControl(null, [ Validators.required ])
    this.priceReplaceExpression = new FormControl(null, [ Validators.required ])
    this.trainingProgramSearchExpression = new FormControl(null, [ Validators.required ])
    this.objectivesSearchExpression = new FormControl(null, [ Validators.required ])
    this.prerequisitesSearchExpression = new FormControl(null, [ Validators.required ])
    this.audienceSearchExpression = new FormControl(null, [ Validators.required ])
    this.certificationSearchExpression = new FormControl(null, [ Validators.required ])
    this.eligibleForCPFSearchExpression = new FormControl(null, [ Validators.required ])
    this.trainingProgramReplaceExpression = new FormControl(null, [ Validators.required ])
    this.objectivesReplaceExpression = new FormControl(null, [ Validators.required ])
    this.prerequisitesReplaceExpression = new FormControl(null, [ Validators.required ])
    this.audienceReplaceExpression = new FormControl(null, [ Validators.required ])
    this.certificationReplaceExpression = new FormControl(null, [ Validators.required ])
    this.eligibleForCPFReplaceExpression = new FormControl(null, [ Validators.required ])
    this.startDateSearchExpression = new FormControl(null, [ Validators.required ])
    this.endDateSearchExpression = new FormControl(null, [ Validators.required ])
    this.locationSearchExpression = new FormControl(null, [ Validators.required ])
    this.subscriptionUrlSearchExpression = new FormControl(null, [ Validators.required ])
    this.sessionsReplaceExpression = new FormControl(null, [ Validators.required ])
    this.startDateReplaceExpression = new FormControl(null, [ Validators.required ])
    this.endDateReplaceExpression = new FormControl(null, [ Validators.required ])
    this.locationReplaceExpression = new FormControl(null, [ Validators.required ])
    this.subscriptionUrlReplaceExpression = new FormControl(null, [ Validators.required ])
    this.fullUrl = new FormControl(null, [Validators.required])
    this.trainingCenter = new FormControl(null, [Validators.required])

    this.form = this.fb.group({
      urlField :  this.url,
      newUrlField : this.newUrl,
      preActionsField : this.preActions,
      preSessionsActionsField : this.preSessionsActions,
      subLevelNumberField : this.subLevelNumber,
      searchExpressionByLevelField : this.searchExpressionByLevel,
      referenceSearchExpressionField :  this.referenceSearchExpression,
      titleSearchExpressionField :  this.titleSearchExpression,
      durationSearchExpressionField :  this.durationSearchExpression,
      priceSearchExpressionField :  this.priceSearchExpression,
      referenceReplaceExpressionField :  this.referenceReplaceExpression,
      titleReplaceExpressionField :  this.titleReplaceExpression,
      durationReplaceExpressionField :  this.durationReplaceExpression,
      priceReplaceExpressionField :  this.priceReplaceExpression,
      trainingProgramSearchExpressionField :  this.trainingProgramSearchExpression,
      objectivesSearchExpressionField :  this.objectivesSearchExpression,
      prerequisitesSearchExpressionField :  this.prerequisitesSearchExpression,
      audienceSearchExpressionField :  this.audienceSearchExpression,
      certificationSearchExpressionField :  this.certificationSearchExpression,
      eligibleForCPFSearchExpressionField :  this.eligibleForCPFSearchExpression,
      trainingProgramReplaceExpressionField :  this.trainingProgramReplaceExpression,
      objectivesReplaceExpressionField :  this.objectivesReplaceExpression,
      prerequisitesReplaceExpressionField :  this.prerequisitesReplaceExpression,
      audienceReplaceExpressionField :  this.audienceReplaceExpression,
      certificationReplaceExpressionField :  this.certificationReplaceExpression,
      eligibleForCPFReplaceExpressionField :  this.eligibleForCPFReplaceExpression,
      startDateSearchExpressionField :  this.startDateSearchExpression,
      endDateSearchExpressionField :  this.endDateSearchExpression,
      locationSearchExpressionField :  this.locationSearchExpression,
      subscriptionUrlSearchExpressionField :  this.subscriptionUrlSearchExpression,
      sessionsReplaceExpressionField :  this.sessionsReplaceExpression,
      startDateReplaceExpressionField :  this.startDateReplaceExpression,
      endDateReplaceExpressionField :  this.endDateReplaceExpression,
      locationReplaceExpressionField :  this.locationReplaceExpression,
      subscriptionUrlReplaceExpressionField :  this.subscriptionUrlReplaceExpression,
      fullUrlField :  this.fullUrl,
      trainingCenterField: this.trainingCenter,

    });

     this._trainingCenter.getTrainingCenter(1, 10, "").pipe().subscribe(value => {
        this.trainingCenterLst = value
      })
  }


  get f() { return this.form.controls; }

  onEditUrlToCrawl() {
     this.submitted = true;
    let trainingcenterId = this.f.trainingCenterField.value;

    if (this.f.newUrlField.status == "INVALID"
      || this.f.trainingCenterField.status == "INVALID"
      || this.f.fullUrlField.status == "INVALID") {
      return;
    }

    this._trainingCenter.getTrainingCenterById(trainingcenterId).pipe(first()).subscribe(value => {
      this.urlToCrawl.trainingCenter = value
      this._urlToCrawlService.editUrl(this.urlToCrawl).pipe().subscribe((value) => {

      console.log(value)
    })
    });
      this.router.navigateByUrl('/listUrlToCrawl');


  }

  initObject() {
      this.urlToCrawl =  {
        id: this.lstUrl.id,
        version: this.lstUrl.version,
        trainingCenter: this.lstUrl.trainingCenter,
        url: this.lstUrl.url,
        newUrl: this.lstUrl.newUrl,
        preActions: this.lstUrl.preActions,
        preSessionsActions: this.lstUrl.preSessionsActions,
        subLevelNumber: this.lstUrl.subLevelNumber,
        searchExpressionByLevel: this.lstUrl.searchExpressionByLevel,
        referenceSearchExpression:this.lstUrl.referenceSearchExpression,
        titleSearchExpression:this.lstUrl.titleSearchExpression,
        durationSearchExpression:this.lstUrl.durationSearchExpression,
        priceSearchExpression:this.lstUrl.priceSearchExpression,
        referenceReplaceExpression:this.lstUrl.referenceReplaceExpression,
        titleReplaceExpression:this.lstUrl.titleReplaceExpression,
        durationReplaceExpression:this.lstUrl.durationReplaceExpression,
        priceReplaceExpression:this.lstUrl.priceReplaceExpression,
        trainingProgramSearchExpression:this.lstUrl.trainingProgramSearchExpression,
        objectivesSearchExpression:this.lstUrl.objectivesSearchExpression,
        prerequisitesSearchExpression:this.lstUrl.prerequisitesSearchExpression,
        audienceSearchExpression:this.lstUrl.audienceSearchExpression,
        certificationSearchExpression:this.lstUrl.certificationSearchExpression,
        eligibleForCPFSearchExpression:this.lstUrl.eligibleForCPFSearchExpression,
        trainingProgramReplaceExpression:this.lstUrl.trainingProgramReplaceExpression,
        objectivesReplaceExpression:this.lstUrl.objectivesReplaceExpression,
        prerequisitesReplaceExpression:this.lstUrl.prerequisitesReplaceExpression,
        audienceReplaceExpression:this.lstUrl.audienceReplaceExpression,
        certificationReplaceExpression:this.lstUrl.certificationReplaceExpression,
        eligibleForCPFReplaceExpression:this.lstUrl.eligibleForCPFReplaceExpression,
        startDateSearchExpression:this.lstUrl.startDateSearchExpression,
        endDateSearchExpression:this.lstUrl.endDateSearchExpression,
        locationSearchExpression:this.lstUrl.locationSearchExpression,
        subscriptionUrlSearchExpression:this.lstUrl.subscriptionUrlSearchExpression,
        sessionsReplaceExpression:this.lstUrl.sessionsReplaceExpression,
        startDateReplaceExpression:this.lstUrl.startDateReplaceExpression,
        endDateReplaceExpression:this.lstUrl.endDateReplaceExpression,
        locationReplaceExpression:this.lstUrl.locationReplaceExpression,
        subscriptionUrlReplaceExpression:this.lstUrl.subscriptionUrlReplaceExpression,
        fullUrl: this.lstUrl.fullUrl
      };

  }

}
