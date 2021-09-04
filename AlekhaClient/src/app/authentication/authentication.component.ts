import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  viewLoginFlag :boolean = true;

  submitForm(param): void {
    console.log(param)
    if(param == "login"){
      this.common.httpPost("http://localhost:3000/login",{"email":this.loginForm.get('email').value,
      "password":this.loginForm.get('password').value}).subscribe((res:any)=>{

      if(res.data.length){
        this.common.createNotification("info","Login Successful !","Welcome !");
        setTimeout(() => {
          this.common.loginEmail = res.data[0].email; 
          this.common.loginFlag = true;
          this.router.navigate(["/home"]);  
        }, 500);
      }
      });
    }else if(param == "signup"){
      this.common.httpPost("http://localhost:3000/signup",{"email":this.signupForm.get('email').value,
      "password":this.signupForm.get('password').value}).subscribe((res:any)=>{

      
        this.common.createNotification("info","Signup Successful !","Please Login");
        setTimeout(() => {
          this.viewLoginFlag = true;
        }, 500);
      
      });

    }

    
    // for (let i in this.loginForm.controls) {
    //   if (this.loginForm.controls.hasOwnProperty(i)) {
    //     this.loginForm.controls[i].markAsDirty();
    //     this.loginForm.controls[i].updateValueAndValidity();
    //   }
    // }
  }

  constructor(private fb: FormBuilder,private common :CommonService,private router:Router) {}

  ngOnInit(): void {

    // this.loginForm = this.fb.group({
    //   userName: [null, [Validators.required]],
    //   password: [null, [Validators.required]]
    // });

    this.loginForm = new FormGroup({          
      'email':new FormControl(null,Validators.email), //note, can have up to 3 Constructor Params: default value, validators, AsyncValidators
      'password':new FormControl(null)
 })

 this.signupForm = new FormGroup({          
  'email':new FormControl(null,Validators.email), //note, can have up to 3 Constructor Params: default value, validators, AsyncValidators
  'password':new FormControl(null),
  'cnfpassword': new FormControl(null)

})

    // this.signupForm = this.fb.group({
    //   userName: [null, [Validators.required]],
    //   password: [null, [Validators.required]],
    //   cnfpassword: [null, [Validators.required]]
    // });
  }

}
