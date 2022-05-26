import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestFullviewGallaryVoteComponent } from './contest-fullview-gallary-vote.component';

describe('ContestFullviewGallaryVoteComponent', () => {
  let component: ContestFullviewGallaryVoteComponent;
  let fixture: ComponentFixture<ContestFullviewGallaryVoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContestFullviewGallaryVoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestFullviewGallaryVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
