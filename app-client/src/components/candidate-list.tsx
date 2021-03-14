import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { CandidateInterface, deleteCandidate, listCandidates } from '../actions/candidatesActions';
import { ReducersStoreInterface } from '../reducers';

interface CandidateListItemPropsI{
    key: string;
    candidate : CandidateInterface;
}

function CandidateListItem(props : CandidateListItemPropsI) {
    const dispatch = useDispatch();
    const token = useSelector((state: ReducersStoreInterface) => state.auth.token);

    return(
    <tr>
        <th scope="row">{props.candidate.id}</th>
        <td>{props.candidate.name}</td>
        <td>
          <p>{props.candidate.email}</p>
          <p>{props.candidate.linkedin} </p>
        </td>
        <td>{props.candidate.age}</td>
        <td>
            <ul>
                {props.candidate.techs.map(tech =>{
                    return(<li key={props.candidate.techs.indexOf(tech)} >{tech}</li>)
                })}
            </ul>
        </td>
        <td>
            <p> 
                <button className="btn btn-danger" onClick={() => { 
                    dispatch(deleteCandidate(token, props.candidate.id));
                }}>Delete</button> 
            
                <Link 
                    to={"/edit/"+props.candidate.id}
                    onClick={() => {}}> 
                    <button className="btn btn-info">Edit</button>
                </Link> 
            </p>
      </td>
    </tr>
  )
}

export default function CandidateList(){
    const dispatch = useDispatch();

    const token = useSelector((state: ReducersStoreInterface) => state.auth.token);
    const candidates = useSelector((state: ReducersStoreInterface) => state.candidates.candidates);

    useEffect(()=>{
        dispatch(listCandidates(token));
    },[])
  
    if(candidates.length>0){
        return (
          <div className='container'>
            <div className='row'>
              <div className='col-sm-12'>
                <br/>
                <h3>Candidates :</h3>
                <table className="table table-light table-hover">
                  <thead className="table-dark">
                    <tr >
                      <th className="col-1">Id</th>
                      <th className="col-3">Name</th>
                      <th className="col-2">Contact</th>
                      <th className="col-1">Age</th>
                      <th className="col-3">Techs</th>
                      <th className="col-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        candidates.map(currentCandidate => {
                            return (
                                <CandidateListItem 
                                    candidate={currentCandidate}
                                    key={currentCandidate.id}
                                />
                            )
                        })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
    }
     else{
        return(<div className='container'><h2>The candidates list is empty.</h2></div>)
    }
}