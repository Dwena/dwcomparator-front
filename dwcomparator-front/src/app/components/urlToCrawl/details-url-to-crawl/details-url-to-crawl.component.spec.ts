import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsUrlToCrawlComponent } from './details-url-to-crawl.component';

describe('DetailsUrlToCrawlComponent', () => {
  let component: DetailsUrlToCrawlComponent;
  let fixture: ComponentFixture<DetailsUrlToCrawlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsUrlToCrawlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsUrlToCrawlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
