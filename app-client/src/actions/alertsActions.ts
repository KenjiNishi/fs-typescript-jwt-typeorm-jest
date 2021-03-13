import { CREATE_MESSAGE, GET_ERRORS} from './types'

export interface AlertMessageActionI {
    type : typeof CREATE_MESSAGE
    payload : {message : string};
}
export interface AlertErrorActionI {
    type : typeof GET_ERRORS
    payload : {message: string, status :number}
}

export const createMessage = (message : string) => {
    return {
        type: CREATE_MESSAGE,
        payload: {message}
    };
};

export const returnErrors = (message : string, status : number) => {
    return {
        type: GET_ERRORS,
        payload: {message, status}
    }
}