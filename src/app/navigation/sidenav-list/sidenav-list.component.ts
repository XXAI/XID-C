import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from 'src/app/app.states';
import { LogOut } from 'src/app/auth/store/auth.actions';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/models/user';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() onCloseSidenav = new EventEmitter<void>();

  isAuthenticated:boolean = false;
  user: User;

  getState: Observable<any>;

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
  
  logout(){
    console.log("logout")
    this.store.dispatch(new LogOut);
  }
  
  close(){
    this.onCloseSidenav.emit()
  }

}
