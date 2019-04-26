import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSiderComponent } from './page-sider.component';

describe('PageSiderComponent', () => {
  let component: PageSiderComponent;
  let fixture: ComponentFixture<PageSiderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSiderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
