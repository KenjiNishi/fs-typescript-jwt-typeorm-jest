import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios, { AxiosResponse } from 'axios';

import { LIST_CANDIDATES, CREATE_CANDIDATE, GET_CANDIDATE, UPDATE_CANDIDATE, DELETE_CANDIDATE } from './types';
import {candidatesStateInterface} from '../reducers/candidatesReducers';
import { returnErrors, createMessage } from './alertsActions';

export interface CandidateInterface{
    id: string;
    name: string;
    email: string;
    age: number;
    linkedin: string;
    techs: string[];
    //createdAt:Date;
}

export interface candidatesActionListI {
    type : typeof LIST_CANDIDATES
    payload : CandidateInterface[]
}

export interface candidatesActionGetI {
    type : typeof GET_CANDIDATE | typeof UPDATE_CANDIDATE
    payload : CandidateInterface
}
export interface candidatesActionsNoPayloadI {
    type: typeof DELETE_CANDIDATE | typeof CREATE_CANDIDATE
}


export const listCandidates : ActionCreator<
    ThunkAction<
        Promise<any>, 
        candidatesStateInterface, 
        null, 
        candidatesActionListI
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

export const createCandidate : ActionCreator<
    ThunkAction<
        Promise<any>, 
        candidatesStateInterface, 
        null, 
        candidatesActionsNoPayloadI
    >>  = ( token : string, candidate : CandidateInterface) =>{

        return async (dispatch : Dispatch) =>{
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const body = JSON.stringify(candidate);
            
            await axios.post(`http://localhost:8080/api/candidates/create/`, body, config)
                .then((response : AxiosResponse) => {
                    dispatch(createMessage(`Candidate created!`));
                    dispatch({
                        type: CREATE_CANDIDATE
                    })
                }).catch((err) => {
                    if(!err.response){dispatch(returnErrors(err.message, 500));}
                    else{dispatch(returnErrors(err.message, err.response.status));}
                })
    }
}

export const getCandidate : ActionCreator<
    ThunkAction<
        Promise<any>, 
        candidatesStateInterface, 
        null, 
        candidatesActionGetI
    >>  = ( token : string, id : string) =>{

        return async (dispatch : Dispatch) =>{
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            await axios.get(`http://localhost:8080/api/candidates/get/${id}`, config)
                .then((response : AxiosResponse) => {
                    dispatch(createMessage(`Getting Candidate information...`));
                    dispatch({
                        type: GET_CANDIDATE,
                        payload: response.data
                    });
                }).catch((err) => {
                    if(!err.response){dispatch(returnErrors(err.message, 500));}
                    else{dispatch(returnErrors(err.message, err.response.status));}
                })
    }
}

export const updateCandidate : ActionCreator<
    ThunkAction<
        Promise<any>, 
        candidatesStateInterface, 
        null, 
        candidatesActionGetI
    >>  = ( id: string , token : string, candidate : CandidateInterface) =>{

        return async (dispatch : Dispatch) =>{
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const body = JSON.stringify(candidate);
            
            await axios.put(`http://localhost:8080/api/candidates/update/${id}`, body, config)
                .then((response : AxiosResponse) => {
                    dispatch(createMessage(`Candidate updated!`));
                    dispatch({
                        type: UPDATE_CANDIDATE,
                        payload: response.data
                    })
                }).catch((err) => {
                    if(!err.response){dispatch(returnErrors(err.message, 500));}
                    else{dispatch(returnErrors(err.message, err.response.status));}
                })
    }
}

export const deleteCandidate : ActionCreator<
    ThunkAction<
        Promise<any>, 
        candidatesStateInterface, 
        null, 
        candidatesActionsNoPayloadI
    >>  = ( id: string , token : string) =>{

        return async (dispatch : Dispatch) =>{
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            await axios.delete(`http://localhost:8080/api/candidates/delete/${id}`, config)
                .then((response : AxiosResponse) => {
                    dispatch(createMessage(`Candidate deleted: ${id}`));
                    dispatch({
                        type: DELETE_CANDIDATE
                    })
                }).catch((err) => {
                    if(!err.response){dispatch(returnErrors(err.message, 500));}
                    else{dispatch(returnErrors(err.message, err.response.status));}
                })
    }
}