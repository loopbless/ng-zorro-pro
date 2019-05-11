import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelsMenuComponent } from './levels-menu.component';

describe('LevelsMenuComponent', () => {
  let component: LevelsMenuComponent;
  let fixture: ComponentFixture<LevelsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
