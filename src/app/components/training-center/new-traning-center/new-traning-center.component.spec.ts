import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTraningCenterComponent } from './new-traning-center.component';

describe('NewTraningCenterComponent', () => {
  let component: NewTraningCenterComponent;
  let fixture: ComponentFixture<NewTraningCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTraningCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTraningCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
