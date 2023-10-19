import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
    { path:"", redirectTo:'/home', pathMatch:'full' },
    { path:'home', component: HomeComponent },
    { path: 'login',  loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
    { path:"whoami", loadChildren: () => import('./components/whoami/whoami.module').then(m => m.WhoamiModule) },
    { path: 'registro', loadChildren: () => import('./components/registro/registro.module').then(m => m.RegistroModule) },
    { path: 'menu-juegos', loadChildren: () => import('./components/menu-juegos/menu-juegos.module').then(m => m.MenuJuegosModule) },
    { path: 'juego-ahorcado', loadChildren: () => import('./components/juego-ahorcado/juego-ahorcado.module').then(m => m.JuegoAhorcadoModule) },
    { path: 'juego-mayormenor', loadChildren: () => import('./components/juego-mayormenor/juego-mayormenor.module').then(m => m.JuegoMayormenorModule) },
    { path: 'juego-preguntados', loadChildren: () => import('./components/juego-preguntados/juego-preguntados.module').then(m => m.JuegoPreguntadosModule) },
    { path: 'juego-simon', loadChildren: () => import('./components/juego-simon/juego-simon.module').then(m => m.JuegoSimonModule) },
    { path:"**", component: NotFoundComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
