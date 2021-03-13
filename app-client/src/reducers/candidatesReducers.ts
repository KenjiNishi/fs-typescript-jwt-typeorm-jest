import { CREATE_CANDIDATE, DELETE_CANDIDATE, GET_CANDIDATE, LIST_CANDIDATES, UPDATE_CANDIDATE} from '../actions/types';
import { CandidateInterface, candidatesActionListI, candidatesActionsNoPayloadI, candidatesActionGetI } from '../actions/candidatesActions';

export interface candidatesStateInterface{
    candidates : CandidateInterface[];
    selectedCandidate : CandidateInterface;
}

const nullCandidate = {id:'',name:'', email:'', age:0, linkedin:'', techs:[]}
const initialState : candidatesStateInterface = {
    candidates: [],
    selectedCandidate: nullCandidate
};

export const candidatesReducer  = (
    state = initialState,
    action : candidatesActionListI | candidatesActionsNoPayloadI | candidatesActionGetI
    ) => {
        switch (action.type){
            case LIST_CANDIDATES:
                return{...state, candidates : action.payload}
            case GET_CANDIDATE:
            case UPDATE_CANDIDATE:
                return{...state, selectedCandidate : action.payload}
            case CREATE_CANDIDATE:
            case DELETE_CANDIDATE:
                return {...state, selectedCandidate : nullCandidate}
            default:
                return state;
        }
}