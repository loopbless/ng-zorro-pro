import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeColorComponent } from './theme-color.component';

describe('ThemeColorComponent', () => {
  let component: ThemeColorComponent;
  let fixture: ComponentFixture<ThemeColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
