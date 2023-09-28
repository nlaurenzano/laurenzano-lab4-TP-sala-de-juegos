import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WhoamiComponent } from './whoami.component';

const routes: Routes = [{ path: '', component: WhoamiComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WhoamiRoutingModule { }
