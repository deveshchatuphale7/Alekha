import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';

import { WelcomeComponent } from './welcome.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { AboutComponent } from './about/about.component';

import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  imports: [WelcomeRoutingModule,CommonModule,FormsModule,NzStepsModule,NzModalModule
    ,NzFormModule
    ,NzInputModule
    ,NzButtonModule,NzUploadModule,
    NzRadioModule,NzIconModule,NzSelectModule],
  declarations: [WelcomeComponent,
    CreateComponent,
    ViewComponent,
    AboutComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
