import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { TrainingCenter } from 'src/app/models/trainingCenter';
import { urlToCrawl } from 'src/app/models/urlToCrawl';
import { TraningCenterService } from 'src/app/services/training-center/traning-center.service';
import { UrlToCrawlService } from 'src/app/services/urlToCrawl/url-to-crawl.service';

@Component({
  selector: 'app-add-url-to-crawl',
  templateUrl: './add-url-to-crawl.component.html',
  styleUrls: ['./add-url-to-crawl.component.css']
})
export class AddUrlToCrawlComponent implements OnInit {


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
  urlToCrawl: urlToCrawl;
  form: FormGroup
  trainingCenterLst: TrainingCenter[] = [] as TrainingCenter[];
  trainingCenterSelect: TrainingCenter = {} as TrainingCenter;

  constructor(private fb: FormBuilder, private _urlToCrawlService: UrlToCrawlService, private _trainingCenter : TraningCenterService, private router: Router) { }

  ngOnInit(): void {

    this.url = new FormControl(null, [Validators.required])
    this.newUrl = new FormControl(null, [Validators.required]),
    this.preActions = new FormControl(null, [Validators.required]),
    this.preSessionsActions = new FormControl(null, [Validators.required]),
    this.subLevelNumber = new FormControl(null, [Validators.required, Validators.pattern('[0-9]')]),
    this.searchExpressionByLevel = new FormControl(null, [Validators.required]),
    this.referenceSearchExpression = new FormControl(null, [Validators.required])
    this.titleSearchExpression = new FormControl(null, [Validators.required])
    this.durationSearchExpression = new FormControl(null, [Validators.required])
    this.priceSearchExpression = new FormControl(null, [Validators.required])
    this.referenceReplaceExpression = new FormControl(null, [Validators.required])
    this.titleReplaceExpression = new FormControl(null, [Validators.required])
    this.durationReplaceExpression = new FormControl(null, [Validators.required])
    this.priceReplaceExpression = new FormControl(null, [Validators.required])
    this.trainingProgramSearchExpression = new FormControl(null, [Validators.required])
    this.objectivesSearchExpression = new FormControl(null, [Validators.required])
    this.prerequisitesSearchExpression = new FormControl(null, [Validators.required])
    this.audienceSearchExpression = new FormControl(null, [Validators.required])
    this.certificationSearchExpression = new FormControl(null, [Validators.required])
    this.eligibleForCPFSearchExpression = new FormControl(null, [Validators.required])
    this.trainingProgramReplaceExpression = new FormControl(null, [Validators.required])
    this.objectivesReplaceExpression = new FormControl(null, [Validators.required])
    this.prerequisitesReplaceExpression = new FormControl(null, [Validators.required])
    this.audienceReplaceExpression = new FormControl(null, [Validators.required])
    this.certificationReplaceExpression = new FormControl(null, [Validators.required])
    this.eligibleForCPFReplaceExpression = new FormControl(null, [Validators.required])
    this.startDateSearchExpression = new FormControl(null, [Validators.required])
    this.endDateSearchExpression = new FormControl(null, [Validators.required])
    this.locationSearchExpression = new FormControl(null, [Validators.required])
    this.subscriptionUrlSearchExpression = new FormControl(null, [Validators.required])
    this.sessionsReplaceExpression = new FormControl(null, [Validators.required])
    this.startDateReplaceExpression = new FormControl(null, [Validators.required])
    this.endDateReplaceExpression = new FormControl(null, [Validators.required])
    this.locationReplaceExpression = new FormControl(null, [Validators.required])
    this.subscriptionUrlReplaceExpression = new FormControl(null, [Validators.required])
    this.fullUrl = new FormControl(null, [Validators.required])
    this.trainingCenter = new FormControl(null, [Validators.required])

    this.form = this.fb.group({
      urlField: this.url,
      newUrlField: this.newUrl,
      preActionsField: this.preActions,
      preSessionsActionsField: this.preSessionsActions,
      subLevelNumberField: this.subLevelNumber,
      searchExpressionByLevelField: this.searchExpressionByLevel,
      referenceSearchExpressionField: this.referenceSearchExpression,
      titleSearchExpressionField: this.titleSearchExpression,
      durationSearchExpressionField: this.durationSearchExpression,
      priceSearchExpressionField: this.priceSearchExpression,
      referenceReplaceExpressionField: this.referenceReplaceExpression,
      titleReplaceExpressionField: this.titleReplaceExpression,
      durationReplaceExpressionField: this.durationReplaceExpression,
      priceReplaceExpressionField: this.priceReplaceExpression,
      trainingProgramSearchExpressionField: this.trainingProgramSearchExpression,
      objectivesSearchExpressionField: this.objectivesSearchExpression,
      prerequisitesSearchExpressionField: this.prerequisitesSearchExpression,
      audienceSearchExpressionField: this.audienceSearchExpression,
      certificationSearchExpressionField: this.certificationSearchExpression,
      eligibleForCPFSearchExpressionField: this.eligibleForCPFSearchExpression,
      trainingProgramReplaceExpressionField: this.trainingProgramReplaceExpression,
      objectivesReplaceExpressionField: this.objectivesReplaceExpression,
      prerequisitesReplaceExpressionField: this.prerequisitesReplaceExpression,
      audienceReplaceExpressionField: this.audienceReplaceExpression,
      certificationReplaceExpressionField: this.certificationReplaceExpression,
      eligibleForCPFReplaceExpressionField: this.eligibleForCPFReplaceExpression,
      startDateSearchExpressionField: this.startDateSearchExpression,
      endDateSearchExpressionField: this.endDateSearchExpression,
      locationSearchExpressionField: this.locationSearchExpression,
      subscriptionUrlSearchExpressionField: this.subscriptionUrlSearchExpression,
      sessionsReplaceExpressionField: this.sessionsReplaceExpression,
      startDateReplaceExpressionField: this.startDateReplaceExpression,
      endDateReplaceExpressionField: this.endDateReplaceExpression,
      locationReplaceExpressionField: this.locationReplaceExpression,
      subscriptionUrlReplaceExpressionField: this.subscriptionUrlReplaceExpression,
      fullUrlField: this.fullUrl,
      trainingCenterField: this.trainingCenter,
    });


    this._trainingCenter.getTrainingCenter(1, 20, "").pipe().subscribe(value => {
        this.trainingCenterLst = value
      })

  }

