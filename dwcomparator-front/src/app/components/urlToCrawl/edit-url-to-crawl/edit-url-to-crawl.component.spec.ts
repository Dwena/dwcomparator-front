import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUrlToCrawlComponent } from './edit-url-to-crawl.component';

describe('EditUrlToCrawlComponent', () => {
  let component: EditUrlToCrawlComponent;
  let fixture: ComponentFixture<EditUrlToCrawlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUrlToCrawlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUrlToCrawlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
