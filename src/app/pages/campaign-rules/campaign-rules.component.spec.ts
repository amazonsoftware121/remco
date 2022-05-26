import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignCompaniesDetailesComponent } from './campaign-contest-detailes.component';

describe('CampaignCompaniesDetailesComponent', () => {
  let component: CampaignCompaniesDetailesComponent;
  let fixture: ComponentFixture<CampaignCompaniesDetailesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignCompaniesDetailesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignCompaniesDetailesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
