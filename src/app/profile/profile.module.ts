import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared/shared.module';

import { UserComponent } from './user/user.component';
import { AddressComponent } from './address/address.component';
import { IdentityComponent } from './identity/identity.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ],
  declarations: [ProfileComponent, UserComponent, AddressComponent, IdentityComponent]
})
export class ProfileModule { }
