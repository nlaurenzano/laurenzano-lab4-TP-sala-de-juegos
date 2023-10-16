import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegoMayormenorComponent } from './juego-mayormenor.component';

const routes: Routes = [{ path: '', component: JuegoMayormenorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegoMayormenorRoutingModule { }
