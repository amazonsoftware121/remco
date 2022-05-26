import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestFullviewGallaryComponent } from './contest-fullview-gallary.component';

describe('ContestFullviewGallaryComponent', () => {
  let component: ContestFullviewGallaryComponent;
  let fixture: ComponentFixture<ContestFullviewGallaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContestFullviewGallaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestFullviewGallaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
