import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchCrawlerComponent } from './launch-crawler.component';

describe('LaunchCrawlerComponent', () => {
  let component: LaunchCrawlerComponent;
  let fixture: ComponentFixture<LaunchCrawlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaunchCrawlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchCrawlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
