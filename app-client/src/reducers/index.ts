import { combineReducers } from 'redux';

import { alertsStateInterface,alertsReducer } from './alertsReducers';
import {authReducer, authStateInterface}from './authReducers';
export interface ReducersStoreInterface{
  auth : authStateInterface,
  alerts : alertsStateInterface
}

export const rootReducer = combineReducers<ReducersStoreInterface, any> ({
  auth : authReducer,
  alerts : alertsReducer
});
