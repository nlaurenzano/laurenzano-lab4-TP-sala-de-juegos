import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegoSimonComponent } from './juego-simon.component';

const routes: Routes = [{ path: '', component: JuegoSimonComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegoSimonRoutingModule { }
