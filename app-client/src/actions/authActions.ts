import { Dispatch } from 'redux';
import axios from 'axios';

import { LOGIN_SUCCESS, LOGIN_FAIL} from './types'

export const login = (email : string, password : string) => (dispatch : Dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({email, password});

    axios.post('http://localhost:8080/api/recruiters/auth/', body, config)
        .then((response) => {
            console.log('success');
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            })
        }).catch((err) => {
            console.log(err);
            dispatch({
                type: LOGIN_FAIL
            })
        })
}
