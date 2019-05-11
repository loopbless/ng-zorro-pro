import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingDrawerComponent } from './setting-drawer.component';

describe('SettingDrawerComponent', () => {
  let component: SettingDrawerComponent;
  let fixture: ComponentFixture<SettingDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
