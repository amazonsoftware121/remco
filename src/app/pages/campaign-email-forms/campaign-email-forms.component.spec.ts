import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignCompaniesComponent } from './campaign-contest.component';

describe('CampaignCompaniesComponent', () => {
  let component: CampaignCompaniesComponent;
  let fixture: ComponentFixture<CampaignCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignCompaniesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
