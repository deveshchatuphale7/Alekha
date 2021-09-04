import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
  visible: boolean = false;
  userEmail:string = "";

  public logout(){
    this.common.loginEmail = "";
    this.common.loginFlag =false;
    
    setTimeout(() => {
      this.router.navigate(["/auth"]);  
    }, 500);
    
  }

  constructor(private router:Router,public common:CommonService){

  }

}
