import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios, { AxiosResponse } from 'axios';

import { LIST_CANDIDATES, CREATE_CANDIDATE, DELETE_CANDIDATE, UPDATE_CANDIDATE} from './types';
import {candidatesStateInterface} from '../reducers/candidatesReducers';
import { returnErrors, createMessage } from './alertsActions';

export interface CandidateInterface{
    id: string;
    name: string;
    email: string;
    age: number;
    linkedin: string;
    techs: string[];
    createdAt:Date;
}

export interface candidatesActionGetI {
    type : typeof LIST_CANDIDATES
    payload : CandidateInterface[]
}


export const listCandidates : ActionCreator<
    ThunkAction<
        Promise<any>, 
        candidatesStateInterface, 
        null, 
        candidatesActionGetI
    >>  = ( token : string) =>{

        return async (dispatch : Dispatch) =>{
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            await axios.get('http://localhost:8080/api/candidates/list/', config)
                .then((response : AxiosResponse) => {
                    dispatch(createMessage(`Listing Candidates!`));
                    dispatch({
                        type: LIST_CANDIDATES,
                        payload: response.data
                    });
                }).catch((err) => {
                    if(!err.response){dispatch(returnErrors(err.message, 500));}
                    else{dispatch(returnErrors(err.message, err.response.status));}
                })
    }
}