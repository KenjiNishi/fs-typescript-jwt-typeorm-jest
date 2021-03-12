import { createStore , applyMiddleware, compose, Store} from 'redux';
import thunk from 'redux-thunk';
import { rootReducer, ReducersStoreInterface } from './reducers';

const initialState = {};
const middleware = [thunk];

const store  : Store<ReducersStoreInterface, any>= createStore(
    rootReducer,
    undefined,
    compose(
        applyMiddleware(...middleware)
      )
);
export default store;