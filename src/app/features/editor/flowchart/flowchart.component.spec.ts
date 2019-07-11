import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NzoFlowchartComponent } from './flowchart.component';

describe('NzoFlowchartComponent', () => {
  let component: NzoFlowchartComponent;
  let fixture: ComponentFixture<NzoFlowchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NzoFlowchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzoFlowchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
