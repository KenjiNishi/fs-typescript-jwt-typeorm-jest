import { AlertErrorActionI, AlertMessageActionI } from '../actions/alertsActions';
import { GET_ERRORS, CREATE_MESSAGE } from '../actions/types'

export interface alertsStateInterface{
    message : string;
    status : number;
}

const initialState : alertsStateInterface = {
    message : '',
    status : 0
}

export const alertsReducer  = (
    state = initialState,
    action : AlertMessageActionI | AlertErrorActionI
    )=>
    {
    switch (action.type) {
        case GET_ERRORS:
            return {...state, ...action.payload}
        case CREATE_MESSAGE:
            return {...state, ...action.payload, status : -1};
        default:
            return state;
    }
}