import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTrainingCenterComponent } from './details-training-center.component';

describe('DetailsTrainingCenterComponent', () => {
  let component: DetailsTrainingCenterComponent;
  let fixture: ComponentFixture<DetailsTrainingCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsTrainingCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTrainingCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
