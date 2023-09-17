import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
    { path:"", redirectTo:'/home', pathMatch:'full' },
    { path:'home', component: HomeComponent },
    {
      path: 'login', 
      loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)
    },
    {
      path:"whoami",
      loadChildren: () => import('./components/whoami/whoami.module').then(m => m.WhoamiModule)
    },
    { path:"**", component: NotFoundComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
