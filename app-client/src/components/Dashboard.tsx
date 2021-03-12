import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { ReducersStoreInterface } from '../reducers';

export default function Dashboard(){
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: ReducersStoreInterface) => state.auth.isAuthenticated);

    useEffect(()=>{

    },[])

    if (!isAuthenticated) {
        console.log('Auth is '+ isAuthenticated + '. Redirecting from Dashboard to Login');
        return(<Redirect to="/login" />)
    }
  
    return (
        <div>
            <h2>Welcome, hero.</h2>
        </div>
    );
}