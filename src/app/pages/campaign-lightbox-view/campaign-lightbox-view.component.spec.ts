import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignLightboxViewComponent } from './campaign-lightbox-view.component';

describe('CampaignLightboxViewComponent', () => {
  let component: CampaignLightboxViewComponent;
  let fixture: ComponentFixture<CampaignLightboxViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignLightboxViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignLightboxViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
