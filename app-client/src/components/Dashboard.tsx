import { useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { ReducersStoreInterface } from '../reducers';

import CandidateList from './candidate-list';

export default function Dashboard(){
    const isAuthenticated = useSelector((state: ReducersStoreInterface) => state.auth.isAuthenticated);
    const recruiter = useSelector((state: ReducersStoreInterface) => state.auth.recruiter);

    useEffect(()=>{
        
    },[])

    if (!isAuthenticated) {
        return(<Redirect to="/login" />)
    }
  
    return (
        <div>
            <br/>
            <CandidateList/>
        </div>
    );
}