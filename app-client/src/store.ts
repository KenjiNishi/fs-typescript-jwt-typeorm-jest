import { createStore , applyMiddleware, compose, Store} from 'redux';
import thunk from 'redux-thunk';
import { rootReducer, ReducersStoreInterface } from './reducers';

const middleware = [thunk];

const store  : Store<ReducersStoreInterface, any>= createStore(
    rootReducer,
    undefined, //initialState
    compose(
        applyMiddleware(...middleware)
      )
);
export default store;