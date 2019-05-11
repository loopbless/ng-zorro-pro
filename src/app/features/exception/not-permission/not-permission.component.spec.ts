import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotPermissionComponent } from './not-permission.component';

describe('NotPermissionComponent', () => {
  let component: NotPermissionComponent;
  let fixture: ComponentFixture<NotPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
