import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignWidgetViewComponent } from './campaign-widget-view.component';

describe('CampaignWidgetViewComponent', () => {
  let component: CampaignWidgetViewComponent;
  let fixture: ComponentFixture<CampaignWidgetViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignWidgetViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignWidgetViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
