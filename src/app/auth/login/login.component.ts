import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, selectAuthState } from 'src/app/app.states';
import { LogIn } from '../store/auth.actions';
import { SharedService } from 'src/app/shared/shared.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  getState: Observable<any>;
  
  constructor(
    private store: Store<AppState>,
    private sharedService: SharedService
  ) {
    this.getState = this.store.select(selectAuthState);
   }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('',{ validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required] })
    });

    this.getState.subscribe((state) => {
      if(state.errorMessage){
        this.sharedService.showSnackBar(state.errorMessage, null, 3000);
      }
    });
  }

  onSubmit(){
    const payload = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.store.dispatch(new LogIn(payload));
    //this.user =  this.loginForm.value as User;
    //console.log(this.user);
  }

}
