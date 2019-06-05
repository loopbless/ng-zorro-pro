import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryTablesComponent } from './query-tables.component';

describe('QueryTablesComponent', () => {
  let component: QueryTablesComponent;
  let fixture: ComponentFixture<QueryTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryTablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
