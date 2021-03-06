import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { login } from '../actions/authActions';
import { ReducersStoreInterface } from '../reducers';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: ReducersStoreInterface) => state.auth.isAuthenticated);

  const onSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(()=>{
    
  }, [])
  
  if (isAuthenticated) {
    console.log('Logged in! Going to Dashboard. Auth:', isAuthenticated);
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div className="card card-body mt-5">
        <h2 className="text-center">Login, Recruiter!</h2>
        <form onSubmit={onSubmit}>

          <div className="form-group m-2">
            <label>E-mail</label>
            <input
              type="text"
              className="form-control mt-1"
              name="email"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setEmail((e.target as HTMLInputElement).value)
              }
              value={email}
            />
          </div>

          <div className="form-group m-2">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              name="password"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setPassword((e.target as HTMLInputElement).value)
              }
              value={password}
            />
          </div>

          <div className="form-group m-2">
            <button type="submit" className="btn btn-primary mt-2">
              Login
            </button>
          </div>

          <p>
            New recruiters can be registered via HTTP request! Check the /etc folder.
          </p>
          
        </form>
      </div>
    </div>
  );
}