import { Component, OnInit, Inject, Injector, Injectable  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TraningCenterService } from 'src/app/services/training-center/traning-center.service';
import { LoginComponent } from '../../login/login.component';
import { TrainingCenter } from 'src/app/models/trainingCenter';

@Component({
  selector: 'app-new-training-center',
  templateUrl: './new-traning-center.component.html',
  styleUrls: ['./new-traning-center.component.css']
})

@Injectable()
export class NewTrainingCenterComponent implements OnInit {
  trainingcenter: TrainingCenter = {
    id: null,
    name: null,
    baseSiteUrl: null,
    searchUrl: null,
    searchFormMethod: null,
    searchParameters: null,
    indexingFrequency: 0,
    pricesIncludingTaxes: true,
    logoFilePath: null
  };
  trainingCenterForm: FormGroup;
  submitted: boolean = false;
  numberRegEx = /\-?\d*\.?\d{1,2}/;
  constructor(private tcService: TraningCenterService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initForm();

  }

  initForm() {
    this.trainingCenterForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      baseSiteUrl: ['', [Validators.required, Validators.minLength(3)]],
      searchUrl: ['', Validators.required],
      searchFormMethod: ['POST', Validators.required],
      searchParameters: ['', Validators.required],
      indexingFrequency: [1, [Validators.required, Validators.pattern("^([1-9][0-9]?|[12][0-9][0-9]|3[0-5][0-9]|36[0-5])$")]],
      pricesIncludingTaxes: ["true", Validators.required]
    })
  }

  get getControl() {
    return this.trainingCenterForm.controls;
  }

  onSaveTrainingCenter() {
    this.submitted = true;
    console.log(this.trainingCenterForm.value.name);

    if (!this.trainingCenterForm.valid) {
      console.log(this.trainingCenterForm.errors);
      return false;
    } else {
      this.tcService.saveTrainingCenter(this.trainingCenterForm.value).subscribe(
        res => {
          this.router.navigateByUrl("/trainingCenter");
        }, err => {
          console.log(err)
        })
    }
  }
}
