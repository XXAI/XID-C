import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from 'src/app/app.states';
import { LogOut } from 'src/app/auth/store/auth.actions';
import { User } from 'src/app/auth/models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() onSidenavToggle = new EventEmitter<void>();

  public isAuthenticated:boolean = false;
  user:User;

  getState:Observable<any>

  constructor(
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthState);
   }

  ngOnInit() {
    this.getState.subscribe((state)=> {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
    });
  }

  toggleSidenav(){
    this.onSidenavToggle.emit();
  }

  logout(){
    console.log("logout")
    this.store.dispatch(new LogOut);
  }

}
