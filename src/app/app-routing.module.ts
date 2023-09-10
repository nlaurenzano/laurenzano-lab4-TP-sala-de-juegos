import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { WhoamiComponent } from './components/whoami/whoami.component';

const routes: Routes = [
  {
    path:"", redirectTo:'/home', pathMatch:'full'
  },
  {
    path:"home",
    component: HomeComponent
  },
  {
    path:"login",
    component: LoginComponent
  },
  {
    path:"whoami",
    component: WhoamiComponent
  },
  {
    path:"**",
    component: HomeComponent
    // component: NotFoundComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
