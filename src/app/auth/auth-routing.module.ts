import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { GuessGuard } from './guess.guard';




const routes: Routes = [
  { path: 'signup', component: SignupComponent, canActivate: [GuessGuard] },
  { path: 'login', component: LoginComponent, canActivate: [GuessGuard] },
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  declarations: [],
  providers: [GuessGuard]
})
export class AuthRoutingModule { }
