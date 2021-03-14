import { useForm } from "react-hook-form";
import CheckboxGroup from 'react-checkbox-group'
import { useEffect, useState } from 'react'
import { Redirect, useHistory, useParams } from "react-router";

import {CreateCandidateFormDataI, acceptedTechs, MinimumAge} from './candidate-create-form';
import { useDispatch, useSelector } from "react-redux";
import { ReducersStoreInterface } from "../reducers";
import { CandidateInterface, getCandidate, updateCandidate } from "../actions/candidatesActions";

export const EditCandidateForm = () => {
    const {id} = useParams<{ id: string }>();

    const { register, handleSubmit, errors } = useForm<CreateCandidateFormDataI>();
    
    const history = useHistory()
    
    const [Candidate, setCandidate] = useState<CandidateInterface>()
    const [techs, setTechs] = useState<string[]>([])

    const dispatch = useDispatch();
    const token = useSelector((state: ReducersStoreInterface) => state.auth.token);
    const listCandidates = useSelector((state: ReducersStoreInterface) => state.candidates.candidates);
    const selectedCandidate = useSelector((state: ReducersStoreInterface) => state.candidates.selectedCandidate);
    const isAuthenticated = useSelector((state: ReducersStoreInterface) => state.auth.isAuthenticated);

    useEffect(()=>{
        const localQuery = listCandidates.filter(
            (candidate) => {return candidate.id === id;}
        );
        if (localQuery.length===0) {
            dispatch(getCandidate(token, id));
        }
        else{
            const candidate = localQuery.pop();
            if(candidate){
                setCandidate(candidate);
                setTechs(candidate.techs);
            }
        }
    }
    ,[])

    useEffect(()=>{
        if(selectedCandidate.id && selectedCandidate.id.length>0 && selectedCandidate.id===id){
            setCandidate(selectedCandidate);
            setTechs(selectedCandidate.techs);
        }
    }, [selectedCandidate, id])

    const onSubmit = (data: CreateCandidateFormDataI) => {
        let formOutput = {...data, techs, id};
        dispatch(updateCandidate(token, formOutput.id, formOutput));
        history.push('/')
      };
    
    if (!isAuthenticated) {
        return(<Redirect to="/login" />)
    }
    return (
        <div className='container'>
        <br/>
        <h2>Editing Candidate</h2>
        <h3>id: {id}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
            <div className="col">
                <label className="form-label me-2" htmlFor="name">Name</label>
                <input
                    className="form-text form-control"
                    type="text"
                    id="name"
                    name="name"
                    ref={register({required: true})}
                    defaultValue={Candidate?.name}
                />
                {errors.name && errors.name.type === "required" && (
                <span className="error">The Candidate must have a name.</span>
                )}
            </div>
        </div>

        <div className="row">
            <div className="col">
                <label className="form-label me-2" htmlFor="age">Age</label>
                <input
                    className="form-control"
                    type="number"
                    min={MinimumAge}
                    id="age"
                    name="age"
                    defaultValue={Candidate?.age}
                    ref={register({required: true})}
                />
            </div>
        </div>

        <div className="row">
            <div className="col-sm-12">
                <label className="form-label me-2" htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    ref={register({required: true})}
                    className="form-control"
                    defaultValue={Candidate?.email}
                />
            </div>
            {errors.email && errors.email.type === "required" && (
            <span className="error">An email address is necessary for contacting the Candidate.</span>
            )}
        </div>

        <div className="row">
            <div className="col-sm-12">
                <label className="form-label me-2" htmlFor="linkedin">Linkedin</label>
                <input
                    type="text"
                    id="linkedin"
                    name="linkedin"
                    className="form-control"
                    ref={register}
                    defaultValue={Candidate?.linkedin}
                />
          </div>
        </div>

        <div className="row">
            <label className="form-check-label">
                Technologies:
            </label>
            <CheckboxGroup name="techs" value={techs} onChange={setTechs}>
            {(Checkbox) => (
                <>
                {acceptedTechs.map(tech =>{
                    return(
                        <div className="form-check" key={acceptedTechs.indexOf(tech)}>
                            <Checkbox value={tech}/>
                            <label className="form-check-label">
                                {tech}
                            </label>
                        </div>
                    )
                })}
                </>
            )}
            </CheckboxGroup>
            {(techs.length===0) && (
            <span className="error">The Candidate must have profficiency with at least one of these technologies.</span>
            )}
        </div>

        <div className="row">
            <button type="submit" className="btn btn-info">Update Information</button>
        </div>
      </form>
      </div>
    );
  };