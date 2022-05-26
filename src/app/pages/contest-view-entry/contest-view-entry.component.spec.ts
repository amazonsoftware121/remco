import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestViewEntryComponent } from './contest-view-entry.component';

describe('ContestViewEntryComponent', () => {
  let component: ContestViewEntryComponent;
  let fixture: ComponentFixture<ContestViewEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContestViewEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestViewEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
