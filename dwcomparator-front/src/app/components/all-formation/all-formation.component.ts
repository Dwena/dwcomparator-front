import { IndexedPage } from 'src/app/models/indexed-page';
import { HttpParams } from '@angular/common/http';
import { IndexedPageService } from 'src/app/services/indexed-page/indexed-page.service';
import { TrainingCenter } from './../../models/trainingCenter';
import { TraningCenterService } from './../../services/training-center/traning-center.service';
import { Component, OnInit, EventEmitter, Input, Output  } from '@angular/core';
import { AllFormationService } from 'src/app/services/all-formation/all-formation.service';
import { IFormations } from '../../models/IFormations';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-all-formation',
  templateUrl: './all-formation.component.html',
  styleUrls: ['./all-formation.component.css']
})
export class AllFormationComponent implements OnInit {

  searchForm: FormGroup;
  loading = false;
  submitted = false;

  public allFormation: Observable<IFormations[]>;
  public currentPage: number = 0;
  public nbTotalFormation: number;
  pageSize = 8;
  public nbTotalPage: number;
  public pages: Array<number>;

  pagesSearchResult: IndexedPage[];
  centers: TrainingCenter[];

  keyword: string;
  audience: string;
  price_min;
  price_max;
  objectives: string;
  reference: string;
  duration: string;
  trainingcenter; //id du centre

  msg: string;
  constructor(private _allFormationService: AllFormationService,
              private trainingCenterService: TraningCenterService,
              private formBuilder: FormBuilder,
              private indexedPageService: IndexedPageService) { }

  form: FormGroup = new FormGroup({
    keyword: new FormControl('')

  });

  ngOnInit(): void {
      this.msg = '';
      this.searchForm = this.formBuilder.group({
            keyword: [''],
            audience: [''],
            price_min: [''], //TODO validator number
            price_max: [''], //TODO validator number
            objectives: [''],
            reference: [''],
            duration: [''],
            trainingcenter: [''],
        });

      this.keyword = '';
      this.audience = '';
      this.price_min = 0;
      this.price_max = 0;
      this.objectives = '';
      this.reference = '';
      this.duration = '';
      this.trainingcenter = 0;

      this._allFormationService.countAllFormation()
      .subscribe(data =>{
      this.nbTotalFormation = data["nb"];
      this.nbTotalPage = Math.ceil(Number(this.nbTotalFormation));
      this.pages = new Array<number>(this.nbTotalPage);
    },err=>{
      console.log(err);
      }),

      this.allFormation = this._allFormationService.getByKeyword();
      this.trainingCenterService.getAllTrainingCenter()
            .pipe().subscribe(centers => {
                this.loading = false;
                this.centers = centers;
                console.log(centers);
            });
  }

  onGetAllFormation(){
    this.allFormation = this._allFormationService.getByKeyword(this.currentPage, this.f.keyword.value);
  }



  // onPageIP(i) {
  //   this.currentPage = i;
  //   this.onGetIndexedPages();
  // }
  next() {
    if (this.currentPage * this.pageSize < this.nbTotalFormation) {
      this.currentPage++;
      this.onGetAllFormation();
    }
  }
  previous() {
    if (this.currentPage * this.pageSize < this.nbTotalFormation) {
      this.currentPage--;
      this.onGetAllFormation();
    }
  }
  first() {
    // Premiere page
    this.currentPage = 0;
    this.onGetAllFormation();
  }
  getDisabledNext() {
    // Si la page courante == total item => masqué. +1 car on commence à 0;
    if ((this.currentPage + 1) * this.pageSize == this.nbTotalFormation) {
      return 'display: none;';
    }
  }
  getDisabledPrev() {
    if (this.currentPage < 1) {
      return 'display: none;';
    }
  }

    onSubmit(): void {
    if (this.form.valid) {
      this.allFormation = this._allFormationService.getByKeyword(this.currentPage, this.f.keyword.value);
      this.submitEM.emit(this.form.value);
    }
  }
  onSearchBySubmit(): void {
        this.loading = false;

        this.keyword = this.f.keyword.value;
        this.audience = this.f.audience.value;
        this.price_min = this.f.price_min.value;
        this.price_max = this.f.price_max.value;
        this.objectives = this.f.objectives.value;
        this.reference = this.f.reference.value;
        this.duration = this.f.duration.value;
        this.trainingcenter = this.f.trainingcenter.value;
        this.refreshList();
    }
  get f() { return this.searchForm.controls; }

  refreshList(): void {
        const searchFormParams = new HttpParams()
            .append('keyword', this.keyword)
            .append('audience', this.audience)
            .append('price_min', this.price_min)
            .append('price_max', this.price_max)
            .append('objectives', this.objectives)
            .append('reference', this.reference)
            .append('duration', this.duration)
            .append('trainingcenter', this.trainingcenter);

        console.log('searchFormParams >>' + searchFormParams);

        this.indexedPageService.countBy(1, searchFormParams).pipe().subscribe(result => {
            this.loading = false;
            this.nbTotalFormation = result.nb;
            console.log('totalItems : ' + this.nbTotalFormation);
        });

        this.indexedPageService.searchBy(this.currentPage, this.pageSize, 1, searchFormParams)
            .pipe().subscribe(result => {
                this.loading = false;
                this.pagesSearchResult = result;
            });
    }

  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();

}
