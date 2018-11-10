import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { ProfileService } from '../profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'profile-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  editingPassword: boolean = false;
  editingAccount: boolean = false;
  isLoading: boolean = false;

  profileSubscription: Subscription;

  passwordFormGroup: FormGroup;
  accountFormGroup: FormGroup;

  profile: any = {};

  constructor(private sharedService: SharedService, private profileService:ProfileService) { }

  ngOnInit() {
    this.passwordFormGroup = new FormGroup({
      current_password: new FormControl('', { validators: [Validators.required]}),
      new_password: new FormControl('', { validators: [Validators.required, this.validatorNewPassword]}),
      password_confirmation: new FormControl('', { validators: [Validators.required, this.validatorPasswordConfirmation] })
    });

    this.accountFormGroup = new FormGroup({
      nombre: new FormControl('',{ validators: [Validators.required] }),
      apellido_paterno: new FormControl('',{ validators: [Validators.required] }),
      apellido_materno: new FormControl('',{ }),
      email: new FormControl('',{ validators: [Validators.required, Validators.email] }),
    });

    this.profileSubscription = this.profileService.profileChange.subscribe(
      profile => {
        this.profile = profile;

        this.accountFormGroup.controls["nombre"].setValue(this.profile.nombre);
        this.accountFormGroup.controls["apellido_paterno"].setValue(this.profile.apellido_paterno);
        this.accountFormGroup.controls["apellido_materno"].setValue(this.profile.apellido_materno);
        this.accountFormGroup.controls["email"].setValue(this.profile.email);
      }
    );
  }

  ngOnDestroy(){
    this.profileSubscription.unsubscribe();
  }

  onSubmitPasswordForm(){

    this.isLoading = true;
    
    this.profileService.resetPassword(this.passwordFormGroup.value.current_password,this.passwordFormGroup.value.new_password).subscribe(
      response => {
        this.isLoading = false;
      }, errorResponse => {
        var errorMessage = "Ocurrió un error.";
        if(errorResponse.status == 409){
          errorMessage = errorResponse.error.message;
        }
        this.sharedService.showSnackBar(errorMessage, null, 3000);
        this.isLoading = false;
      }
    );
  }

  onSubmitAccountForm(){

  }

  validatorNewPassword(control: AbstractControl): { [key:string]: boolean } {
    if(control.parent != null){
      if(control.value !== undefined && control.value != ""  && control.value ==  control.parent.controls["current_password"].value){
        return {"old_password": true}
      }
    }
    return null;
  }

  validatorPasswordConfirmation(control: AbstractControl): { [key:string]: boolean } {
    if(control.parent != null){
      if(control.value !== undefined && control.value !=  control.parent.controls["new_password"].value){
        return {"not_confirmed": true}
      }
    }
    return null;
  }

}
