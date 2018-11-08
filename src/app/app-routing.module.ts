import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from "@angular/router";

import { WelcomeComponent } from "./welcome/welcome.component";
import { AuthGuard } from './auth/auth.guard';
import { GuessGuard } from './auth/guess.guard';


const routes: Routes = [
  { path: '', component: WelcomeComponent, canActivate: [GuessGuard] },  
  { path: 'profile', loadChildren: './profile/profile.module#ProfileModule', canLoad: [AuthGuard] },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [AuthGuard, GuessGuard]
})
export class AppRoutingModule { }
