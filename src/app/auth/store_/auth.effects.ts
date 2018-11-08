import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { map, switchMap, catchError, tap } from "rxjs/operators";


import { AuthService } from "../auth.service";

import { AuthActionTypes, LogIn, LogInSuccess, LogInFailure, SignUp, SignUpSuccess, SignUpFailure, LogOut, GetStatus } from "./auth.actions";

@Injectable()
export class AuthEffects {
    constructor(
        private actions: Actions,
        private router: Router,
        private authService: AuthService
    ){}

    @Effect()
    LogIn: Observable<any> = this.actions
        .ofType(AuthActionTypes.LOGIN)
        .pipe(map( (action: LogIn) => action.payload))
        .pipe(switchMap(payload => {
            return this.authService.logIn(payload.email, payload.password)
                .pipe(map((user) => {
                    console.log(user);
                    return new LogInSuccess({ token: user.token, email: payload.email });
                }))
                .pipe(catchError((error)=> {
                    console.log(error);
                    return  of(new LogInFailure({error: error}));
                }));
        }));
    
    @Effect({ dispatch: false})
    LogInSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        tap((user) => {
            localStorage.setItem('token', user.payload.token);
            this.router.navigateByUrl('/profile');
        })
    );

    @Effect({dispatch: false})
    LogInFailure: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_FAILURE)
    );

    @Effect()
    SignUp: Observable<any> = this.actions
        .ofType(AuthActionTypes.SIGNUP)
        .pipe(map( (action: SignUp) => action.payload ))
        .pipe(switchMap( (payload) =>{
            return this.authService.signUp(payload)
                .pipe(map( (user) => {
                    console.log(user);
                    return new SignUpSuccess({ token: user.token, email: payload.email});
                }))
                .pipe(catchError( (error) => {
                    return of(new SignUpFailure({ error: error}));
                }));
        }));
    
    @Effect({dispatch: false})
    SignUpSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.SIGNUP_SUCCESS),
        tap((user) => {
            localStorage.setItem('token', user.payload.token);
            this.router.navigateByUrl('/profile');
        })
    );

    @Effect({dispatch: false})
    SignUpFailure: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.SIGNUP_FAILURE)
    );

    @Effect({dispatch: false})
    public LogOut: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGOUT),
        tap((user)=>{
            localStorage.removeItem('token');
        })
    );
/*
    @Effect({dispatch: false})
    public GetStatus: Observable<any> = this.actions
    .ofType(AuthActionTypes.GET_STATUS)
    .pipe(switchMap(payload => {
       // return this.authService.getStatus();
    }));*/

}

