import React, { useEffect } from 'react';
import { withAlert, transitions, positions } from 'react-alert';
import { connect, useSelector } from 'react-redux';
import { ReducersStoreInterface } from '../reducers';

export const alertOptions = {
    position: positions.TOP_CENTER,
    timeout: 1420,
    offset: '30px',
    transition: transitions.SCALE
}

export function Alerts(props:any){
    const message = useSelector((state: ReducersStoreInterface) => state.alerts.message);
    const status = useSelector((state: ReducersStoreInterface) => state.alerts.status);
    const {alert} = props;

    useEffect(()=>{
        if(status===-1){
            alert.show(message);
        }
        else if(status===0){}
        else alert.error(`${status}: ${message}`);
    }, [status])
    return (
            <React.Fragment/>
    )
}
export default withAlert()(Alerts);
