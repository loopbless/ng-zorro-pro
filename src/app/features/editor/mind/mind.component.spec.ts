import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MindComponent } from './mind.component';

describe('MindComponent', () => {
  let component: MindComponent;
  let fixture: ComponentFixture<MindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
