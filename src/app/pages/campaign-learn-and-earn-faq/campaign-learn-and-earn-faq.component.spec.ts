import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignLearnAndEarnFaqComponent } from './campaign-learn-and-earn-faq.component';

describe('CampaignLearnAndEarnFaqComponent', () => {
  let component: CampaignLearnAndEarnFaqComponent;
  let fixture: ComponentFixture<CampaignLearnAndEarnFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignLearnAndEarnFaqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignLearnAndEarnFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
