import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckboxGroup from 'react-checkbox-group'

import { CandidateInterface, deleteCandidate, listCandidates } from '../actions/candidatesActions';
import { ReducersStoreInterface } from '../reducers';
import { acceptedTechs } from './candidate-create-form';

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
      <td className="container-fluid">
          <ul className="row">
              {props.candidate.techs.map(tech =>{
                  return(
                    <div className="col-auto" key={props.candidate.techs.indexOf(tech)}>
                      <li>{tech}</li>
                    </div>
                  )
              })}
          </ul>
      </td>
      <td>
          <p> 
              <button className="btn btn-danger" onClick={() => { 
                  dispatch(deleteCandidate(token, props.candidate.id))
                  dispatch(listCandidates(token))
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
    const [techFilter, setTechFilter] = useState<string[]>(acceptedTechs);

    const [ListFilter, setListFilter] = useState<CandidateInterface[]>(candidates);

    useEffect(()=>{
        dispatch(listCandidates(token));
    },[])

    useEffect(()=>{
      const result = candidates.filter((candidate)=>{
        let pass = false;
        techFilter.forEach((tech)=>{
          if(candidate.techs.includes(tech)){pass = true;}
        })
        return pass;
      });
      setListFilter(result);
    },[candidates, techFilter])
  
    if(candidates.length>0){
        return (
          <div className='container-fluid'>

            <div className="row">
              <label className="form-check-label">
                  Filter Technologies:
              </label>
              <CheckboxGroup name="techs" value={techFilter} onChange={setTechFilter}>
              {(Checkbox) => (
                  <>
                  {acceptedTechs.map(tech =>{
                      return(
                          <div className="col-3" key={acceptedTechs.indexOf(tech)}>
                              <Checkbox value={tech}/>
                              <label className="form-check-label m-1">
                                  {tech}
                              </label>
                          </div>
                      )
                  })}
                  </>
              )}
              </CheckboxGroup>
            </div>

            <div className='row'>
              <div className='col-sm-12'>
                <br/>
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
                      ListFilter.map(currentCandidate => {
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