import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { listCandidates } from '../actions/candidatesActions';
import { ReducersStoreInterface } from '../reducers';

export default function Dashboard(){
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: ReducersStoreInterface) => state.auth.isAuthenticated);
    const token = useSelector((state: ReducersStoreInterface) => state.auth.token);

    useEffect(()=>{
        if (isAuthenticated) {
            dispatch(listCandidates(token));
        }

    },)

    if (!isAuthenticated) {
        return(<Redirect to="/login" />)
    }
  
    return (
        <div>
            <h2>Welcome, hero.</h2>
        </div>
    );
}