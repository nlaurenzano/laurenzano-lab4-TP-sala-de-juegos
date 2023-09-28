import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WhoamiRoutingModule } from './whoami-routing.module';
import { WhoamiComponent } from './whoami.component';


@NgModule({
  declarations: [
    WhoamiComponent
  ],
  imports: [
    CommonModule,
    WhoamiRoutingModule
  ]
})
export class WhoamiModule { }
