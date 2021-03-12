import { Reducer } from 'react';
import { LOGIN_SUCCESS, LOGIN_FAIL} from '../actions/types';
import {AuthActionInterface} from '../actions/authActions';

export interface authStateInterface{
    isAuthenticated : boolean;
    token : string;
    recruiter : {
        id : string,
        email : string
    };
}

const initialState : authStateInterface = {
    isAuthenticated: false,
    token: localStorage.getItem('token') || '',
    recruiter: {id:'', email:''}
};

export const authReducer  = (
    state = initialState,
    action : AuthActionInterface
    ) => {
        switch (action.type){
            case LOGIN_SUCCESS:
                localStorage.setItem('token', action.payload.token);
                return{...state, ...action.payload, isAuthenticated: true}
            case LOGIN_FAIL:
                localStorage.removeItem('token');
                return{...state, token: '', isAuthenticated: false, recruiter : {id:'',email:''}}
            default:
                return state;
        }
}