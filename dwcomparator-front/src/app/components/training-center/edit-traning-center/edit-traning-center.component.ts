import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TraningCenterService } from 'src/app/services/training-center/traning-center.service';
import { TrainingCenter } from 'src/app/models/trainingCenter';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-training-center',
  templateUrl: './edit-traning-center.component.html',
  styleUrls: ['./edit-traning-center.component.css']
})

export class EditTrainingCenterComponent implements OnInit {
  trainingCenterForm: FormGroup;
  submitted: boolean = false;
  numberRegEx = /\-?\d*\.?\d{1,2}/;
  constructor(private formBuilder: FormBuilder,private router:Router,private activatedRoute:ActivatedRoute,private tcService:TraningCenterService ) { }
  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params.id;
    this.tcService.getTrainingCenterById(id).subscribe(data => {
      this.trainingCenterForm = this.formBuilder.group({
        name: [data.name, [Validators.required,Validators.minLength(3)] ],
        baseSiteUrl: [data.baseSiteUrl, [Validators.required,Validators.minLength(3)] ],
        searchUrl: [data.searchUrl, Validators.required ],
        searchFormMethod: [data.searchFormMethod, Validators.required ],
        searchParameters: [data.searchParameters, Validators.required ],
        indexingFrequency: [data.indexingFrequency, [Validators.required,Validators.pattern("^([1-9][0-9]?|[12][0-9][0-9]|3[0-5][0-9]|36[0-5])$")] ],
        pricesIncludingTaxes: [data.pricesIncludingTaxes ? "true" : "false", Validators.required ]
      })
    }, err => {
      console.log(err)
    })
    
  }

  get getControl(){
    return this.trainingCenterForm.controls;
  }

  onUpdateTraininCenter(){
    console.log('submit');
    if(!this.trainingCenterForm.valid) {
      console.log(this.trainingCenterForm.errors); 
      return false;
    } else {
      this.tcService.UpdateTrainingCenter(this.trainingCenterForm.value).subscribe();
        this.router.navigateByUrl("/trainingCenter");
      };
  }

}
