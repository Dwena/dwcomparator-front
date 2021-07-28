import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexedPagesComponent } from './indexed-pages.component';

describe('IndexedPagesComponent', () => {
  let component: IndexedPagesComponent;
  let fixture: ComponentFixture<IndexedPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexedPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexedPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
