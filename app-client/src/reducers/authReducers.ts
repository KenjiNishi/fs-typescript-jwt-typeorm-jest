import { LOGIN_SUCCESS, LOGIN_FAIL, ActionInterface} from '../actions/types'

const initialState = {
    isAuthenticated: null,
    isLoading: null,
    token: localStorage.getItem('token'),
    recruiter: null
};

export default function (state = initialState, action : ActionInterface) {
    switch (action.type){
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return{...state, ...action.payload, isAuthenticated: true}
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return{...state, token: null, isAuthenticated: false, recruiter : null}
        default:
            return state;
    }
}