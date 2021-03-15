import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../actions/authActions';
import { LOGIN_FAIL } from '../actions/types';
import { ReducersStoreInterface } from '../reducers';


export default function Header(){
    const isAuthenticated = useSelector((state: ReducersStoreInterface) => state.auth.isAuthenticated);
    const user = useSelector((state: ReducersStoreInterface) => state.auth.recruiter);
    const dispatch = useDispatch();

    const [welcomeMessage, setWelcomeMessage] = useState<string>('');

    useEffect(()=>{
      let message = isAuthenticated ?
        `Welcome, Recruiter - ${user.email}` :
        `Login to use the system!`
      setWelcomeMessage(message);
    },[isAuthenticated])

    const handleLogout = ()=>{
        dispatch({type:LOGIN_FAIL, payload:{token:'', recruiter : user}})
    }

    const authLinks = (
        <ul className="navbar-nav ml-auto mt-2">
            <span className="navbar-text m-2">
                <strong className="m-2">{welcomeMessage}
                </strong>
            </span>
            <li className="nav-item m-1">
                <Link to="/create">
                    <button className="btn nav-link btn-primary text-light">Add a new Candidate</button>
                </Link>
            </li>
            <li className="nav-item m-1">
                <button 
                    onClick={handleLogout} 
                    className="nav-link btn btn-secondary text-light"
                >
                    Logout
                </button>
            </li>
        </ul>
      );
  
      const guestLinks = (
        <ul className="navbar-nav ml-auto mt-2">
          <span className="navbar-text m-2">
              <strong className="m-2">{welcomeMessage}
              </strong>
          </span>
        </ul>
      );
  
      return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="container">
            <div>
              <a className="navbar-brand">
                Candidate Listing
              </a>
            </div>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </nav>
      );
}