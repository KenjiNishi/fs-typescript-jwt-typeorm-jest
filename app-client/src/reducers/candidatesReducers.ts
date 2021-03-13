import { LIST_CANDIDATES} from '../actions/types';
import { CandidateInterface, candidatesActionGetI } from '../actions/candidatesActions';

export interface candidatesStateInterface{
    candidates : CandidateInterface[];
}

const initialState : candidatesStateInterface = {
    candidates: []
};

export const candidatesReducer  = (
    state = initialState,
    action : candidatesActionGetI
    ) => {
        switch (action.type){
            case LIST_CANDIDATES:
                return{...state, candidates : action.payload}
            default:
                return state;
        }
}