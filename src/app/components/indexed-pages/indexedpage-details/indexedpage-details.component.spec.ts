import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexedpageDetailsComponent } from './indexedpage-details.component';

describe('IndexedpageDetailsComponent', () => {
  let component: IndexedpageDetailsComponent;
  let fixture: ComponentFixture<IndexedpageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexedpageDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexedpageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
