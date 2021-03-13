import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios, { AxiosResponse } from 'axios';

import { LOGIN_SUCCESS, LOGIN_FAIL} from './types';
import {authStateInterface} from '../reducers/authReducers';
import { returnErrors, createMessage } from './alertsActions';

export interface AuthActionInterface {
    type : typeof LOGIN_SUCCESS | typeof LOGIN_FAIL
    payload : authPayload
}

export interface authPayload{
    recruiter : {
        id : string;
        email : string;
    }
    token : string;
}

export const login : ActionCreator<
    ThunkAction<
        Promise<any>, 
        authStateInterface, 
        null, 
        AuthActionInterface
    >>  = (email : string, password : string) =>{

        return async (dispatch : Dispatch) =>{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify({email, password});

            await axios.post('http://localhost:8080/api/recruiters/auth/', body, config)
                .then((response : AxiosResponse) => {
                    dispatch(createMessage('Login was a Success!'));
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: response.data
                    })
                }).catch((err) => {
                    if(!err.response){dispatch(returnErrors(err.message, 500));}
                    else{dispatch(returnErrors(err.message, err.response.status));}
                    dispatch({
                        type: LOGIN_FAIL,
                        payload: {recruiter:{id:'',email:''}, token:''}
                    })
                })
    }
}
