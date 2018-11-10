import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private sharedService: SharedService, private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getServerProfile().subscribe( 
      response => {
        console.log(response);
      }, error => {
        console.log(error);
        this.sharedService.showSnackBar("Hubo un error al cargar el perfil.",null,3000);
      }
    );
    //this.store.dispatch(new GetStatus);
  }

}
