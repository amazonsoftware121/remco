import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { LoaderService } from 'src/app/providers/loader.service';

@Component({
  selector: 'app-campaign-companies',
  templateUrl: './campaign-companies.component.html',
  styleUrls: ['./campaign-companies.component.scss']
})
export class CampaignCompaniesComponent implements OnInit {

  title = "Animated Count";

  nums: Array<number> = [25, 76, 48];

  @ViewChild("oneItem") oneItem: any;
  @ViewChildren("count") count: QueryList<any>;


  constructor(private loaderService: LoaderService,private elRef: ElementRef) {
    this.loaderService.stopLoader();
   }

  ngOnInit(): void {
  }

}
