import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUrlToCrawlComponent } from './add-url-to-crawl.component';

describe('AddUrlToCrawlComponent', () => {
  let component: AddUrlToCrawlComponent;
  let fixture: ComponentFixture<AddUrlToCrawlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUrlToCrawlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUrlToCrawlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
