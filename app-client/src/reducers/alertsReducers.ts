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
            console.log('Received Error: ');console.log(action.payload);
            return {...action.payload}
        case CREATE_MESSAGE:
            console.log('Message created: ');console.log(action.payload);
            return {...state, ...action.payload};
        default:
            return state;
    }
}