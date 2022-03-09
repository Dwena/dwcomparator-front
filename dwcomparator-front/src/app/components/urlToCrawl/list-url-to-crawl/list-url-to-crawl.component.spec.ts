import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUrlToCrawlComponent } from './list-url-to-crawl.component';

describe('ListUrlToCrawlComponent', () => {
  let component: ListUrlToCrawlComponent;
  let fixture: ComponentFixture<ListUrlToCrawlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUrlToCrawlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUrlToCrawlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
