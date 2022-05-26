import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { AlertService } from 'src/app/providers/alertService';
import { WebService } from 'src/app/providers/web.serivce';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-partcipate-register',
  templateUrl: './partcipate-register.component.html',
  styleUrls: ['./partcipate-register.component.scss']
})
export class participateRigister implements OnInit {

  value:any={};

  base_url: string = environment.base_url;

  constructor(private dialog: MatDialogRef<participateRigister>,private router: Router,
    @Inject(MAT_DIALOG_DATA) public data:any,private web:WebService,private alert:AlertService) {this.value=data;console.log(this.value);
    }

    @HostListener('document:keyup.escape') onClose() {
      this.close();
    }
  
    close() {
      this.dialog.close();
    }
    sample(data)
    {

      console.log(data);
      return 'data';
    }
    login(){
      this.dialog.close();
      this.router.navigate(['/login/login']);
    }

  ngOnInit(): void {
  }
}
