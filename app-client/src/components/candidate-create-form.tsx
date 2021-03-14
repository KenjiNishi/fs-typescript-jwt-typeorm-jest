import { useForm } from "react-hook-form";
import CheckboxGroup from 'react-checkbox-group'
import { useState } from 'react'
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ReducersStoreInterface } from "../reducers";
import { createCandidate } from "../actions/candidatesActions";

export interface CreateCandidateFormDataI{
    name: string;
    email: string;
    age: number;
    linkedin: string;
    techs: string[];
}

export const acceptedTechs = ['React', 'C++', 'Nodejs'];
export const MinimumAge = "18";

export const CreateCandidateForm = () => {
    const { register, handleSubmit, errors } = useForm<CreateCandidateFormDataI>();
    const [techs, setTechs] = useState<string[]>(acceptedTechs)
    const history = useHistory()

    const dispatch = useDispatch();
    const token = useSelector((state: ReducersStoreInterface) => state.auth.token);
    
    const onSubmit = (data: CreateCandidateFormDataI) => {
        let formOutput = {...data, techs};
        dispatch(createCandidate(token, formOutput));
        history.push('/')
      };
    
    return (
        <div className='container'>
        <br/>
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
                    //defaultValue={MinimumAge}
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
            <button type="submit" className="btn btn-info">Create</button>
        </div>
      </form>
      </div>
    );
  };