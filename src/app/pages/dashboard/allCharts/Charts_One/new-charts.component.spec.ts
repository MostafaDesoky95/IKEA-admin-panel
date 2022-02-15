import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChartsComponent } from './new-charts.component';

describe('NewChartsComponent', () => {
  let component: NewChartsComponent;
  let fixture: ComponentFixture<NewChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
