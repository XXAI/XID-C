import { User } from "../models/user";
import { All, AuthActionTypes } from "./auth.actions";

export interface State{
    user: User | null;
    errorMessage: string | null;
}

export const initialState: State = {
    user: null,
    errorMessage: null
};

export function reducer(state = initialState, action: All): State {
    switch(action.type){
        case AuthActionTypes.LOGIN_SUCCESS : {
            return {
                ...state,
                user: {
                    token: action.payload.token,
                    email: action.payload.email
                },
                errorMessage: null
            };
        }
        case AuthActionTypes.LOGIN_FAILURE: {
            return {
                ...state,
                errorMessage: 'Incorrect email and/or password.'
            }
        }
        case AuthActionTypes.SIGNUP_SUCCESS : {
            return {
                ...state,
                user: {
                    token: action.payload.token,
                    email: action.payload.email
                },
                errorMessage: null
            }
        }
        case AuthActionTypes.SIGNUP_FAILURE : {
            return {
                ...state,
                errorMessage: 'The email is already in use.'
            }
        }
        case AuthActionTypes.LOGOUT : {
            return initialState;
        }
        default: {
            return state;
        }
    }
}

export const selectUser = (state : State) => state.user;