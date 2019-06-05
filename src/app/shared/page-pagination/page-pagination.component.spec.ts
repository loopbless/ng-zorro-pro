import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePaginationComponent } from './page-pagination.component';

describe('PagePaginationComponent', () => {
  let component: PagePaginationComponent;
  let fixture: ComponentFixture<PagePaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