  get f() { return this.form.controls; }

  async onAddUrlToCrawl() {

    this.submitted = true;
    let trainingcenterId = this.f.trainingCenterField.value;

    if (this.f.newUrlField.status == "INVALID"
      || this.f.trainingCenterField.status == "INVALID"
      || this.f.fullUrlField.status == "INVALID") {
      return;
    }

    this._trainingCenter.getTrainingCenterById(trainingcenterId).pipe(first()).subscribe(value => {

      let datas = {
        id: -1,
        version: 0,
        trainingCenter: value,
        url: this.f.urlField.value,
        newUrl: this.f.newUrlField.value,
        preActions: this.f.preActionsField.value,
        preSessionsActions: this.f.preSessionsActionsField.value,
        subLevelNumber: this.f.subLevelNumberField.value,
        searchExpressionByLevel: { "1": "haha" },
        referenceSearchExpression: this.f.referenceSearchExpressionField.value,
        titleSearchExpression: this.f.titleSearchExpressionField.value,
        durationSearchExpression: this.f.durationSearchExpressionField.value,
        priceSearchExpression: this.f.priceSearchExpressionField.value,
        referenceReplaceExpression: this.f.referenceReplaceExpressionField.value,
        titleReplaceExpression: this.f.titleReplaceExpressionField.value,
        durationReplaceExpression: this.f.durationReplaceExpressionField.value,
        priceReplaceExpression: this.f.priceReplaceExpressionField.value,
        trainingProgramSearchExpression: this.f.trainingProgramSearchExpressionField.value,
        objectivesSearchExpression: this.f.objectivesSearchExpressionField.value,
        prerequisitesSearchExpression: this.f.prerequisitesSearchExpressionField.value,
        audienceSearchExpression: this.f.audienceSearchExpressionField.value,
        certificationSearchExpression: this.f.certificationSearchExpressionField.value,
        eligibleForCPFSearchExpression: this.f.eligibleForCPFSearchExpressionField.value,
        trainingProgramReplaceExpression: this.f.trainingProgramReplaceExpressionField.value,
        objectivesReplaceExpression: this.f.objectivesReplaceExpressionField.value,
        prerequisitesReplaceExpression: this.f.prerequisitesReplaceExpressionField.value,
        audienceReplaceExpression: this.f.audienceReplaceExpressionField.value,
        certificationReplaceExpression: this.f.certificationReplaceExpressionField.value,
        eligibleForCPFReplaceExpression: this.f.eligibleForCPFReplaceExpressionField.value,
        startDateSearchExpression: this.f.startDateSearchExpressionField.value,
        endDateSearchExpression: this.f.endDateSearchExpressionField.value,
        locationSearchExpression: this.f.locationSearchExpressionField.value,
        subscriptionUrlSearchExpression: this.f.subscriptionUrlSearchExpressionField.value,
        sessionsReplaceExpression: this.f.sessionsReplaceExpressionField.value,
        startDateReplaceExpression: this.f.startDateReplaceExpressionField.value,
        endDateReplaceExpression: this.f.endDateReplaceExpressionField.value,
        locationReplaceExpression: this.f.locationReplaceExpressionField.value,
        subscriptionUrlReplaceExpression: this.f.subscriptionUrlReplaceExpressionField.value,
        fullUrl: this.f.fullUrlField.value
      }
      this._urlToCrawlService.addUrl(datas);
      this.router.navigateByUrl('/listUrlToCrawl');

    });

  }


}
