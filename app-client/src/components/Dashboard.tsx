import { useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { ReducersStoreInterface } from '../reducers';

import CandidateList from './candidate-list';

export default function Dashboard(){
    const isAuthenticated = useSelector((state: ReducersStoreInterface) => state.auth.isAuthenticated);

    useEffect(()=>{
        
    },[])

    if (!isAuthenticated) {
        return(<Redirect to="/login" />)
    }
  
    return (
        <div>
            <h2>Welcome, hero.</h2>

            <div className="container">
                <Link to={"/create"}> 
                        <button className="btn btn-info">Add new Candidate</button>
                </Link>
            </div>

            <CandidateList/>
        </div>
    );
}