import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTraningCenterComponent } from './edit-traning-center.component';

describe('EditTraningCenterComponent', () => {
  let component: EditTraningCenterComponent;
  let fixture: ComponentFixture<EditTraningCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTraningCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTraningCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
