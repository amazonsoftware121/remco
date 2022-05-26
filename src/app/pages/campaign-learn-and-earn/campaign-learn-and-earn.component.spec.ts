import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignLearnAndEarnComponent } from './campaign-learn-and-earn.component';

describe('CampaignCompaniesComponent', () => {
  let component: CampaignLearnAndEarnComponent;
  let fixture: ComponentFixture<CampaignLearnAndEarnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignLearnAndEarnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignLearnAndEarnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
