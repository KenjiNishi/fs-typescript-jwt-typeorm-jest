import { combineReducers } from 'redux';

import {authReducer, authStateInterface}from './authReducers';
export interface ReducersStoreInterface{
  auth : authStateInterface
}

export const rootReducer = combineReducers<ReducersStoreInterface, any> ({
  auth : authReducer,
});
