import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'create', component: CreateComponent },
  { path: 'view', component: ViewComponent },
  { path: 'about', component: AboutComponent },  
  { path: '', pathMatch: 'full', redirectTo:'view' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
