import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private http : HttpClient,private notification: NzNotificationService) { }
  loginEmail:string;
  loginFlag:boolean = false
httpPost(url:string,params?){
  return this.http.post(url,params);
}

httpGet(url:string){
  return this.http.get(url);
}

createNotification(type: string,title:string,message:string): void {
  this.notification.create(
    type,
    title,
    message);
}


}
