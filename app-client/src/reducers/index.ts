import { combineReducers } from 'redux';

import { alertsStateInterface,alertsReducer } from './alertsReducers';
import {authReducer, authStateInterface}from './authReducers';
import { candidatesReducer, candidatesStateInterface } from './candidatesReducers';

export interface ReducersStoreInterface{
  auth : authStateInterface,
  alerts : alertsStateInterface,
  candidates : candidatesStateInterface
}

export const rootReducer = combineReducers<ReducersStoreInterface, any> ({
  auth : authReducer,
  alerts : alertsReducer,
  candidates : candidatesReducer
});
