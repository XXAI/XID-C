import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'profile-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.css']
})
export class IdentityComponent implements OnInit, OnDestroy {

  profileSubscription: Subscription;

  identityFormGroup: FormGroup;

  profile: any = {};

  constructor(private sharedService: SharedService, private profileService:ProfileService) { }

  ngOnInit() {
    this.profileSubscription = this.profileService.profileChange.subscribe(
      profile => {
        this.profile = profile;
      }
    )
  }
  ngOnDestroy(){
    this.profileSubscription.unsubscribe();
  }

}
