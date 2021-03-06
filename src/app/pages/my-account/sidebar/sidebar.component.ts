import { Route } from '@angular/compiler/src/core';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/providers/alertService';
import { WebService } from 'src/app/providers/web.serivce';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  selectedMenu: string;

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  image: any;

  base_url: string = environment.base_url;
  userId: any;
  userType: any;
  fetchingStatus: boolean = true;
  accountInfo: any;

  @Input() value;
  participantsForm: any;
  loading: boolean=false;
  editParticipant: boolean = false;
  plan:any;

  constructor(
    
  private web: WebService,
 
  private alert: AlertService,

  private activateRoute: ActivatedRoute,

  private router:Router
    
  ) {
    this.userId = localStorage.getItem('UserId');
    this.userType = localStorage.getItem('Role');
    // this.getAccountDetails();
    console.log('works1')
   }

  

  changeSideMenu(menu: string) {
    this.selectedMenu = menu;
    this.notifyParent.emit(menu);
  }

  ngOnInit() {
    // this.selectedMenu = my-profile;
    this.selectedMenu = 'my-profile';
    this.getAccountDetails();
    console.log('works1')
    this.getplan();
  }

  ngOnChanges(){
    console.log('works123423111')
  }

  getplan() {
    let userId = localStorage.getItem('UserId');
    if(userId){
      this.web.getData('getplandetails?planDetails_id='+ userId).then((res) => {
        if (res.status == '200') {
          this.plan = res.data[0];
          console.log('planDetailsss',this.plan.subscribe_status);
        } else {
          // this.alert.errorMsg(res.error, '');
        }
      }, err => {
        this.alert.errorMsg('Connection Error', '');
      });
    }
  }

  changeplan(){
    this.router.navigate(['/pricing']);
    // window.location.reload();
  }

  getAccountDetails() {
    let data = {
      userId: this.userId,
      role: this.userType
    }
    this.fetchingStatus = true;
    this.web.postData('getAccountDetails', data).then((res) => {
      console.log('data details is', data);
      if (res.status == '200') {
        this.accountInfo = res.data;
        setTimeout(() => {
          this.fetchingStatus = false;
        }, Math.random() * 2000 + 2000);
        // console.log('account details is', res);
      } else {
        this.alert.errorMsg(res.error, '');
      }
    }, err => {
      console.log(err);
      this.alert.errorMsg('Connection Error', '');
    });
  }
}